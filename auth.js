// ============================================
// NONNETTA - AUTHENTICATION & USER MANAGEMENT
// ============================================

// ========== PASSWORD HASHING ==========
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ========== USER MANAGEMENT ==========
class UserManager {
    constructor() {
        this.currentUser = null;
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        const userId = sessionStorage.getItem('currentUserId');
        if (userId) {
            this.currentUser = this.getUserById(userId);
        }
    }

    async register(email, password, subscriptionType = 'free') {
        // Validate email
        if (!email || !email.includes('@')) {
            throw new Error('Email non valida');
        }

        // Validate password
        if (!password || password.length < 6) {
            throw new Error('La password deve essere almeno 6 caratteri');
        }

        // Check if user exists
        const users = this.getAllUsers();
        if (users.find(u => u.email === email)) {
            throw new Error('Email già registrata');
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email: email,
            password: hashedPassword,
            subscriptionType: subscriptionType,
            registrationDate: new Date().toISOString(),
            trialEndDate: subscriptionType === 'trial' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null,
            lastLogin: new Date().toISOString(),
            stats: {
                totalGames: 0,
                totalScore: 0,
                gamesPlayed: {
                    memory: 0,
                    math: 0,
                    words: 0,
                    sequence: 0,
                    binaural: 0
                },
                achievements: [],
                currentStreak: 0,
                longestStreak: 0,
                lastPlayDate: null
            },
            profile: {
                name: '',
                age: null,
                goal: ''
            }
        };

        // Save user
        users.push(user);
        localStorage.setItem('nonnetta_users', JSON.stringify(users));

        return user;
    }

    async login(email, password) {
        const hashedPassword = await hashPassword(password);
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (!user) {
            throw new Error('Email o password non corretta');
        }

        // Check subscription status
        if (user.subscriptionType === 'trial' && user.trialEndDate) {
            if (new Date(user.trialEndDate) < new Date()) {
                user.subscriptionType = 'expired';
                this.updateUser(user);
            }
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.updateUser(user);

        // Set current user
        this.currentUser = user;
        sessionStorage.setItem('currentUserId', user.id);

        return user;
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('currentUserId');
    }

    getAllUsers() {
        const usersJson = localStorage.getItem('nonnetta_users');
        return usersJson ? JSON.parse(usersJson) : [];
    }

    getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(u => u.id === userId);
    }

    updateUser(user) {
        const users = this.getAllUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('nonnetta_users', JSON.stringify(users));
            if (this.currentUser && this.currentUser.id === user.id) {
                this.currentUser = user;
            }
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    hasAccess(feature) {
        if (!this.currentUser) return false;

        const subscription = this.currentUser.subscriptionType;

        // Free users have limited access
        if (subscription === 'free') {
            return ['memory', 'math'].includes(feature);
        }

        // Trial users have full access during trial
        if (subscription === 'trial') {
            if (new Date(this.currentUser.trialEndDate) >= new Date()) {
                return true;
            }
            return false;
        }

        // Premium users have full access
        if (subscription === 'premium') {
            return true;
        }

        // Expired or unknown subscription
        return false;
    }

    recordGamePlay(gameName, score) {
        if (!this.currentUser) return;

        const user = this.currentUser;
        user.stats.totalGames++;
        user.stats.totalScore += score;
        user.stats.gamesPlayed[gameName] = (user.stats.gamesPlayed[gameName] || 0) + 1;

        // Update streak
        const today = new Date().toDateString();
        const lastPlay = user.stats.lastPlayDate ? new Date(user.stats.lastPlayDate).toDateString() : null;

        if (lastPlay === today) {
            // Same day, don't update streak
        } else if (lastPlay === new Date(Date.now() - 86400000).toDateString()) {
            // Consecutive day
            user.stats.currentStreak++;
            if (user.stats.currentStreak > user.stats.longestStreak) {
                user.stats.longestStreak = user.stats.currentStreak;
            }
        } else {
            // Streak broken
            user.stats.currentStreak = 1;
        }

        user.stats.lastPlayDate = new Date().toISOString();

        // Check achievements
        this.checkAchievements(user);

        this.updateUser(user);
    }

    checkAchievements(user) {
        const achievements = [];

        // First game achievement
        if (user.stats.totalGames === 1 && !user.stats.achievements.includes('first_game')) {
            achievements.push('first_game');
        }

        // 10 games achievement
        if (user.stats.totalGames >= 10 && !user.stats.achievements.includes('10_games')) {
            achievements.push('10_games');
        }

        // 50 games achievement
        if (user.stats.totalGames >= 50 && !user.stats.achievements.includes('50_games')) {
            achievements.push('50_games');
        }

        // 7 day streak
        if (user.stats.currentStreak >= 7 && !user.stats.achievements.includes('7_day_streak')) {
            achievements.push('7_day_streak');
        }

        // 30 day streak
        if (user.stats.currentStreak >= 30 && !user.stats.achievements.includes('30_day_streak')) {
            achievements.push('30_day_streak');
        }

        // Add new achievements
        user.stats.achievements.push(...achievements);

        return achievements;
    }

    upgradeSubscription(subscriptionType) {
        if (!this.currentUser) return;

        const user = this.currentUser;
        user.subscriptionType = subscriptionType;

        if (subscriptionType === 'trial') {
            user.trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        } else if (subscriptionType === 'premium') {
            user.trialEndDate = null;
        }

        this.updateUser(user);
    }
}

// Export singleton instance
const userManager = new UserManager();
