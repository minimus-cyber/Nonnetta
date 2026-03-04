// ============================================
// NONNETTA - MAIN APPLICATION JAVASCRIPT
// ============================================
import { auth, db } from './firebase-init.js';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp,
    doc,
    setDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ========== MOTIVATIONAL PHRASES ==========
const motivationalPhrases = [
    "Ogni piccolo passo avanti è una vittoria che vale un mondo intero.",
    "La gentilezza è il sole che fa fiorire anche i giorni più grigi.",
    "Dentro ogni momento di silenzio c'è la forza di mille parole.",
    "La curiosità è il filo d'oro che tesse la trama della vita.",
    "Anche il viaggio più lungo inizia con un singolo respiro di coraggio.",
    "Le stelle non smettono di brillare solo perché non le vediamo.",
    "Ogni giorno porta in dono qualcosa di nuovo da scoprire.",
    "La resilienza è il fiore che sboccia tra le crepe delle pietre.",
    "Un sorriso sincero è il regalo più prezioso che possiamo offrire.",
    "Il tempo è un pittore che colora ogni stagione in modo unico.",
    "La gratitudine trasforma ciò che abbiamo in abbastanza.",
    "Ogni nuvola porta con sé la promessa della pioggia che nutre.",
    "La saggezza nasce dall'ascolto attento del mondo intorno a noi.",
    "Come il bambù, pieghiamoci al vento senza mai spezzarci.",
    "Il coraggio non è l'assenza di paura, ma il danzarci insieme.",
    "La luce più bella è quella che accende il cuore degli altri.",
    "Ogni incontro è un universo che si apre per un istante.",
    "La memoria è il giardino dove crescono i fiori del passato.",
    "Anche i giorni difficili hanno qualcosa da insegnare.",
    "La semplicità è l'arte più raffinata che esista.",
    "Chi cammina con leggerezza lascia impronte più durature.",
    "La vita è un racconto che scriviamo un giorno alla volta.",
    "Ogni alba è una pagina bianca che aspetta di essere riempita.",
    "La pace interiore è il tesoro che nessuno può toglierci.",
    "Come le radici dell'albero, la forza sta nel profondo.",
    "La gentilezza è una lingua che tutti capiscono senza traduzione.",
    "Ogni piccola gioia è un faro nella nebbia dei giorni difficili.",
    "Il respiro è il ritmo segreto che ci connette all'universo.",
    "La creatività è l'aquilone che vola più in alto con il vento contrario.",
    "Chi semina parole buone raccoglie fiori di speranza.",
    "La vita fiorisce là dove c'è cura e attenzione.",
    "Ogni tramonto porta con sé la promessa di un nuovo domani.",
    "La fortezza più solida è costruita con mattoni di perseveranza.",
    "Come l'acqua trova sempre la sua strada, così fa la speranza.",
    "Il silenzio è la musica più profonda dell'anima.",
    "Ogni gesto di bontà risuona nel tempo come campane al vento.",
    "La mente che impara non invecchia mai davvero.",
    "Il cielo non finisce dove si vede, ma dove l'immaginazione arriva.",
    "Ogni sfida superata aggiunge un anello alla catena della saggezza.",
    "La serenità è il porto sicuro che costruiamo dentro di noi.",
    "Come la luna riflette la luce del sole, noi riflettiamo la cura altrui.",
    "Il presente è il dono più prezioso che il tempo ci offre.",
    "Ogni parola gentile è un seme che germoglia nel cuore di chi ascolta.",
    "La forza non si misura in peso, ma in quanto si è capaci di sollevare gli altri.",
    "Come la quercia cresce lentamente, la saggezza matura nel tempo.",
    "La gioia condivisa si moltiplica; il dolore condiviso si dimezza.",
    "Ogni momento di quiete è un'oasi nell'oceano del quotidiano.",
    "La vita è un mosaico fatto di mille piccoli momenti colorati.",
    "Chi guarda le stelle non teme l'oscurità.",
    "La determinazione è il vento che gonfia le vele del cambiamento.",
    "Ogni esperienza è un maestro che ci accompagna nel cammino.",
    "La bellezza sta negli occhi di chi sa guardare con il cuore.",
    "Come le onde del mare, ogni difficoltà alla fine si ritrae.",
    "Il pensiero positivo è il seme da cui nasce il frutto della felicità.",
    "Ogni piccolo traguardo merita di essere celebrato con gioia.",
    "La montagna non si sposta, ma il camminatore trova sempre il sentiero.",
    "Chi porta luce nella vita degli altri illumina anche il proprio cammino.",
    "La saggezza è il fiume che scorre tranquillo tra le rive dell'esperienza.",
    "Ogni momento di gratitudine è una porta che si apre sulla felicità.",
    "La mente aperta è la casa in cui il mondo intero può entrare.",
    "Come la primavera segue l'inverno, la gioia segue ogni difficoltà.",
    "Il valore di una giornata si misura in quanto abbiamo amato il mondo.",
    "Ogni respiro profondo è un abbraccio che ci diamo da soli.",
    "La tenacia è il fuoco che arde anche sotto la pioggia più fredda.",
    "Chi ascolta con il cuore sente ciò che le parole non dicono.",
    "La vita è troppo bella per essere vissuta in fretta.",
    "Ogni piccola vittoria è il gradino su cui costruire i sogni futuri.",
    "Come il faro guida le navi, la speranza guida i cuori.",
    "La cura di sé è il fondamento su cui costruire tutto il resto.",
    "Ogni giorno vissuto con intenzione è un dono a noi stessi.",
    "La magia non è nei grandi gesti, ma nei piccoli momenti quotidiani.",
    "Chi coltiva la pazienza raccoglie frutti dolcissimi.",
    "La verità più profonda si trova spesso nel silenzio tra le parole.",
    "Ogni ostacolo è un punto di forza che aspetta di essere scoperto.",
    "Come il cristallo che brilla di più quando la luce lo attraversa.",
    "La vita è un campo di possibilità: sta a noi scegliere cosa seminare.",
    "Ogni momento di connessione con gli altri ci rende più umani.",
    "La leggerezza non è superficialità, ma libertà interiore.",
    "Chi non smette di imparare non smette di vivere davvero.",
    "La compassione è il ponte che collega le isole solitarie dei cuori.",
    "Ogni alba porta con sé nuove possibilità nascoste nell'attimo.",
    "Come la radice dell'albero sostiene il cielo senza vederlo, così la forza silenziosa ci sostiene.",
    "Il ritmo del cuore è la musica più vera che possiamo ascoltare.",
    "Ogni goccia di impegno forma l'oceano del successo.",
    "La creatività è il modo in cui l'anima si racconta al mondo.",
    "Chi impara a cadere impara anche a volare.",
    "La saggezza è sapere quando camminare e quando fermarsi ad ammirare.",
    "Ogni parola è un mondo: scegliamo quelle che costruiscono ponti.",
    "Come il diamante, la forza più grande si forma sotto pressione.",
    "La vita si misura non in anni, ma in momenti di vera presenza.",
    "Ogni sfida è un invito a scoprire forze che non sapevamo di avere.",
    "Il sorriso è la curva che mette tutto a posto.",
    "Chi costruisce con le mani del cuore crea cose che durano.",
    "La leggerezza del pensiero è il volo libero dell'immaginazione.",
    "Ogni piccolo atto di cura è una preghiera silenziosa al mondo.",
    "Come la luna illumina la notte, ogni gesto buono illumina il buio.",
    "La vita è fatta di capitoli: ogni pagina ha il suo valore.",
    "Chi ha imparato ad aspettare ha imparato l'arte più preziosa.",
    "La gioia più grande nasce spesso dalle cose più semplici.",
    "Ogni cuore che batte è un universo che merita di essere esplorato.",
    "Come i petali cadono per nutrire la terra, ogni esperienza nutre la nostra crescita.",
    "La strada non si percorre da soli: anche le impronte solitarie tracciano un cammino.",
    "Ogni momento è unico e irripetibile: viviamolo con piena presenza.",
    "La meraviglia è lo stato d'animo di chi sa ancora stupirsi.",
    "Chi porta pace nel cuore porta pace nel mondo."
];

const PHRASES_STORAGE_KEY = 'nonnetta_phrases_queue';

function getNextMotivationalPhrase() {
    let queue;
    try {
        queue = JSON.parse(localStorage.getItem(PHRASES_STORAGE_KEY) || '[]');
    } catch (e) {
        queue = [];
    }
    if (!Array.isArray(queue) || queue.length === 0) {
        // Build a fresh shuffled queue of indices
        queue = motivationalPhrases.map((_, i) => i);
        for (let i = queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
    }
    const idx = queue.pop();
    localStorage.setItem(PHRASES_STORAGE_KEY, JSON.stringify(queue));
    return motivationalPhrases[idx];
}

function showMotivationalPopup(moves) {
    const phrase = getNextMotivationalPhrase();
    const phraseEl = document.getElementById('motivational-phrase');
    const popup = document.getElementById('motivational-popup');
    if (!phraseEl || !popup) return;
    const congrats = popup.querySelector('.motivational-congrats');
    phraseEl.textContent = `"${phrase}"`;
    if (congrats) congrats.textContent = `🎉 Complimenti! Hai completato il gioco in ${moves} mosse!`;
    popup.style.display = 'flex';
    const closeBtn = document.getElementById('close-motivational-popup');

    function closePopup() {
        popup.style.display = 'none';
        document.removeEventListener('keydown', onKeyDown);
    }
    function onKeyDown(e) {
        if (e.key === 'Escape') closePopup();
    }

    if (closeBtn) {
        closeBtn.focus();
        closeBtn.onclick = closePopup;
    }
    popup.onclick = (e) => { if (e.target === popup) closePopup(); };
    document.addEventListener('keydown', onKeyDown);
}

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

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const messageEl = document.getElementById('notification-message');
    
    messageEl.textContent = message;
    toast.style.display = 'block';
    
    // Auto-hide after duration
    setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}

// ========== SOUND EFFECTS ==========
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('Audio not available');
        }
    }
    return audioContext;
}

function playSound(frequency, duration = 100, type = 'sine') {
    try {
        const ctx = initAudioContext();
        if (!ctx) return;
        
        // Resume audio context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration / 1000);
    } catch(e) {
        console.log('Audio playback error:', e);
    }
}

// ========== INITIALIZATION ==========
// onAuthStateChanged è avviato a livello di modulo per intercettare lo stato
// di autenticazione il prima possibile, indipendentemente dal caricamento del DOM.
let isDomReady = false;
onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
        currentUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            email: firebaseUser.email
        };
        if (isDomReady) updateAuthUI();
        await offerLocalDataMigration();
    } else {
        currentUser = null;
        if (isDomReady) updateAuthUI();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    isDomReady = true;
    initializeCookieBanner();
    initializeGameSelection();
    initializeAuth();
    initializeDiary();
    initializeNonnettaPlus();
    updateAuthUI();
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
        
        // Initialize audio context on user interaction
        initAudioContext();
        playSound(600, 50);
    });
    
    // Also initialize audio on any user click
    document.addEventListener('click', function initAudio() {
        initAudioContext();
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

// ========== GAME SELECTION ==========
function initializeGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    const backButtons = document.querySelectorAll('.btn-back');
    
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            if (!game) return; // Skip non-game cards (e.g. Nonnetta Plus)
            const difficulty = card.dataset.difficulty;
            
            // Check if user needs to be registered for this difficulty
            if ((difficulty === 'intermedio' || difficulty === 'esperto') && !currentUser) {
                showNotification('Devi essere registrato per accedere ai giochi di livello ' + difficulty);
                hapticFeedback('error');
                playSound(300, 100);
                return;
            }
            
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
    // Clean up any game-specific handlers
    cleanupScriviGame();
    
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
    
    // Create card pairs - 4 pairs = 8 cards arranged around center prize card
    const symbols = ['🌸', '🌺', '🌻', '🌷'];
    const cardPairs = [...symbols, ...symbols];
    memoryState.cards = cardPairs.sort(() => Math.random() - 0.5);
    
    // Render board - 3x3 grid with prize card locked at center (position 4)
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    let cardIndex = 0;
    for (let position = 0; position < 9; position++) {
        if (position === 4) {
            // Central prize card - visible but locked
            const prizeCard = document.createElement('button');
            prizeCard.className = 'memory-prize-card';
            prizeCard.id = 'memory-prize-card';
            prizeCard.disabled = true;
            prizeCard.setAttribute('aria-label', 'Carta premio - bloccata, si sblocca quando trovi tutte le coppie');
            prizeCard.innerHTML = '<div class="card-inner"><div class="card-front">🎁</div><div class="card-back">🏆</div></div>';
            board.appendChild(prizeCard);
        } else {
            const idx = cardIndex;
            const card = document.createElement('button');
            card.className = 'memory-card';
            card.dataset.index = idx;
            card.textContent = '?';
            card.tabIndex = 0;
            card.addEventListener('click', () => flipCard(idx));
            board.appendChild(card);
            cardIndex++;
        }
    }
    
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
            setTimeout(() => unlockPrizeCard(), 500);
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

function unlockPrizeCard() {
    const prizeCard = document.getElementById('memory-prize-card');
    if (!prizeCard) return;

    prizeCard.classList.add('unlocked');
    prizeCard.disabled = false;
    prizeCard.setAttribute('aria-label', 'Carta premio sbloccata - clicca per scoprire il tuo premio!');
    prizeCard.addEventListener('click', claimPrize, { once: true });

    hapticFeedback('success');
    playSound(880, 300);
    setTimeout(() => playSound(1100, 200), 350);
}

function claimPrize() {
    hapticFeedback('success');
    playSound(1000, 150);
    setTimeout(() => playSound(1200, 150), 180);
    setTimeout(() => playSound(1400, 200), 360);
    setTimeout(() => showMotivationalPopup(memoryState.moves), 700);
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
    currentSide: null,
    waitMode: false
};
let hasBinauralListeners = false;

function initBinauralGame() {
    document.getElementById('binaural-game').style.display = 'block';
    binauralState.score = 0;
    
    const ctx = initAudioContext();
    if (!ctx) {
        alert('Audio non disponibile su questo dispositivo');
        return;
    }
    
    if (!hasBinauralListeners) {
        document.getElementById('binaural-left').addEventListener('click', () => checkBinauralAnswer('left'));
        document.getElementById('binaural-right').addEventListener('click', () => checkBinauralAnswer('right'));
        document.getElementById('binaural-wait-mode').addEventListener('change', (e) => {
            binauralState.waitMode = e.target.checked;
        });
        hasBinauralListeners = true;
    }
    
    updateBinauralStats();
    playBinauralSound();
}

function playBinauralSound() {
    const ctx = initAudioContext();
    if (!ctx) return;
    
    // Resume if suspended
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    
    binauralState.currentSide = Math.random() < 0.5 ? 'left' : 'right';
    
    const oscillator = ctx.createOscillator();
    const panner = ctx.createStereoPanner();
    const gainNode = ctx.createGain();
    
    oscillator.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    panner.pan.value = binauralState.currentSide === 'left' ? -1 : 1;
    gainNode.gain.value = 0.3;
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
    
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
    keyboardHandler: null,
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
    
    // Store handler reference for cleanup
    scriviState.keyboardHandler = (e) => handleScriviKeyboard(e);
    document.addEventListener('keydown', scriviState.keyboardHandler);
}

function cleanupScriviGame() {
    if (scriviState.keyboardHandler) {
        document.removeEventListener('keydown', scriviState.keyboardHandler);
        scriviState.keyboardHandler = null;
    }
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

// ========== AUTHENTICATION SYSTEM ==========
let currentUser = null;
const googleProvider = new GoogleAuthProvider();

function initializeAuth() {
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

    // Google login button
    const googleBtn = document.getElementById('google-login-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }

    // Forgot password link
    const forgotLink = document.getElementById('forgot-password-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('forgot-password-modal').style.display = 'flex';
        });
    }

    // Forgot password form
    const forgotForm = document.getElementById('forgot-password-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }

    // Close modals
    document.getElementById('close-register-modal').addEventListener('click', () => {
        document.getElementById('register-modal').style.display = 'none';
    });
    const closeForgot = document.getElementById('close-forgot-password-modal');
    if (closeForgot) {
        closeForgot.addEventListener('click', () => {
            document.getElementById('forgot-password-modal').style.display = 'none';
        });
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById('login-form').reset();
        hapticFeedback('success');
        playSound(800, 100);
        showNotification('Accesso effettuato con successo!');
    } catch (err) {
        showNotification('Email o password errati');
        hapticFeedback('error');
        playSound(300, 100);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;

    if (password !== confirmPassword) {
        document.getElementById('register-message').textContent = 'Le password non corrispondono';
        return;
    }

    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        // Create user document in Firestore so admin panel can list this user
        await setDoc(doc(db, 'users', credential.user.uid), {
            email: email,
            displayName: name,
            createdAt: serverTimestamp()
        });
        // Update local user state with the chosen display name
        currentUser.name = name;
        document.getElementById('user-display-name').textContent = name;
        document.getElementById('register-modal').style.display = 'none';
        document.getElementById('register-form').reset();
        document.getElementById('register-message').textContent = '';
        hapticFeedback('success');
        playSound(800, 100);
        showNotification('Registrazione completata!');
    } catch (err) {
        let msg = 'Errore durante la registrazione';
        if (err.code === 'auth/email-already-in-use') msg = 'Email già registrata';
        if (err.code === 'auth/weak-password') msg = 'Password troppo debole (minimo 6 caratteri)';
        if (err.code === 'auth/invalid-email') msg = 'Indirizzo email non valido';
        document.getElementById('register-message').textContent = msg;
    }
}

async function handleGoogleLogin() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // Create user document in Firestore if it doesn't exist yet
        const userDocRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
                email: result.user.email,
                displayName: result.user.displayName || result.user.email.split('@')[0],
                createdAt: serverTimestamp()
            });
        }
        hapticFeedback('success');
        playSound(800, 100);
        showNotification('Accesso con Google effettuato!');
    } catch (err) {
        showNotification('Accesso con Google non riuscito');
        hapticFeedback('error');
    }
}

async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();
    try {
        await sendPasswordResetEmail(auth, email);
        document.getElementById('forgot-password-modal').style.display = 'none';
        document.getElementById('forgot-password-form').reset();
        showNotification('Email di recupero password inviata!');
    } catch (err) {
        document.getElementById('forgot-password-message').textContent = 'Indirizzo email non trovato o non valido';
    }
}

async function handleLogout() {
    await signOut(auth);
    hapticFeedback('light');
    playSound(400, 50);
}

function updateAuthUI() {
    const loggedOut = document.getElementById('auth-logged-out');
    if (!loggedOut) return; // DOM not ready yet
    if (currentUser) {
        loggedOut.style.display = 'none';
        document.getElementById('auth-logged-in').style.display = 'block';
        document.getElementById('user-display-name').textContent = currentUser.name;
    } else {
        loggedOut.style.display = 'block';
        document.getElementById('auth-logged-in').style.display = 'none';
    }
}

// ========== MIGRAZIONE DATI DA LOCALSTORAGE ==========
async function offerLocalDataMigration() {
    const migrationKey = `nonnetta-migrated-${currentUser.uid}`;
    if (localStorage.getItem(migrationKey)) return;

    const localDiary = JSON.parse(localStorage.getItem(`diary-${currentUser.email}`) || '[]');
    if (localDiary.length === 0) {
        localStorage.setItem(migrationKey, 'true');
        return;
    }

    if (!confirm(`Trovati ${localDiary.length} dati locali dal vecchio sistema. Vuoi importarli nel tuo profilo cloud?`)) {
        localStorage.setItem(migrationKey, 'true');
        return;
    }

    try {
        const diaryRef = collection(db, 'users', currentUser.uid, 'diary');
        for (const entry of localDiary) {
            await addDoc(diaryRef, {
                date: entry.date,
                game: entry.game,
                score: entry.score,
                importedAt: new Date().toISOString()
            });
        }
        localStorage.setItem(migrationKey, 'true');
        showNotification(`${localDiary.length} attività importate nel cloud!`);
    } catch (err) {
        console.error('Errore migrazione dati:', err);
        showNotification('Errore durante la migrazione dati locali');
    }
}

// ========== DIARY SYSTEM ==========
function initializeDiary() {
    document.getElementById('view-diary-btn').addEventListener('click', openDiary);
    document.getElementById('close-diary-modal').addEventListener('click', closeDiary);
    document.getElementById('download-diary-btn').addEventListener('click', downloadDiary);
    document.getElementById('print-diary-btn').addEventListener('click', printDiary);
}

async function logActivity(gameName, score) {
    if (!currentUser) return;

    // Cache locale non critica
    const localKey = `diary-cache-${currentUser.uid}`;
    const localCache = JSON.parse(localStorage.getItem(localKey) || '[]');
    const entry = { date: new Date().toISOString(), game: gameName, score };
    localCache.push(entry);
    localStorage.setItem(localKey, JSON.stringify(localCache));

    // Persistenza primaria su Firestore
    try {
        await addDoc(collection(db, 'users', currentUser.uid, 'diary'), {
            ...entry,
            createdAt: serverTimestamp()
        });
    } catch (err) {
        console.error('Errore salvataggio Firestore:', err);
    }
}

async function loadDiaryEntries() {
    if (!currentUser) return [];
    try {
        const q = query(
            collection(db, 'users', currentUser.uid, 'diary'),
            orderBy('date', 'asc')
        );
        const snap = await getDocs(q);
        return snap.docs.map(d => d.data());
    } catch (err) {
        console.error('Errore lettura diario:', err);
        // Fallback alla cache locale
        return JSON.parse(localStorage.getItem(`diary-cache-${currentUser.uid}`) || '[]');
    }
}

async function openDiary() {
    if (!currentUser) {
        showNotification('Devi essere registrato per vedere il diario');
        return;
    }

    const diary = await loadDiaryEntries();
    const diaryContent = document.getElementById('diary-content');

    if (diary.length === 0) {
        diaryContent.innerHTML = '<div class="diary-empty">Nessuna attività registrata ancora. Inizia a giocare!</div>';
    } else {
        const groupedByDate = {};
        diary.forEach(entry => {
            const date = new Date(entry.date).toLocaleDateString('it-IT');
            if (!groupedByDate[date]) groupedByDate[date] = [];
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

async function downloadDiary() {
    if (!currentUser) return;

    const diary = await loadDiaryEntries();

    let text = `DIARIO ATTIVITÀ - ${currentUser.name}\n`;
    text += `Email: ${currentUser.email}\n`;
    text += `Generato: ${new Date().toLocaleString('it-IT')}\n`;
    text += `\n${'='.repeat(50)}\n\n`;

    const groupedByDate = {};
    diary.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('it-IT');
        if (!groupedByDate[date]) groupedByDate[date] = [];
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
        showNotification('Devi essere registrato per accedere a Nonnetta Plus');
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
