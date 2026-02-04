// ============================================
// NONNETTA - MAIN APPLICATION JAVASCRIPT
// ============================================

// ========== HAPTIC FEEDBACK ==========
function hapticFeedback(type = 'light') {
    // Vibration API for mobile devices
    if ('vibrate' in navigator) {
        switch(type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'success':
                navigator.vibrate([10, 50, 10]);
                break;
            case 'error':
                navigator.vibrate([50, 30, 50]);
                break;
        }
    }
}

// ========== SOUND EFFECTS ==========
function playSound(frequency, duration = 100, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.3;
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch(e) {
        console.log('Audio not available');
    }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeCookieBanner();
    initializeGameSelection();
    initializeAuth();
    initializeDiary();
    initializeNonnettaPlus();
});

// ========== COOKIE BANNER (GDPR COMPLIANCE) ==========
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
        hapticFeedback('light');
        playSound(600, 50);
    });
}

// ========== GAME SELECTION ==========
function initializeGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    const backButtons = document.querySelectorAll('.btn-back');
    
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            hapticFeedback('medium');
            playSound(800, 100);
            startGame(game);
        });
    });
    
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            hapticFeedback('light');
            playSound(400, 50);
            showGameSelection();
        });
    });
}

function showGameSelection() {
    document.querySelectorAll('.game-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById('game-selection').style.display = 'block';
}

function startGame(gameName) {
    document.getElementById('game-selection').style.display = 'none';
    
    switch(gameName) {
        case 'memory':
            initMemoryGame();
            break;
        case 'math':
            initMathGame();
            break;
        case 'words':
            initWordsGame();
            break;
        case 'sequence':
            initSequenceGame();
            break;
        case 'binaural':
            initBinauralGame();
            break;
        case 'scrivi':
            initScriviGame();
            break;
    }
}

// ========== MEMORY GAME ==========
let memoryState = {
    cards: [],
    flipped: [],
    moves: 0,
    found: 0
};

function initMemoryGame() {
    document.getElementById('memory-game').style.display = 'block';
    
    // Reset state
    memoryState = { cards: [], flipped: [], moves: 0, found: 0 };
    
    // Create card pairs - 4 pairs = 8 cards for 3x3 grid (9 spaces with 1 empty)
    const symbols = ['🌸', '🌺', '🌻', '🌷'];
    const cardPairs = [...symbols, ...symbols];
    memoryState.cards = cardPairs.sort(() => Math.random() - 0.5);
    
    // Render board
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    memoryState.cards.forEach((symbol, index) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.textContent = '?';
        card.tabIndex = 0;
        card.addEventListener('click', () => flipCard(index));
        board.appendChild(card);
    });
    
    // Add one empty space to make it 9 slots
    const emptySpace = document.createElement('div');
    emptySpace.className = 'memory-card-empty';
    board.appendChild(emptySpace);
    
    updateMemoryStats();
}

function flipCard(index) {
    if (memoryState.flipped.length >= 2) return;
    if (memoryState.flipped.includes(index)) return;
    
    const cards = document.querySelectorAll('.memory-card');
    const card = cards[index];
    
    if (card.classList.contains('found')) return;
    
    card.textContent = memoryState.cards[index];
    card.classList.add('flipped');
    memoryState.flipped.push(index);
    
    hapticFeedback('light');
    playSound(600, 50);
    
    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        updateMemoryStats();
        
        setTimeout(() => checkMemoryMatch(), 800);
    }
}

function checkMemoryMatch() {
    const [first, second] = memoryState.flipped;
    const cards = document.querySelectorAll('.memory-card');
    
    if (memoryState.cards[first] === memoryState.cards[second]) {
        // Match!
        cards[first].classList.add('found');
        cards[second].classList.add('found');
        memoryState.found++;
        
        hapticFeedback('success');
        playSound(800, 100);
        
        if (memoryState.found === 4) {
            setTimeout(() => {
                alert(`🎉 Complimenti! Hai completato il gioco in ${memoryState.moves} mosse!`);
                hapticFeedback('success');
            }, 500);
        }
    } else {
        // No match
        cards[first].textContent = '?';
        cards[second].textContent = '?';
        cards[first].classList.remove('flipped');
        cards[second].classList.remove('flipped');
        
        hapticFeedback('error');
        playSound(300, 100);
    }
    
    memoryState.flipped = [];
    updateMemoryStats();
}

function updateMemoryStats() {
    document.getElementById('memory-moves').textContent = memoryState.moves;
    document.getElementById('memory-found').textContent = memoryState.found;
}

// ========== MATH GAME ==========
let mathState = {
    score: 0,
    currentAnswer: 0
};

function initMathGame() {
    document.getElementById('math-game').style.display = 'block';
    mathState = { score: 0, currentAnswer: 0 };
    updateMathStats();
    nextMathQuestion();
}

function nextMathQuestion() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let answer;
    switch(op) {
        case '+': answer = a + b; break;
        case '-': answer = a - b; break;
        case '×': answer = a * b; break;
    }
    
    mathState.currentAnswer = answer;
    
    // Display question
    document.getElementById('math-question').textContent = `${a} ${op} ${b} = ?`;
    
    // Generate options
    const options = [answer];
    while(options.length < 4) {
        const wrong = answer + Math.floor(Math.random() * 10) - 5;
        if (wrong !== answer && !options.includes(wrong)) {
            options.push(wrong);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    // Render options
    const optionsDiv = document.getElementById('math-options');
    optionsDiv.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'math-option';
        btn.textContent = opt;
        btn.tabIndex = 0;
        btn.addEventListener('click', () => checkMathAnswer(opt));
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('math-feedback').textContent = '';
}

function checkMathAnswer(answer) {
    const feedback = document.getElementById('math-feedback');
    
    if (answer === mathState.currentAnswer) {
        mathState.score++;
        feedback.textContent = '✅ Corretto!';
        feedback.className = 'math-feedback correct';
        hapticFeedback('success');
        playSound(800, 100);
    } else {
        feedback.textContent = `❌ Sbagliato! La risposta era ${mathState.currentAnswer}`;
        feedback.className = 'math-feedback incorrect';
        hapticFeedback('error');
        playSound(300, 100);
    }
    
    updateMathStats();
    setTimeout(nextMathQuestion, 2000);
}

function updateMathStats() {
    document.getElementById('math-score').textContent = mathState.score;
}

// ========== WORDS GAME ==========
let wordsState = {
    score: 0,
    currentWord: '',
    guessed: [],
    words: [
        { word: 'SOLE', hint: 'Splende nel cielo' },
        { word: 'MARE', hint: 'È blu e grande' },
        { word: 'CASA', hint: 'Ci vivi dentro' },
        { word: 'FIORE', hint: 'È bello e profumato' },
        { word: 'GATTO', hint: 'Animale che fa miao' },
        { word: 'PANE', hint: 'Si mangia a colazione' },
        { word: 'LIBRO', hint: 'Si legge' },
        { word: 'LUNA', hint: 'Si vede di notte' }
    ]
};

function initWordsGame() {
    document.getElementById('words-game').style.display = 'block';
    wordsState.score = 0;
    updateWordsStats();
    nextWord();
}

function nextWord() {
    const wordObj = wordsState.words[Math.floor(Math.random() * wordsState.words.length)];
    wordsState.currentWord = wordObj.word;
    wordsState.guessed = [];
    
    document.getElementById('words-hint').textContent = `Indizio: ${wordObj.hint}`;
    updateWordsDisplay();
    createWordsKeyboard();
    document.getElementById('words-feedback').textContent = '';
}

function updateWordsDisplay() {
    const display = document.getElementById('words-display');
    display.innerHTML = '';
    
    for (let letter of wordsState.currentWord) {
        const span = document.createElement('span');
        span.className = 'word-letter';
        span.textContent = wordsState.guessed.includes(letter) ? letter : '_';
        display.appendChild(span);
    }
    
    // Check if won
    if (wordsState.currentWord.split('').every(l => wordsState.guessed.includes(l))) {
        wordsState.score++;
        updateWordsStats();
        document.getElementById('words-feedback').textContent = '🎉 Complimenti!';
        document.getElementById('words-feedback').className = 'words-feedback correct';
        hapticFeedback('success');
        playSound(900, 150);
        setTimeout(nextWord, 2000);
    }
}

function createWordsKeyboard() {
    const keyboard = document.getElementById('words-keyboard');
    keyboard.innerHTML = '';
    
    const letters = 'ABCDEFGHILMNOPQRSTUVZ';
    for (let letter of letters) {
        const btn = document.createElement('button');
        btn.className = 'word-key';
        btn.textContent = letter;
        btn.tabIndex = 0;
        btn.disabled = wordsState.guessed.includes(letter);
        btn.addEventListener('click', () => guessLetter(letter, btn));
        keyboard.appendChild(btn);
    }
}

function guessLetter(letter, btn) {
    wordsState.guessed.push(letter);
    btn.disabled = true;
    
    if (wordsState.currentWord.includes(letter)) {
        hapticFeedback('medium');
        playSound(700, 80);
    } else {
        hapticFeedback('light');
        playSound(400, 80);
    }
    
    updateWordsDisplay();
}

function updateWordsStats() {
    document.getElementById('words-score').textContent = wordsState.score;
}

// ========== SEQUENCE GAME ==========
let sequenceState = {
    level: 1,
    sequence: [],
    playerSequence: [],
    playing: false
};

function initSequenceGame() {
    document.getElementById('sequence-game').style.display = 'block';
    sequenceState = { level: 1, sequence: [], playerSequence: [], playing: false };
    
    // Create board
    const board = document.getElementById('sequence-board');
    board.innerHTML = '';
    
    const colors = ['#4caf50', '#ec407a', '#ffc107', '#2196f3'];
    colors.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = 'sequence-btn';
        btn.style.backgroundColor = color;
        btn.dataset.index = index;
        btn.tabIndex = 0;
        btn.addEventListener('click', () => handleSequenceClick(index));
        board.appendChild(btn);
    });
    
    updateSequenceStats();
    setTimeout(startSequenceRound, 1000);
}

function startSequenceRound() {
    sequenceState.sequence.push(Math.floor(Math.random() * 4));
    sequenceState.playerSequence = [];
    playSequence();
}

async function playSequence() {
    sequenceState.playing = true;
    document.getElementById('sequence-feedback').textContent = 'Guarda e ricorda...';
    
    for (let index of sequenceState.sequence) {
        await new Promise(resolve => setTimeout(resolve, 500));
        highlightSequenceButton(index);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    sequenceState.playing = false;
    document.getElementById('sequence-feedback').textContent = 'Ora tocca a te!';
}

function highlightSequenceButton(index) {
    const buttons = document.querySelectorAll('.sequence-btn');
    const btn = buttons[index];
    
    btn.classList.add('active');
    playSound(400 + index * 100, 200);
    
    setTimeout(() => {
        btn.classList.remove('active');
    }, 400);
}

function handleSequenceClick(index) {
    if (sequenceState.playing) return;
    
    hapticFeedback('light');
    highlightSequenceButton(index);
    
    sequenceState.playerSequence.push(index);
    
    // Check if correct so far
    const currentIndex = sequenceState.playerSequence.length - 1;
    if (sequenceState.sequence[currentIndex] !== index) {
        // Wrong!
        document.getElementById('sequence-feedback').textContent = '❌ Sbagliato! Riprova...';
        hapticFeedback('error');
        playSound(200, 300);
        
        setTimeout(() => {
            sequenceState.level = Math.max(1, sequenceState.level - 1);
            sequenceState.sequence = [];
            updateSequenceStats();
            startSequenceRound();
        }, 2000);
        return;
    }
    
    // Check if completed sequence
    if (sequenceState.playerSequence.length === sequenceState.sequence.length) {
        document.getElementById('sequence-feedback').textContent = '✅ Corretto!';
        hapticFeedback('success');
        playSound(800, 150);
        
        sequenceState.level++;
        updateSequenceStats();
        
        setTimeout(startSequenceRound, 1500);
    }
}

function updateSequenceStats() {
    document.getElementById('sequence-level').textContent = sequenceState.level;
}

// ========== BINAURAL GAME ==========
let binauralState = {
    score: 0,
    audioContext: null,
    currentSide: null,
    waitMode: false
};

function initBinauralGame() {
    document.getElementById('binaural-game').style.display = 'block';
    binauralState.score = 0;
    
    try {
        binauralState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {
        alert('Audio non disponibile su questo dispositivo');
        return;
    }
    
    document.getElementById('binaural-left').addEventListener('click', () => checkBinauralAnswer('left'));
    document.getElementById('binaural-right').addEventListener('click', () => checkBinauralAnswer('right'));
    document.getElementById('binaural-wait-mode').addEventListener('change', (e) => {
        binauralState.waitMode = e.target.checked;
    });
    
    updateBinauralStats();
    playBinauralSound();
}

function playBinauralSound() {
    binauralState.currentSide = Math.random() < 0.5 ? 'left' : 'right';
    
    const oscillator = binauralState.audioContext.createOscillator();
    const panner = binauralState.audioContext.createStereoPanner();
    const gainNode = binauralState.audioContext.createGain();
    
    oscillator.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(binauralState.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    panner.pan.value = binauralState.currentSide === 'left' ? -1 : 1;
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    oscillator.stop(binauralState.audioContext.currentTime + 0.5);
    
    document.getElementById('binaural-feedback').textContent = '🎧 Ascolta...';
}

function checkBinauralAnswer(side) {
    const feedback = document.getElementById('binaural-feedback');
    
    if (side === binauralState.currentSide) {
        binauralState.score++;
        feedback.textContent = '✅ Corretto!';
        feedback.className = 'binaural-feedback correct';
        hapticFeedback('success');
        playSound(800, 100);
        
        updateBinauralStats();
        
        // In wait mode, only play next sound after correct answer
        setTimeout(playBinauralSound, 1500);
    } else {
        feedback.textContent = '❌ Sbagliato! Era ' + (binauralState.currentSide === 'left' ? 'sinistra' : 'destra');
        feedback.className = 'binaural-feedback incorrect';
        hapticFeedback('error');
        playSound(300, 100);
        
        // In wait mode, don't play next sound until correct
        if (!binauralState.waitMode) {
            setTimeout(playBinauralSound, 1500);
        } else {
            // Give another chance in wait mode
            setTimeout(() => {
                feedback.textContent = '🎧 Riprova...';
                playBinauralSound();
            }, 1500);
        }
    }
}

function updateBinauralStats() {
    document.getElementById('binaural-score').textContent = binauralState.score;
}

// ========== SCRIVI GAME ==========
let scriviState = {
    score: 0,
    currentWord: '',
    currentInput: '',
    words: [
        { word: 'CASA', hint: 'Dove vivi' },
        { word: 'SOLE', hint: 'Splende nel cielo' },
        { word: 'MARE', hint: 'È blu e grande' },
        { word: 'GATTO', hint: 'Animale che fa miao' },
        { word: 'FIORE', hint: 'È bello e profumato' },
        { word: 'PANE', hint: 'Si mangia a colazione' },
        { word: 'LUNA', hint: 'Si vede di notte' },
        { word: 'LIBRO', hint: 'Si legge' }
    ]
};

function initScriviGame() {
    document.getElementById('scrivi-game').style.display = 'block';
    scriviState.score = 0;
    updateScriviStats();
    nextScriviWord();
    
    // Add keyboard listener for physical keyboard
    document.addEventListener('keydown', handleScriviKeyboard);
}

function nextScriviWord() {
    const wordObj = scriviState.words[Math.floor(Math.random() * scriviState.words.length)];
    scriviState.currentWord = wordObj.word;
    scriviState.currentInput = '';
    
    document.getElementById('scrivi-hint').textContent = `Indizio: ${wordObj.hint}`;
    updateScriviDisplay();
    createScriviKeyboard();
    document.getElementById('scrivi-feedback').textContent = '';
}

function updateScriviDisplay() {
    const display = document.getElementById('scrivi-input-display');
    display.textContent = scriviState.currentInput || '___';
    
    // Check if word is complete
    if (scriviState.currentInput.length === scriviState.currentWord.length) {
        checkScriviWord();
    }
}

function createScriviKeyboard() {
    const keyboard = document.getElementById('scrivi-keyboard');
    keyboard.innerHTML = '';
    
    const letters = 'ABCDEFGHILMNOPQRSTUVZ';
    for (let letter of letters) {
        const btn = document.createElement('button');
        btn.className = 'scrivi-key';
        btn.textContent = letter;
        btn.tabIndex = 0;
        btn.addEventListener('click', () => addScriviLetter(letter));
        keyboard.appendChild(btn);
    }
    
    // Add backspace button
    const backspaceBtn = document.createElement('button');
    backspaceBtn.className = 'scrivi-key';
    backspaceBtn.textContent = '⌫';
    backspaceBtn.style.gridColumn = 'span 2';
    backspaceBtn.addEventListener('click', () => removeScriviLetter());
    keyboard.appendChild(backspaceBtn);
}

function handleScriviKeyboard(e) {
    // Only handle if scrivi game is active
    if (document.getElementById('scrivi-game').style.display !== 'block') {
        return;
    }
    
    const key = e.key.toUpperCase();
    
    if (key === 'BACKSPACE') {
        e.preventDefault();
        removeScriviLetter();
    } else if (key.length === 1 && key >= 'A' && key <= 'Z') {
        e.preventDefault();
        addScriviLetter(key);
    }
}

function addScriviLetter(letter) {
    if (scriviState.currentInput.length < scriviState.currentWord.length) {
        scriviState.currentInput += letter;
        hapticFeedback('light');
        playSound(600, 50);
        updateScriviDisplay();
    }
}

function removeScriviLetter() {
    if (scriviState.currentInput.length > 0) {
        scriviState.currentInput = scriviState.currentInput.slice(0, -1);
        hapticFeedback('light');
        playSound(400, 50);
        updateScriviDisplay();
    }
}

function checkScriviWord() {
    const feedback = document.getElementById('scrivi-feedback');
    
    if (scriviState.currentInput === scriviState.currentWord) {
        scriviState.score++;
        feedback.textContent = '🎉 Complimenti! Parola corretta!';
        feedback.className = 'scrivi-feedback correct';
        hapticFeedback('success');
        playSound(900, 150);
        updateScriviStats();
        
        // Log to diary
        logActivity('Scrivi', scriviState.score);
        
        setTimeout(nextScriviWord, 2000);
    } else {
        feedback.textContent = `❌ Sbagliato! La parola era ${scriviState.currentWord}`;
        feedback.className = 'scrivi-feedback incorrect';
        hapticFeedback('error');
        playSound(300, 100);
        
        setTimeout(() => {
            scriviState.currentInput = '';
            updateScriviDisplay();
            document.getElementById('scrivi-feedback').textContent = '';
        }, 2000);
    }
}

function updateScriviStats() {
    document.getElementById('scrivi-score').textContent = scriviState.score;
}

// Clean up keyboard listener when leaving scrivi game
const originalShowGameSelection = showGameSelection;
showGameSelection = function() {
    document.removeEventListener('keydown', handleScriviKeyboard);
    originalShowGameSelection();
};

// ========== AUTHENTICATION SYSTEM ==========
let currentUser = null;

function initializeAuth() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Register button
    document.getElementById('register-btn').addEventListener('click', () => {
        document.getElementById('register-modal').style.display = 'flex';
    });
    
    // Register form
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Close modals
    document.getElementById('close-register-modal').addEventListener('click', () => {
        document.getElementById('register-modal').style.display = 'none';
    });
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('nonnetta-users') || '[]');
    
    // Hash password for comparison
    const hashedPassword = await hashPassword(password);
    
    const user = users.find(u => u.email === email && u.password === hashedPassword);
    
    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        hapticFeedback('success');
        playSound(800, 100);
    } else {
        alert('Email o password errati');
        hapticFeedback('error');
        playSound(300, 100);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;
    
    if (password !== confirmPassword) {
        document.getElementById('register-message').textContent = 'Le password non corrispondono';
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('nonnetta-users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        document.getElementById('register-message').textContent = 'Email già registrata';
        return;
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Add new user
    users.push({ name, email, password: hashedPassword });
    localStorage.setItem('nonnetta-users', JSON.stringify(users));
    
    // Auto-login
    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Close modal and update UI
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('register-form').reset();
    document.getElementById('register-message').textContent = '';
    updateAuthUI();
    
    hapticFeedback('success');
    playSound(800, 100);
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    hapticFeedback('light');
    playSound(400, 50);
}

function updateAuthUI() {
    if (currentUser) {
        document.getElementById('auth-logged-out').style.display = 'none';
        document.getElementById('auth-logged-in').style.display = 'block';
        document.getElementById('user-display-name').textContent = currentUser.name;
    } else {
        document.getElementById('auth-logged-out').style.display = 'block';
        document.getElementById('auth-logged-in').style.display = 'none';
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ========== DIARY SYSTEM ==========
function initializeDiary() {
    document.getElementById('view-diary-btn').addEventListener('click', openDiary);
    document.getElementById('close-diary-modal').addEventListener('click', closeDiary);
    document.getElementById('download-diary-btn').addEventListener('click', downloadDiary);
    document.getElementById('print-diary-btn').addEventListener('click', printDiary);
}

function logActivity(gameName, score) {
    if (!currentUser) return;
    
    const diary = JSON.parse(localStorage.getItem(`diary-${currentUser.email}`) || '[]');
    
    diary.push({
        date: new Date().toISOString(),
        game: gameName,
        score: score
    });
    
    localStorage.setItem(`diary-${currentUser.email}`, JSON.stringify(diary));
}

function openDiary() {
    if (!currentUser) {
        alert('Devi essere registrato per vedere il diario');
        return;
    }
    
    const diary = JSON.parse(localStorage.getItem(`diary-${currentUser.email}`) || '[]');
    const diaryContent = document.getElementById('diary-content');
    
    if (diary.length === 0) {
        diaryContent.innerHTML = '<div class="diary-empty">Nessuna attività registrata ancora. Inizia a giocare!</div>';
    } else {
        // Group by date
        const groupedByDate = {};
        diary.forEach(entry => {
            const date = new Date(entry.date).toLocaleDateString('it-IT');
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(entry);
        });
        
        let html = '';
        Object.keys(groupedByDate).reverse().forEach(date => {
            html += `<div class="diary-entry">`;
            html += `<div class="diary-entry-date">📅 ${date}</div>`;
            groupedByDate[date].forEach(entry => {
                const time = new Date(entry.date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
                html += `<div class="diary-entry-activity">🎮 ${entry.game} - ${time}</div>`;
                html += `<div class="diary-entry-score">Punteggio: ${entry.score}</div>`;
            });
            html += `</div>`;
        });
        
        diaryContent.innerHTML = html;
    }
    
    document.getElementById('diary-modal').style.display = 'flex';
}

function closeDiary() {
    document.getElementById('diary-modal').style.display = 'none';
}

function downloadDiary() {
    if (!currentUser) return;
    
    const diary = JSON.parse(localStorage.getItem(`diary-${currentUser.email}`) || '[]');
    
    let text = `DIARIO ATTIVITÀ - ${currentUser.name}\n`;
    text += `Email: ${currentUser.email}\n`;
    text += `Generato: ${new Date().toLocaleString('it-IT')}\n`;
    text += `\n${'='.repeat(50)}\n\n`;
    
    // Group by date
    const groupedByDate = {};
    diary.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('it-IT');
        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }
        groupedByDate[date].push(entry);
    });
    
    Object.keys(groupedByDate).reverse().forEach(date => {
        text += `${date}\n`;
        text += `${'-'.repeat(30)}\n`;
        groupedByDate[date].forEach(entry => {
            const time = new Date(entry.date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            text += `  ${time} - ${entry.game}: Punteggio ${entry.score}\n`;
        });
        text += `\n`;
    });
    
    // Create download
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diario-nonnetta-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function printDiary() {
    const printContent = document.getElementById('diary-content').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write('<html><head><title>Diario Nonnetta</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('.diary-entry { border: 2px solid #4caf50; padding: 15px; margin-bottom: 15px; border-radius: 8px; }');
    printWindow.document.write('.diary-entry-date { font-size: 1.2em; font-weight: bold; color: #4caf50; margin-bottom: 10px; }');
    printWindow.document.write('.diary-entry-activity { margin-bottom: 5px; }');
    printWindow.document.write('.diary-entry-score { color: #ec407a; font-weight: bold; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<h1>Diario Nonnetta - ${currentUser.name}</h1>`);
    printWindow.document.write(`<p>Generato: ${new Date().toLocaleString('it-IT')}</p>`);
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
}

// ========== NONNETTA PLUS ==========
function initializeNonnettaPlus() {
    document.getElementById('nonnetta-plus-card').addEventListener('click', openNonnettaPlus);
    document.getElementById('close-nonnetta-plus-modal').addEventListener('click', closeNonnettaPlus);
}

function openNonnettaPlus() {
    if (!currentUser) {
        alert('Devi essere registrato per accedere a Nonnetta Plus');
        hapticFeedback('error');
        playSound(300, 100);
        return;
    }
    
    document.getElementById('nonnetta-plus-modal').style.display = 'flex';
    hapticFeedback('medium');
    playSound(800, 100);
}

function closeNonnettaPlus() {
    document.getElementById('nonnetta-plus-modal').style.display = 'none';
}

// Update game completion tracking for diary
const originalCheckMemoryMatch = checkMemoryMatch;
checkMemoryMatch = function() {
    originalCheckMemoryMatch();
    if (memoryState.found === 4) {
        logActivity('Memory', memoryState.moves);
    }
};

const originalCheckMathAnswer = checkMathAnswer;
checkMathAnswer = function(answer) {
    originalCheckMathAnswer(answer);
    if (answer === mathState.currentAnswer) {
        logActivity('Calcoli', mathState.score);
    }
};

const originalUpdateWordsDisplay = updateWordsDisplay;
updateWordsDisplay = function() {
    const wasComplete = wordsState.currentWord.split('').every(l => wordsState.guessed.includes(l));
    originalUpdateWordsDisplay();
    const isNowComplete = wordsState.currentWord.split('').every(l => wordsState.guessed.includes(l));
    if (!wasComplete && isNowComplete) {
        logActivity('Parole', wordsState.score);
    }
};

const originalHandleSequenceClick = handleSequenceClick;
handleSequenceClick = function(index) {
    const oldLevel = sequenceState.level;
    originalHandleSequenceClick(index);
    if (sequenceState.level > oldLevel) {
        logActivity('Sequenze', sequenceState.level);
    }
};

const originalCheckBinauralAnswer = checkBinauralAnswer;
checkBinauralAnswer = function(side) {
    originalCheckBinauralAnswer(side);
    if (side === binauralState.currentSide) {
        logActivity('Audio', binauralState.score);
    }
};
