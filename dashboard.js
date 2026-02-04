// ============================================
// DASHBOARD JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!userManager.isLoggedIn()) {
        window.location.href = 'games.html';
        return;
    }

    initializeDashboard();
    initializeNavigation();
    initializeLogout();
});

function initializeDashboard() {
    const user = userManager.currentUser;
    
    // Display user info
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('welcome-name').textContent = user.profile.name || user.email.split('@')[0];
    
    // Check subscription status
    checkSubscriptionStatus(user);
    
    // Load stats
    loadStats(user);
    
    // Load achievements
    loadAchievements(user);
    
    // Initialize quick actions
    initializeQuickActions();
    
    // Initialize games section
    initializeGamesSection(user);
    
    // Initialize progress section
    initializeProgressSection(user);
    
    // Initialize subscription section
    initializeSubscriptionSection(user);
    
    // Initialize settings
    initializeSettings(user);
}

function checkSubscriptionStatus(user) {
    const alertDiv = document.getElementById('subscription-alert');
    
    if (user.subscriptionType === 'trial') {
        const daysLeft = Math.ceil((new Date(user.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (daysLeft > 0) {
            alertDiv.className = 'alert alert-info';
            alertDiv.textContent = `🎁 Stai usando la prova gratuita. Ti rimangono ${daysLeft} giorni. Passa a Premium per continuare!`;
            alertDiv.style.display = 'block';
        } else {
            alertDiv.className = 'alert alert-warning';
            alertDiv.textContent = '⚠️ La tua prova gratuita è scaduta. Passa a Premium per continuare ad usare tutti i giochi!';
            alertDiv.style.display = 'block';
        }
    } else if (user.subscriptionType === 'free') {
        alertDiv.className = 'alert alert-info';
        alertDiv.textContent = '💎 Con il piano gratuito hai accesso limitato. Passa a Premium per sbloccare tutti i giochi!';
        alertDiv.style.display = 'block';
    } else if (user.subscriptionType === 'premium') {
        alertDiv.className = 'alert alert-success';
        alertDiv.textContent = '✨ Hai accesso Premium! Goditi tutti i giochi senza limiti.';
        alertDiv.style.display = 'block';
    }
}

function loadStats(user) {
    document.getElementById('total-games').textContent = user.stats.totalGames;
    document.getElementById('total-score').textContent = user.stats.totalScore;
    document.getElementById('current-streak').textContent = user.stats.currentStreak;
    document.getElementById('achievements-count').textContent = user.stats.achievements.length;
}

function loadAchievements(user) {
    const achievementsList = document.getElementById('achievements-list');
    
    if (user.stats.achievements.length === 0) {
        achievementsList.innerHTML = '<p class="no-achievements">Completa i giochi per sbloccare traguardi!</p>';
        return;
    }
    
    const achievementNames = {
        'first_game': { icon: '🏁', name: 'Primo Passo' },
        '10_games': { icon: '🎮', name: 'Giocatore' },
        '50_games': { icon: '🏆', name: 'Campione' },
        '7_day_streak': { icon: '🔥', name: 'Settimana Perfetta' },
        '30_day_streak': { icon: '💎', name: 'Mese Dedicato' }
    };
    
    achievementsList.innerHTML = '';
    user.stats.achievements.forEach(id => {
        const achievement = achievementNames[id];
        if (achievement) {
            const badge = document.createElement('div');
            badge.className = 'achievement-badge';
            badge.innerHTML = `
                <span class="achievement-badge-icon">${achievement.icon}</span>
                <span class="achievement-badge-name">${achievement.name}</span>
            `;
            achievementsList.appendChild(badge);
        }
    });
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            const sectionName = item.dataset.section;
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(`${sectionName}-section`).style.display = 'block';
        });
    });
}

function initializeLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Sei sicuro di voler uscire?')) {
            userManager.logout();
            window.location.href = 'games.html';
        }
    });
}

function initializeQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            checkAccessAndPlay(game);
        });
    });
}

function checkAccessAndPlay(game) {
    if (userManager.hasAccess(game)) {
        // Redirect to game
        window.location.href = `index.html?game=${game}`;
    } else {
        alert('⚠️ Questo gioco è disponibile solo con il piano Premium. Aggiorna il tuo abbonamento per continuare!');
        // Switch to subscription tab
        document.querySelector('[data-section="subscription"]').click();
    }
}

function initializeGamesSection(user) {
    const gameButtons = document.querySelectorAll('.games-list .btn');
    
    gameButtons.forEach(btn => {
        const game = btn.dataset.game;
        
        // Update stats
        const playedCount = user.stats.gamesPlayed[game] || 0;
        document.getElementById(`${game}-played`).textContent = playedCount;
        
        // Add click handler
        btn.addEventListener('click', () => {
            checkAccessAndPlay(game);
        });
        
        // Disable if no access
        if (!userManager.hasAccess(game)) {
            btn.textContent = '🔒 Premium';
            btn.classList.add('btn-secondary');
            btn.classList.remove('btn-primary');
        }
    });
}

function initializeProgressSection(user) {
    // Update streak display
    document.getElementById('streak-display').textContent = user.stats.currentStreak;
    document.getElementById('longest-streak').textContent = user.stats.longestStreak;
    
    // Games breakdown
    const breakdownDiv = document.getElementById('games-breakdown');
    breakdownDiv.innerHTML = '';
    
    const gameNames = {
        memory: '🧠 Memory',
        math: '🔢 Calcoli',
        words: '📝 Parole',
        sequence: '🎯 Sequenze',
        binaural: '🎧 Audio'
    };
    
    Object.entries(user.stats.gamesPlayed).forEach(([game, count]) => {
        const item = document.createElement('div');
        item.className = 'game-breakdown-item';
        item.innerHTML = `
            <span>${gameNames[game]}</span>
            <strong>${count}</strong>
        `;
        breakdownDiv.appendChild(item);
    });
    
    // Update achievements grid
    const achievementsGrid = document.getElementById('achievements-grid');
    const items = achievementsGrid.querySelectorAll('.achievement-item');
    
    const achievementIds = ['first_game', '10_games', '50_games', '7_day_streak', '30_day_streak'];
    items.forEach((item, index) => {
        if (user.stats.achievements.includes(achievementIds[index])) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
        }
    });
}

function initializeSubscriptionSection(user) {
    const planNames = {
        free: 'Gratuito',
        trial: 'Prova Gratuita',
        premium: 'Premium',
        expired: 'Scaduto'
    };
    
    document.getElementById('current-plan').textContent = planNames[user.subscriptionType];
    
    const statusDiv = document.getElementById('plan-status');
    if (user.subscriptionType === 'trial') {
        const daysLeft = Math.ceil((new Date(user.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
        statusDiv.textContent = daysLeft > 0 ? `${daysLeft} giorni rimanenti` : 'Scaduto';
    } else if (user.subscriptionType === 'premium') {
        statusDiv.textContent = 'Attivo';
    } else {
        statusDiv.textContent = '';
    }
    
    // Show upgrade section if not premium
    if (user.subscriptionType !== 'premium') {
        document.getElementById('upgrade-section').style.display = 'block';
        
        document.getElementById('upgrade-btn').addEventListener('click', () => {
            // In a real app, redirect to payment page
            alert('🚀 In un\'app reale, saresti reindirizzato alla pagina di pagamento (Stripe/PayPal).\n\nPer questa demo, passiamo direttamente a Premium!');
            userManager.upgradeSubscription('premium');
            location.reload();
        });
    }
}

function initializeSettings(user) {
    // Load profile data
    document.getElementById('profile-email').value = user.email;
    document.getElementById('profile-name').value = user.profile.name || '';
    document.getElementById('profile-age').value = user.profile.age || '';
    document.getElementById('profile-goal').value = user.profile.goal || '';
    
    // Profile form submission
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        user.profile.name = document.getElementById('profile-name').value;
        user.profile.age = document.getElementById('profile-age').value ? parseInt(document.getElementById('profile-age').value) : null;
        user.profile.goal = document.getElementById('profile-goal').value;
        
        userManager.updateUser(user);
        
        alert('✅ Profilo aggiornato con successo!');
        
        // Update welcome name
        document.getElementById('welcome-name').textContent = user.profile.name || user.email.split('@')[0];
    });
    
    // Delete data button
    document.getElementById('delete-data-btn').addEventListener('click', () => {
        if (confirm('⚠️ SEI SICURO? Questa azione eliminerà TUTTI i tuoi dati permanentemente!')) {
            if (confirm('⚠️ ULTIMA CONFERMA: Non potrai recuperare i dati. Continuare?')) {
                // Delete user data
                const users = userManager.getAllUsers();
                const filteredUsers = users.filter(u => u.id !== user.id);
                localStorage.setItem('nonnetta_users', JSON.stringify(filteredUsers));
                
                // Logout and redirect
                userManager.logout();
                alert('✅ Tutti i dati sono stati eliminati.');
                window.location.href = 'games.html';
            }
        }
    });
}
