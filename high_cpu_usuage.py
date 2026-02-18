import psutil
import time

# Step 1: Prime CPU % measurement
for p in psutil.process_iter():
    try:
        p.cpu_percent()
    except:
        pass

# Step 2: Short wait to allow actual CPU% to be calculated
time.sleep(1)

# Step 3: Threshold
THRESHOLD = 20  # show processes using more than 20% CPU

print(f"\nProcesses using more than {THRESHOLD}% CPU:\n")
print(f"{'PID':>6} {'CPU%':>6}   NAME")

# Step 4: Iterate processes and filter
for p in psutil.process_iter(['pid', 'name']):
    try:
        cpu = p.cpu_percent(interval=None)
        if cpu > THRESHOLD:
            print(f"{p.pid:>6} {cpu:>6.1f}   {p.info['name']}")
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue