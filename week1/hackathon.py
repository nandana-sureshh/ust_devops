import psutil #to read system info
import time     #to pause execution 

for p in psutil.process_iter():
    try:
        p.cpu_percent()
    except:
        pass

time.sleep(1)


THRESHOLD = 20  

print(f"\nProcesses using more than {THRESHOLD}% CPU:\n")
print(f"{'PID':>6} {'CPU%':>6}   NAME")

for p in psutil.process_iter(['pid', 'name']):
    try:
        cpu = p.cpu_percent(interval=None)
        if cpu > THRESHOLD:
            print(f"{p.pid:>6} {cpu:>6.1f}   {p.info['name']}")
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue