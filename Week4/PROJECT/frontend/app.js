// Component Selectors
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeModal');

// Navigation Engine
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Clear active states
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        // Activate target
        link.classList.add('active');
        const targetId = link.getAttribute('data-target');
        const targetPage = document.getElementById(targetId);
        targetPage.classList.add('active');
        pageTitle.innerText = link.innerText;
        
        // Component-specific logic integration
        if(targetId === 'appointments') loadDoctors();
        if(targetId === 'records') loadRecords();
        if(targetId === 'dashboard') loadDashboardStats();
    });
});

// Modal Dialog Handlers
loginBtn.addEventListener('click', () => {
    if (localStorage.getItem('vitacare_jwt')) {
        // Logout action
        localStorage.removeItem('vitacare_jwt');
        loginBtn.innerText = "Login / Register";
        alert("Logged out successfully");
    } else {
        // Show login modal
        loginModal.classList.add('active');
    }
});

closeBtn.addEventListener('click', () => loginModal.classList.remove('active'));
window.onclick = function(e) {
    if (e.target == loginModal) loginModal.classList.remove('active');
}

// Authentication Service Integration
async function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const btn = document.querySelector('#loginModal button');
    
    // Animate button
    btn.innerHTML = `<span class="spinner"></span> Authenticating...`;
    
    try {
        // Expected route in standard Spring Boot Auth Service via K8s NodePort/Ingress
        const url = 'http://localhost:8081/api/auth/login';
        
        // Mocking the call since backend isn't running in current browser context
        setTimeout(() => {
            const fakeToken = "eyMockToken.SecureHash12345.Signature9876";
            localStorage.setItem('vitacare_jwt', fakeToken);
            loginModal.classList.remove('active');
            loginBtn.innerText = "Logout";
            btn.innerHTML = `Authenticate`;
            alert("Authenticated successfully with User Service!");
        }, 1200);

        /* Real Implementation:
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: user, password: pass})
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('vitacare_jwt', data.token);
            // close modal, set token
        }
        */
    } catch (e) {
        console.error("Login Error:", e);
        btn.innerHTML = `Authenticate`;
        alert("Failed to connect to authentication service.");
    }
}

// Dynamic Content Loaders (Mock integration with backend services)
function loadDashboardStats() {
    document.getElementById('dash-appointment').innerHTML = "Cardiology Checkup - Oct 25<br>Dr. Sarah Jenkins";
    document.getElementById('dash-records').innerHTML = "Blood Work Results - Oct 12<br>All parameters normal.";
    document.getElementById('dash-pharmacy').innerHTML = "Amoxicillin 500mg - 2 Refills Left<br>Ready for pickup.";
}

function loadDoctors() {
    const list = document.getElementById('doctors-list');
    list.innerHTML = `
        <div class="glass-card fade-up">
            <h3>Dr. Sarah Jenkins</h3>
            <p class="text-highlight">Cardiologist (10+ Yrs Exp)</p>
            <p>Next available: Tomorrow 10:00 AM</p>
            <button class="primary-btn mt-4 full-width pulse-hover">Book Slot</button>
        </div>
        <div class="glass-card fade-up" style="animation-delay: 0.1s">
            <h3>Dr. Michael Chen</h3>
            <p class="text-highlight">Neurologist</p>
            <p>Next available: Oct 28 02:00 PM</p>
            <button class="primary-btn mt-4 full-width pulse-hover">Book Slot</button>
        </div>
    `;
}

function loadRecords() {
    const list = document.getElementById('records-list');
    list.innerHTML = `
        <div class="glass-card fade-up">
            <h3>Annual Physical Report</h3>
            <p class="text-highlight">Dr. Robert Smith</p>
            <p>Uploaded: Sept 15, 2023</p>
            <button class="primary-btn mt-4 pulse-hover">View Secure PDF</button>
        </div>
    `;
}

function searchMedicines() {
    const query = document.getElementById('medSearch').value;
    const list = document.getElementById('medicine-list');
    
    // Simulate Fetching from FastAPI Pharmacy Service
    list.innerHTML = `<div class="glass-card">Searching inventory for ${query}...</div>`;
    
    setTimeout(() => {
        list.innerHTML = `
            <div class="glass-card fade-up">
                <h3>${query || "Amoxicillin 500mg"}</h3>
                <p class="text-highlight">Stock: 142 Units in Branch A</p>
                <p>Price: $12.99</p>
                <button class="primary-btn mt-4 full-width pulse-hover">Reserve Prescription</button>
            </div>
        `;
    }, 800);
}

function uploadRecord() {
    const fileNode = document.getElementById('recordFile');
    if(fileNode.files.length === 0) {
        alert("Please select a file first.");
        return;
    }
    alert(`File ${fileNode.files[0].name} scheduled for secure upload to FastAPI Health Records service.`);
}

// Initialization Check
if (localStorage.getItem('vitacare_jwt')) {
    loginBtn.innerText = "Logout";
}
loadDashboardStats();
