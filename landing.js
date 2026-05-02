// ============================================
// LANDING PAGE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCookieBanner();
    initializeAuthModal();
    initializePricingButtons();
});

// ========== COOKIE BANNER ==========
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
}

// ========== AUTH MODAL ==========
function initializeAuthModal() {
    const modal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const startTrialBtn = document.getElementById('start-trial-btn');
    const ctaTrialBtn = document.getElementById('cta-trial-btn');
    const closeBtn = document.querySelector('.modal-close');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    // Open login modal
    loginBtn.addEventListener('click', () => {
        openModal('login');
    });
    
    // Open register modal (free)
    registerBtn.addEventListener('click', () => {
        openModal('register', 'free');
    });
    
    // Open register modal (trial)
    startTrialBtn.addEventListener('click', () => {
        openModal('register', 'trial');
    });
    
    ctaTrialBtn.addEventListener('click', () => {
        openModal('register', 'trial');
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Switch between forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
    
    // Form submissions
    document.getElementById('login-form-elem').addEventListener('submit', handleLogin);
    document.getElementById('register-form-elem').addEventListener('submit', handleRegister);
}

function openModal(formType, plan = 'free') {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        document.getElementById('register-plan').value = plan;
    }
    
    modal.style.display = 'flex';
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        await userManager.login(email, password);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;
    const plan = document.getElementById('register-plan').value;
    const errorDiv = document.getElementById('register-error');
    
    // Clear error
    errorDiv.textContent = '';
    
    // Validate password match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Le password non coincidono';
        return;
    }
    
    try {
        await userManager.register(email, password, plan);
        await userManager.login(email, password);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

// ========== PRICING BUTTONS ==========
function initializePricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.dataset.plan;
            
            // Check if user is logged in
            if (userManager.isLoggedIn()) {
                // Upgrade subscription
                if (plan === 'premium') {
                    // In a real app, redirect to payment page
                    window.location.href = 'payment.html?plan=premium';
                } else {
                    userManager.upgradeSubscription(plan);
                    window.location.href = 'dashboard.html';
                }
            } else {
                // Open registration modal with selected plan
                openModal('register', plan);
            }
        });
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
