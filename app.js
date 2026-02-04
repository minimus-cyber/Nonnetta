// ============================================
// NONNETTA - MAIN APPLICATION JAVASCRIPT
// ============================================

// ========== STATE MANAGEMENT ==========
let currentUser = null;
let selectedActivityIndex = 0;
let activityElements = [];
let currentSection = 'activities';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeCookieBanner();
    initializeAuth();
    initializeActivities();
    initializeKeyboardNavigation();
    initializeNavigation();
    loadUserSession();
});

// ========== COOKIE BANNER (GDPR COMPLIANCE) ==========
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    // Check if cookies were already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
}

// ========== AUTHENTICATION ==========
function initializeAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Toggle between login and register forms
    showRegisterBtn.addEventListener('click', () => {
        document.getElementById('login-compact').style.display = 'none';
        document.getElementById('register-compact').style.display = 'block';
    });
    
    showLoginBtn.addEventListener('click', () => {
        document.getElementById('login-compact').style.display = 'block';
        document.getElementById('register-compact').style.display = 'none';
    });
    
    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (await authenticateUser(email, password)) {
            currentUser = email;
            showLoggedInState();
        } else {
            alert('Credenziali non valide. Registrati se non hai un account.');
        }
    });
    
    // Handle registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        const privacyConsent = document.getElementById('privacy-consent').checked;
        
        if (!privacyConsent) {
            alert('Devi accettare la Privacy Policy per registrarti.');
            return;
        }
        
        if (password !== passwordConfirm) {
            alert('Le password non corrispondono.');
            return;
        }
        
        if (await registerUser(email, password)) {
            alert('Registrazione completata! Ora puoi accedere.');
            document.getElementById('login-compact').style.display = 'block';
            document.getElementById('register-compact').style.display = 'none';
            registerForm.reset();
        } else {
            alert('Email già registrata. Usa il login.');
        }
    });
    
    // Handle logout
    logoutBtn.addEventListener('click', () => {
        logout();
    });
}

// Simple hash function for password storage
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[email]) return false;
    
    const passwordHash = await hashPassword(password);
    return users[email].passwordHash === passwordHash;
}

async function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email]) {
        return false; // User already exists
    }
    
    const passwordHash = await hashPassword(password);
    users[email] = {
        passwordHash: passwordHash,
        registeredAt: new Date().toISOString(),
        activities: []
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    document.getElementById('auth-compact').style.display = 'block';
    document.getElementById('user-info-compact').style.display = 'none';
    document.getElementById('history-btn').style.display = 'none';
    document.getElementById('loginForm').reset();
    
    // Keep activities visible, but hide history section
    showSection('activities');
}

function loadUserSession() {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showLoggedInState();
    }
}

function showLoggedInState() {
    sessionStorage.setItem('currentUser', currentUser);
    document.getElementById('auth-compact').style.display = 'none';
    document.getElementById('user-info-compact').style.display = 'block';
    document.getElementById('user-email').textContent = currentUser;
    document.getElementById('history-btn').style.display = 'inline-block';
}

function showMainContent() {
    // Deprecated: Activities are now always visible
    // Keep for backward compatibility
    showLoggedInState();
}

// ========== ACTIVITIES ==========
function initializeActivities() {
    activityElements = Array.from(document.querySelectorAll('.activity-item'));
    const completeBtn = document.getElementById('complete-activity');
    
    // Set initial selection
    if (activityElements.length > 0) {
        selectActivity(0);
    }
    
    // Add click handlers
    activityElements.forEach((element, index) => {
        element.addEventListener('click', () => selectActivity(index));
    });
    
    completeBtn.addEventListener('click', completeSelectedActivity);
}

function selectActivity(index) {
    // Remove previous selection
    activityElements.forEach(el => el.classList.remove('selected'));
    
    // Add new selection
    selectedActivityIndex = index;
    activityElements[selectedActivityIndex].classList.add('selected');
    activityElements[selectedActivityIndex].focus();
}

function completeSelectedActivity() {
    const activityName = activityElements[selectedActivityIndex].dataset.activity;
    const activityTitle = activityElements[selectedActivityIndex].querySelector('h3').textContent;
    
    // Check if user is logged in
    if (!currentUser) {
        alert(`✅ Attività "${activityTitle}" completata!\n\nSuggerimento: Registrati per salvare le tue attività e monitorare i tuoi progressi nel tempo.`);
        return;
    }
    
    // Save activity to user history
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[currentUser]) {
        if (!users[currentUser].activities) {
            users[currentUser].activities = [];
        }
        
        users[currentUser].activities.push({
            name: activityName,
            title: activityTitle,
            completedAt: new Date().toISOString(),
            date: new Date().toLocaleDateString('it-IT'),
            time: new Date().toLocaleTimeString('it-IT')
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        alert(`✅ Attività "${activityTitle}" completata e salvata nel tuo storico!`);
    }
}

// ========== NAVIGATION ==========
function initializeNavigation() {
    const homeBtn = document.getElementById('home-btn');
    const activitiesBtn = document.getElementById('activities-btn');
    const historyBtn = document.getElementById('history-btn');
    
    homeBtn.addEventListener('click', () => showSection('activities'));
    activitiesBtn.addEventListener('click', () => showSection('activities'));
    historyBtn.addEventListener('click', () => showSection('history'));
    
    // Initialize history
    initializeHistory();
}

function showSection(section) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    if (section === 'activities') {
        document.getElementById('activities-section').style.display = 'block';
        document.getElementById('history-section').style.display = 'none';
        document.getElementById('home-btn').classList.add('active');
        currentSection = 'activities';
    } else if (section === 'history') {
        // History is only accessible when logged in
        if (!currentUser) {
            alert('Devi essere registrato per visualizzare lo storico delle attività.');
            return;
        }
        document.getElementById('activities-section').style.display = 'none';
        document.getElementById('history-section').style.display = 'block';
        document.getElementById('history-btn').classList.add('active');
        document.querySelector('#history-section .history-actions').style.display = 'flex';
        currentSection = 'history';
        loadHistory();
    }
}

// ========== HISTORY ==========
function initializeHistory() {
    const printBtn = document.getElementById('print-history');
    const downloadBtn = document.getElementById('download-history');
    const clearBtn = document.getElementById('clear-history');
    
    printBtn.addEventListener('click', printHistory);
    downloadBtn.addEventListener('click', downloadHistory);
    clearBtn.addEventListener('click', clearHistory);
}

function loadHistory() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const historyList = document.getElementById('history-list');
    
    if (!users[currentUser] || !users[currentUser].activities || users[currentUser].activities.length === 0) {
        historyList.innerHTML = '<p class="help-text">Nessuna attività completata ancora.</p>';
        return;
    }
    
    const activities = users[currentUser].activities;
    let html = '';
    
    // Group by date
    const grouped = {};
    activities.forEach(activity => {
        if (!grouped[activity.date]) {
            grouped[activity.date] = [];
        }
        grouped[activity.date].push(activity);
    });
    
    // Display grouped activities
    Object.keys(grouped).sort().reverse().forEach(date => {
        html += `<div class="history-item">`;
        html += `<div class="date">📅 ${date}</div>`;
        grouped[date].forEach(activity => {
            html += `<p>⏰ ${activity.time} - ${activity.title}</p>`;
        });
        html += `</div>`;
    });
    
    historyList.innerHTML = html;
}

function printHistory() {
    window.print();
}

function downloadHistory() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[currentUser] || !users[currentUser].activities) {
        alert('Nessuna attività da scaricare.');
        return;
    }
    
    const activities = users[currentUser].activities;
    let content = `NONNETTA - STORICO ATTIVITÀ\n`;
    content += `Utente: ${currentUser}\n`;
    content += `Data generazione: ${new Date().toLocaleString('it-IT')}\n`;
    content += `\n${'='.repeat(60)}\n\n`;
    
    // Group by date
    const grouped = {};
    activities.forEach(activity => {
        if (!grouped[activity.date]) {
            grouped[activity.date] = [];
        }
        grouped[activity.date].push(activity);
    });
    
    Object.keys(grouped).sort().reverse().forEach(date => {
        content += `DATA: ${date}\n`;
        content += `${'-'.repeat(60)}\n`;
        grouped[date].forEach(activity => {
            content += `  ${activity.time} - ${activity.title}\n`;
        });
        content += `\n`;
    });
    
    content += `\n${'='.repeat(60)}\n`;
    content += `Totale attività: ${activities.length}\n`;
    
    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nonnetta-storico-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function clearHistory() {
    if (!confirm('Sei sicuro di voler cancellare tutto lo storico? Questa azione non può essere annullata.')) {
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[currentUser]) {
        users[currentUser].activities = [];
        localStorage.setItem('users', JSON.stringify(users));
        loadHistory();
        alert('Storico cancellato.');
    }
}

// ========== KEYBOARD NAVIGATION ==========
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC - Go back or show info
        if (e.key === 'Escape') {
            if (currentSection === 'history') {
                showSection('activities');
                e.preventDefault();
            } else if (currentUser) {
                if (confirm('Vuoi uscire?')) {
                    logout();
                }
                e.preventDefault();
            }
            return;
        }
        
        // Only handle arrow keys in activities section
        if (currentSection !== 'activities' || activityElements.length === 0) return;
        
        // Arrow keys navigation
        if (e.key === 'ArrowDown') {
            selectedActivityIndex = (selectedActivityIndex + 1) % activityElements.length;
            selectActivity(selectedActivityIndex);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            selectedActivityIndex = (selectedActivityIndex - 1 + activityElements.length) % activityElements.length;
            selectActivity(selectedActivityIndex);
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            selectedActivityIndex = Math.min(selectedActivityIndex + 1, activityElements.length - 1);
            selectActivity(selectedActivityIndex);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            selectedActivityIndex = Math.max(selectedActivityIndex - 1, 0);
            selectActivity(selectedActivityIndex);
            e.preventDefault();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            // Space toggles selection (visual feedback)
            activityElements[selectedActivityIndex].classList.toggle('selected');
            e.preventDefault();
        } else if (e.key === 'Enter') {
            // Enter confirms/completes activity
            completeSelectedActivity();
            e.preventDefault();
        }
    });
}
