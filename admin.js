// ============================================
// NONNETTA - ADMIN PANEL JAVASCRIPT
// ============================================

// Default admin credentials
const DEFAULT_ADMIN = {
    username: 'fraverderosa',
    password: 'Rosa@5791'
};

// ========== STATE ==========
let isAdminLoggedIn = false;
let currentAdmin = null;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminCredentials();
    initializeAdminAuth();
    loadAdminSession();
});

// ========== ADMIN CREDENTIALS SETUP ==========
function initializeAdminCredentials() {
    // Set default credentials if not exist
    if (!localStorage.getItem('adminCredentials')) {
        localStorage.setItem('adminCredentials', JSON.stringify(DEFAULT_ADMIN));
    }
}

// ========== AUTHENTICATION ==========
function initializeAdminAuth() {
    const loginForm = document.getElementById('adminLoginForm');
    const logoutBtn = document.getElementById('admin-logout-btn');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        
        if (authenticateAdmin(username, password)) {
            currentAdmin = username;
            isAdminLoggedIn = true;
            showAdminDashboard();
        } else {
            showError('Credenziali amministratore non valide.');
        }
    });
    
    logoutBtn.addEventListener('click', () => {
        logoutAdmin();
    });
    
    // Initialize credential change form
    const changeCredsForm = document.getElementById('changeCredentialsForm');
    changeCredsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        changeAdminCredentials();
    });
}

function authenticateAdmin(username, password) {
    const adminCreds = JSON.parse(localStorage.getItem('adminCredentials'));
    return adminCreds.username === username && adminCreds.password === password;
}

function loadAdminSession() {
    const savedAdmin = sessionStorage.getItem('currentAdmin');
    if (savedAdmin) {
        currentAdmin = savedAdmin;
        isAdminLoggedIn = true;
        showAdminDashboard();
    }
}

function showAdminDashboard() {
    sessionStorage.setItem('currentAdmin', currentAdmin);
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    document.getElementById('admin-name').textContent = currentAdmin;
    
    loadDashboardData();
}

function logoutAdmin() {
    currentAdmin = null;
    isAdminLoggedIn = false;
    sessionStorage.removeItem('currentAdmin');
    document.getElementById('admin-login-section').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('adminLoginForm').reset();
}

function showError(message) {
    const errorDiv = document.getElementById('admin-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('credentials-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// ========== CREDENTIAL MANAGEMENT ==========
function changeAdminCredentials() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const newPasswordConfirm = document.getElementById('new-password-confirm').value;
    
    if (newPassword && newPassword !== newPasswordConfirm) {
        alert('Le password non corrispondono.');
        return;
    }
    
    const adminCreds = JSON.parse(localStorage.getItem('adminCredentials'));
    
    if (newUsername) {
        adminCreds.username = newUsername;
        currentAdmin = newUsername;
        sessionStorage.setItem('currentAdmin', currentAdmin);
        document.getElementById('admin-name').textContent = currentAdmin;
    }
    
    if (newPassword) {
        adminCreds.password = newPassword;
    }
    
    localStorage.setItem('adminCredentials', JSON.stringify(adminCreds));
    
    showSuccess('Credenziali aggiornate con successo!');
    document.getElementById('changeCredentialsForm').reset();
}

// ========== DASHBOARD DATA ==========
function loadDashboardData() {
    loadUsersList();
    loadStatistics();
}

function loadUsersList() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const usersList = document.getElementById('users-list');
    
    if (Object.keys(users).length === 0) {
        usersList.innerHTML = '<p class="help-text">Nessun utente registrato.</p>';
        return;
    }
    
    let html = '';
    Object.keys(users).forEach(email => {
        const user = users[email];
        const activityCount = user.activities ? user.activities.length : 0;
        const registeredDate = new Date(user.registeredAt).toLocaleDateString('it-IT');
        
        html += `
            <div class="user-item">
                <div>
                    <strong>📧 ${email}</strong><br>
                    <small>Registrato: ${registeredDate} | Attività: ${activityCount}</small>
                </div>
                <button class="btn btn-danger" onclick="deleteUser('${email}')">Elimina</button>
            </div>
        `;
    });
    
    usersList.innerHTML = html;
}

function loadStatistics() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const totalUsers = Object.keys(users).length;
    
    let totalActivities = 0;
    let activeToday = 0;
    const today = new Date().toLocaleDateString('it-IT');
    
    Object.keys(users).forEach(email => {
        const user = users[email];
        if (user.activities) {
            totalActivities += user.activities.length;
            
            // Check if user was active today
            const hasActivityToday = user.activities.some(activity => 
                activity.date === today
            );
            if (hasActivityToday) {
                activeToday++;
            }
        }
    });
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('total-activities').textContent = totalActivities;
    document.getElementById('active-today').textContent = activeToday;
}

function deleteUser(email) {
    if (!confirm(`Sei sicuro di voler eliminare l'utente ${email}? Questa azione non può essere annullata.`)) {
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    delete users[email];
    localStorage.setItem('users', JSON.stringify(users));
    
    loadDashboardData();
    alert('Utente eliminato.');
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // ESC - Logout or go back
    if (e.key === 'Escape') {
        if (isAdminLoggedIn) {
            if (confirm('Vuoi uscire dal pannello amministratore?')) {
                logoutAdmin();
            }
        }
        e.preventDefault();
    }
});
