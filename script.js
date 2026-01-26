// Multilingual Support
const translations = {
    en: {
        subtitle: "Neurocognitive Stimulation Exercises",
        chooseExercise: "Choose an Exercise",
        memoryMatch: "Memory Match",
        patternRecognition: "Pattern Recognition",
        colorMatch: "Color Match",
        sequenceMemory: "Sequence Memory",
        typingGame: "Typing",
        bilateralStimulation: "Bilateral Stimulation",
        activityDiary: "Activity Diary",
        menu: "Menu",
        next: "Next",
        correct: "Correct",
        start: "Start",
        stop: "Stop",
        speed: "Speed",
        firstName: "First Name",
        lastName: "Last Name",
        save: "Save",
        download: "Download",
        print: "Print",
        activityLog: "Activity Log",
        typingInstructions: "Type the word shown below as fast as you can!",
        bilateralInstructions: "Follow the sound from left to right with your eyes closed. Use headphones or stereo speakers."
    },
    it: {
        subtitle: "Esercizi di Stimolazione Neurocognitiva",
        chooseExercise: "Scegli un Esercizio",
        memoryMatch: "Memoria",
        patternRecognition: "Riconoscimento Pattern",
        colorMatch: "Colori",
        sequenceMemory: "Sequenza",
        typingGame: "Dattilografia",
        bilateralStimulation: "Stimolazione Bilaterale",
        activityDiary: "Diario Attività",
        menu: "Menu",
        next: "Avanti",
        correct: "Corrette",
        start: "Inizia",
        stop: "Ferma",
        speed: "Velocità",
        firstName: "Nome",
        lastName: "Cognome",
        save: "Salva",
        download: "Scarica",
        print: "Stampa",
        activityLog: "Registro Attività",
        typingInstructions: "Digita la parola mostrata il più velocemente possibile!",
        bilateralInstructions: "Segui il suono da sinistra a destra con gli occhi chiusi. Usa cuffie o casse stereo."
    },
    es: {
        subtitle: "Ejercicios de Estimulación Neurocognitiva",
        chooseExercise: "Elige un Ejercicio",
        memoryMatch: "Memoria",
        patternRecognition: "Reconocimiento de Patrones",
        colorMatch: "Colores",
        sequenceMemory: "Secuencia",
        typingGame: "Mecanografía",
        bilateralStimulation: "Estimulación Bilateral",
        activityDiary: "Diario de Actividades",
        menu: "Menú",
        next: "Siguiente",
        correct: "Correctas",
        start: "Iniciar",
        stop: "Detener",
        speed: "Velocidad",
        firstName: "Nombre",
        lastName: "Apellido",
        save: "Guardar",
        download: "Descargar",
        print: "Imprimir",
        activityLog: "Registro de Actividades",
        typingInstructions: "¡Escribe la palabra mostrada lo más rápido que puedas!",
        bilateralInstructions: "Sigue el sonido de izquierda a derecha con los ojos cerrados. Usa auriculares o altavoces estéreo."
    },
    fr: {
        subtitle: "Exercices de Stimulation Neurocognitive",
        chooseExercise: "Choisissez un Exercice",
        memoryMatch: "Mémoire",
        patternRecognition: "Reconnaissance de Motifs",
        colorMatch: "Couleurs",
        sequenceMemory: "Séquence",
        typingGame: "Dactylographie",
        bilateralStimulation: "Stimulation Bilatérale",
        activityDiary: "Journal d'Activités",
        menu: "Menu",
        next: "Suivant",
        correct: "Correctes",
        start: "Démarrer",
        stop: "Arrêter",
        speed: "Vitesse",
        firstName: "Prénom",
        lastName: "Nom",
        save: "Sauvegarder",
        download: "Télécharger",
        print: "Imprimer",
        activityLog: "Journal des Activités",
        typingInstructions: "Tapez le mot affiché aussi vite que possible!",
        bilateralInstructions: "Suivez le son de gauche à droite les yeux fermés. Utilisez des écouteurs ou des haut-parleurs stéréo."
    },
    de: {
        subtitle: "Neurokognitive Stimulationsübungen",
        chooseExercise: "Wähle eine Übung",
        memoryMatch: "Gedächtnis",
        patternRecognition: "Mustererkennung",
        colorMatch: "Farben",
        sequenceMemory: "Sequenz",
        typingGame: "Tippen",
        bilateralStimulation: "Bilaterale Stimulation",
        activityDiary: "Aktivitätstagebuch",
        menu: "Menü",
        next: "Weiter",
        correct: "Richtig",
        start: "Start",
        stop: "Stopp",
        speed: "Geschwindigkeit",
        firstName: "Vorname",
        lastName: "Nachname",
        save: "Speichern",
        download: "Herunterladen",
        print: "Drucken",
        activityLog: "Aktivitätsprotokoll",
        typingInstructions: "Tippe das angezeigte Wort so schnell wie möglich!",
        bilateralInstructions: "Folge dem Klang von links nach rechts mit geschlossenen Augen. Verwende Kopfhörer oder Stereolautsprecher."
    }
};

// Audio System
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    return audioContext;
}

function playSound(frequency, duration, volume = 0.3, panValue = 0) {
    const ctx = initAudio();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createStereoPanner();
    
    oscillator.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = volume;
    panner.pan.value = panValue; // -1 (left) to 1 (right)
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

function playCorrectSound() {
    playSound(800, 0.15, 0.3);
    setTimeout(() => playSound(1000, 0.15, 0.3), 100);
}

function playWrongSound() {
    playSound(200, 0.3, 0.3);
}

function playClickSound() {
    playSound(600, 0.05, 0.2);
}

let currentLanguage = 'en';

function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    return translations[langCode] ? langCode : 'en';
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Game State Management
let currentGame = null;
let memoryScore = 0;
let patternScore = 0;
let colorScore = 0;
let sequenceLevel = 1;
let typingScore = 0;

// Memory Game Variables
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Pattern Game Variables
let currentPattern = [];
let correctAnswer = '';

// Color Game Variables
let targetColor = '';
let colorOptions = [];

// Sequence Game Variables
let sequence = [];
let playerSequence = [];
let isShowingSequence = false;

// Typing Game Variables
let currentTypingWord = '';
let typingWrongSoundPlayed = false;
const typingWords = {
    en: ['HELLO', 'WORLD', 'BRAIN', 'SMART', 'HAPPY', 'LIGHT', 'PLAY', 'THINK', 'LEARN', 'FOCUS'],
    it: ['CIAO', 'MONDO', 'CERVELLO', 'INTELLIGENTE', 'FELICE', 'LUCE', 'GIOCA', 'PENSA', 'IMPARA', 'CONCENTRA'],
    es: ['HOLA', 'MUNDO', 'CEREBRO', 'INTELIGENTE', 'FELIZ', 'LUZ', 'JUGAR', 'PENSAR', 'APRENDER', 'ENFOQUE'],
    fr: ['BONJOUR', 'MONDE', 'CERVEAU', 'INTELLIGENT', 'HEUREUX', 'LUMIÈRE', 'JOUER', 'PENSER', 'APPRENDRE', 'FOCUS'],
    de: ['HALLO', 'WELT', 'GEHIRN', 'KLUG', 'GLÜCKLICH', 'LICHT', 'SPIELEN', 'DENKEN', 'LERNEN', 'FOKUS']
};

// Bilateral Stimulation Variables
let bilateralInterval = null;
let bilateralSpeed = 800;

// Diary Variables
let userName = { firstName: '', lastName: '' };
let activityLog = [];

// Emojis for games
const memoryEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🏵️'];
const patternShapes = ['🔷', '🔶', '⭐', '❤️', '🌙', '☀️'];
const sequenceEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🏵️', '🌼', '🪷'];

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.game-section, .exercise-menu').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Log activity
    logActivity(sectionId);
}

function backToMenu() {
    showSection('menu');
    currentGame = null;
    
    // Stop bilateral stimulation if running
    if (bilateralInterval) {
        stopBilateralStimulation();
    }
}

// Memory Match Game
function startMemoryGame() {
    currentGame = 'memory';
    memoryScore = 0;
    matchedPairs = 0;
    flippedCards = [];
    
    showSection('memory-game');
    document.getElementById('memory-score').textContent = memoryScore;
    
    // Create card pairs
    const pairs = memoryEmojis.slice(0, 6);
    memoryCards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    
    // Render cards
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.setAttribute('aria-label', `Memory card ${index + 1}`);
        card.textContent = '?';
        card.onclick = () => flipCard(card, emoji, index);
        grid.appendChild(card);
    });
}

function flipCard(card, emoji, index) {
    // Ignore if already flipped or matched
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
        return;
    }
    
    // Flip card
    playClickSound();
    card.classList.add('flipped');
    card.textContent = emoji;
    flippedCards.push({ card, emoji, index });
    
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.emoji === card2.emoji && card1.index !== card2.index) {
        // Match found
        playCorrectSound();
        card1.card.classList.add('matched');
        card2.card.classList.add('matched');
        matchedPairs++;
        memoryScore++;
        document.getElementById('memory-score').textContent = memoryScore;
        
        // Check if game is complete
        if (matchedPairs === 6) {
            setTimeout(() => {
                playCorrectSound();
                alert('🎉 Congratulations! You matched all pairs!');
            }, 500);
        }
    } else {
        // No match
        playWrongSound();
        card1.card.classList.remove('flipped');
        card2.card.classList.remove('flipped');
        card1.card.textContent = '?';
        card2.card.textContent = '?';
    }
    
    flippedCards = [];
}

function resetMemoryGame() {
    startMemoryGame();
}

// Pattern Recognition Game
function startPatternGame() {
    currentGame = 'pattern';
    patternScore = 0;
    
    showSection('pattern-game');
    document.getElementById('pattern-score').textContent = patternScore;
    
    generatePattern();
}

function generatePattern() {
    // Create a simple pattern (e.g., repeating shape)
    const shape = patternShapes[Math.floor(Math.random() * patternShapes.length)];
    const patternLength = 3 + Math.floor(Math.random() * 2); // 3-4 shapes
    
    currentPattern = Array(patternLength).fill(shape);
    correctAnswer = shape;
    
    // Display pattern
    const display = document.getElementById('pattern-display');
    display.innerHTML = '';
    
    currentPattern.forEach(shape => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'pattern-shape';
        shapeDiv.textContent = shape;
        display.appendChild(shapeDiv);
    });
    
    // Create options (correct answer + 3 random wrong answers)
    const wrongAnswers = patternShapes.filter(s => s !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    const optionsDiv = document.getElementById('pattern-options');
    optionsDiv.innerHTML = '';
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'pattern-option';
        btn.textContent = option;
        btn.setAttribute('aria-label', `Pattern option`);
        btn.onclick = () => checkPattern(btn, option);
        optionsDiv.appendChild(btn);
    });
}

function checkPattern(btn, selected) {
    if (selected === correctAnswer) {
        playCorrectSound();
        btn.classList.add('correct');
        patternScore++;
        document.getElementById('pattern-score').textContent = patternScore;
        setTimeout(() => {
            generatePattern();
        }, 1000);
    } else {
        playWrongSound();
        btn.classList.add('wrong');
        setTimeout(() => {
            btn.classList.remove('wrong');
        }, 500);
    }
}

function nextPattern() {
    generatePattern();
}

// Color Match Game
function startColorGame() {
    currentGame = 'color';
    colorScore = 0;
    
    showSection('color-game');
    document.getElementById('color-score').textContent = colorScore;
    
    generateColorChallenge();
}

function generateColorChallenge() {
    // Define vibrant colors for the game
    const colors = [
        { name: 'Pink', hex: '#FFB4D4' },
        { name: 'Green', hex: '#7BC67B' },
        { name: 'Blue', hex: '#A4D4FF' },
        { name: 'Yellow', hex: '#FFE5A4' },
        { name: 'Purple', hex: '#D4B4FF' },
        { name: 'Orange', hex: '#FFD4A4' }
    ];
    
    // Select target color
    const target = colors[Math.floor(Math.random() * colors.length)];
    targetColor = target.hex;
    
    // Display target
    const targetDiv = document.getElementById('color-target');
    targetDiv.style.backgroundColor = targetColor;
    
    // Create options (correct + 3 wrong)
    const wrongColors = colors.filter(c => c.hex !== targetColor)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    colorOptions = [target, ...wrongColors].sort(() => Math.random() - 0.5);
    
    const optionsDiv = document.getElementById('color-options');
    optionsDiv.innerHTML = '';
    
    colorOptions.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'color-option';
        btn.style.backgroundColor = color.hex;
        btn.setAttribute('aria-label', `Color option ${color.name}`);
        btn.onclick = () => checkColor(btn, color.hex);
        optionsDiv.appendChild(btn);
    });
}

function checkColor(btn, selected) {
    if (selected === targetColor) {
        playCorrectSound();
        btn.classList.add('correct');
        colorScore++;
        document.getElementById('color-score').textContent = colorScore;
        setTimeout(() => {
            generateColorChallenge();
        }, 1000);
    } else {
        playWrongSound();
        btn.classList.add('wrong');
        setTimeout(() => {
            btn.classList.remove('wrong');
        }, 500);
    }
}

function nextColor() {
    generateColorChallenge();
}

// Sequence Memory Game
function startSequenceGame() {
    currentGame = 'sequence';
    sequenceLevel = 1;
    sequence = [];
    playerSequence = [];
    
    showSection('sequence-game');
    document.getElementById('sequence-level').textContent = sequenceLevel;
    
    // Create grid
    const grid = document.getElementById('sequence-grid');
    grid.innerHTML = '';
    
    sequenceEmojis.forEach((emoji, index) => {
        const btn = document.createElement('button');
        btn.className = 'sequence-btn';
        btn.textContent = emoji;
        btn.dataset.index = index;
        btn.setAttribute('aria-label', `Sequence button ${emoji}`);
        btn.onclick = () => handleSequenceInput(index);
        grid.appendChild(btn);
    });
}

function startSequence() {
    if (isShowingSequence) return;
    
    playerSequence = [];
    sequence.push(Math.floor(Math.random() * sequenceEmojis.length));
    
    showSequence();
}

async function showSequence() {
    isShowingSequence = true;
    document.getElementById('start-sequence-btn').disabled = true;
    
    // Disable all buttons during sequence display
    const buttons = document.querySelectorAll('.sequence-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    for (let i = 0; i < sequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const btn = document.querySelector(`.sequence-btn[data-index="${sequence[i]}"]`);
        btn.classList.add('active');
        
        await new Promise(resolve => setTimeout(resolve, 600));
        btn.classList.remove('active');
    }
    
    // Enable buttons for player input
    buttons.forEach(btn => btn.disabled = false);
    document.getElementById('start-sequence-btn').disabled = false;
    isShowingSequence = false;
}

function handleSequenceInput(index) {
    if (isShowingSequence) return;
    
    playerSequence.push(index);
    
    // Animate button press
    const btn = document.querySelector(`.sequence-btn[data-index="${index}"]`);
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 300);
    
    // Check if correct so far
    const currentIndex = playerSequence.length - 1;
    
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        // Wrong! Reset
        playWrongSound();
        alert('❌ Oops! Try again from level 1.');
        sequenceLevel = 1;
        sequence = [];
        playerSequence = [];
        document.getElementById('sequence-level').textContent = sequenceLevel;
        return;
    }
    
    // Check if sequence complete
    if (playerSequence.length === sequence.length) {
        // Correct! Next level
        playCorrectSound();
        sequenceLevel++;
        document.getElementById('sequence-level').textContent = sequenceLevel;
        setTimeout(() => {
            alert(`🎉 Great! Moving to level ${sequenceLevel}!`);
            startSequence();
        }, 500);
    }
}

// Typing Game
function startTypingGame() {
    currentGame = 'typing';
    typingScore = 0;
    
    showSection('typing-game');
    document.getElementById('typing-score').textContent = typingScore;
    
    generateTypingWord();
    
    // Setup input handler
    const input = document.getElementById('typing-input');
    input.value = '';
    input.focus();
    
    input.onkeyup = checkTyping;
}

function generateTypingWord() {
    const words = typingWords[currentLanguage] || typingWords['en'];
    currentTypingWord = words[Math.floor(Math.random() * words.length)];
    
    document.getElementById('typing-word').textContent = currentTypingWord;
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-input').focus();
    typingWrongSoundPlayed = false; // Reset wrong sound flag
}

function checkTyping(event) {
    const input = document.getElementById('typing-input');
    const typed = input.value.toUpperCase().trim();
    
    // Early return if word is not complete yet
    if (typed.length < currentTypingWord.length) {
        typingWrongSoundPlayed = false; // Reset if typing is still in progress
        return;
    }
    
    if (typed === currentTypingWord) {
        playCorrectSound();
        typingScore++;
        document.getElementById('typing-score').textContent = typingScore;
        
        // Animate success
        input.style.borderColor = 'var(--dark-green)';
        setTimeout(() => {
            input.style.borderColor = '';
            generateTypingWord();
        }, 500);
    } else if (typed.length > currentTypingWord.length && !typingWrongSoundPlayed) {
        playWrongSound();
        typingWrongSoundPlayed = true; // Only play once per wrong attempt
    }
}

function nextTypingWord() {
    generateTypingWord();
}

// Bilateral Stimulation Game
function startBilateralGame() {
    currentGame = 'bilateral';
    showSection('bilateral-game');
    
    // Setup speed control
    const speedInput = document.getElementById('bilateral-speed');
    speedInput.value = bilateralSpeed;
    speedInput.oninput = (e) => {
        bilateralSpeed = parseInt(e.target.value);
        document.getElementById('bilateral-speed-value').textContent = bilateralSpeed + 'ms';
        if (bilateralInterval) {
            stopBilateralStimulation();
            startBilateralStimulation();
        }
    };
}

function startBilateralStimulation() {
    if (bilateralInterval) return;
    
    const leftIndicator = document.getElementById('bilateral-left');
    const rightIndicator = document.getElementById('bilateral-right');
    let isLeft = true;
    
    bilateralInterval = setInterval(() => {
        // Remove active from both
        leftIndicator.classList.remove('active');
        rightIndicator.classList.remove('active');
        
        // Toggle side
        if (isLeft) {
            leftIndicator.classList.add('active');
            playSound(440, 0.2, 0.3, -0.8); // Play sound on left
        } else {
            rightIndicator.classList.add('active');
            playSound(440, 0.2, 0.3, 0.8); // Play sound on right
        }
        
        isLeft = !isLeft;
    }, bilateralSpeed);
}

function stopBilateralStimulation() {
    if (bilateralInterval) {
        clearInterval(bilateralInterval);
        bilateralInterval = null;
        
        // Remove active states
        document.getElementById('bilateral-left').classList.remove('active');
        document.getElementById('bilateral-right').classList.remove('active');
    }
}

// Activity Diary Functions
function openDiary() {
    showSection('diary-section');
    loadUserInfo();
    loadActivityLog();
}

function loadUserInfo() {
    try {
        const saved = localStorage.getItem('rosetta_user');
        if (saved) {
            userName = JSON.parse(saved);
            document.getElementById('user-first-name').value = userName.firstName || '';
            document.getElementById('user-last-name').value = userName.lastName || '';
        }
    } catch (e) {
        console.error('Error loading user info:', e);
        userName = { firstName: '', lastName: '' };
    }
}

function saveUserInfo() {
    userName.firstName = document.getElementById('user-first-name').value.trim();
    userName.lastName = document.getElementById('user-last-name').value.trim();
    
    if (userName.firstName && userName.lastName) {
        localStorage.setItem('rosetta_user', JSON.stringify(userName));
        playCorrectSound();
        alert('✅ User information saved!');
    } else {
        playWrongSound();
        alert('⚠️ Please enter both first and last name.');
    }
}

function logActivity(sectionId) {
    const activityNames = {
        'memory-game': 'Memory Match',
        'pattern-game': 'Pattern Recognition',
        'color-game': 'Color Match',
        'sequence-game': 'Sequence Memory',
        'typing-game': 'Typing Game',
        'bilateral-game': 'Bilateral Stimulation'
    };
    
    if (activityNames[sectionId]) {
        const activity = {
            date: new Date().toISOString(),
            activity: activityNames[sectionId]
        };
        
        try {
            // Load existing log
            const savedLog = localStorage.getItem('rosetta_activity_log');
            activityLog = savedLog ? JSON.parse(savedLog) : [];
            
            // Add new activity
            activityLog.push(activity);
            
            // Save to localStorage
            localStorage.setItem('rosetta_activity_log', JSON.stringify(activityLog));
        } catch (e) {
            console.error('Error logging activity:', e);
            activityLog = [activity];
        }
    }
}

function loadActivityLog() {
    try {
        const savedLog = localStorage.getItem('rosetta_activity_log');
        activityLog = savedLog ? JSON.parse(savedLog) : [];
    } catch (e) {
        console.error('Error loading activity log:', e);
        activityLog = [];
    }
    
    const entriesDiv = document.getElementById('diary-entries');
    entriesDiv.innerHTML = '';
    
    if (activityLog.length === 0) {
        entriesDiv.innerHTML = '<p style="text-align: center; color: var(--text-dark);">No activities recorded yet.</p>';
        return;
    }
    
    // Display in reverse order (newest first)
    activityLog.slice().reverse().forEach(entry => {
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString(currentLanguage, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const entryDiv = document.createElement('div');
        entryDiv.className = 'diary-entry';
        entryDiv.innerHTML = `
            <div class="diary-entry-date">${dateStr}</div>
            <div class="diary-entry-activity">📝 ${entry.activity}</div>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

function downloadDiary() {
    if (!userName.firstName || !userName.lastName) {
        playWrongSound();
        alert('⚠️ Please enter your name first.');
        return;
    }
    
    let content = `Activity Diary - ${userName.firstName} ${userName.lastName}\n`;
    content += `Generated on: ${new Date().toLocaleString(currentLanguage)}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    activityLog.forEach(entry => {
        const date = new Date(entry.date).toLocaleString(currentLanguage);
        content += `${date} - ${entry.activity}\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rosetta_diary_${userName.firstName}_${userName.lastName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    playCorrectSound();
}

function printDiary() {
    if (!userName.firstName || !userName.lastName) {
        playWrongSound();
        alert('⚠️ Please enter your name first.');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    let content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Activity Diary - ${userName.firstName} ${userName.lastName}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #2C3E2C;
                    border-bottom: 3px solid #B8E6B8;
                    padding-bottom: 10px;
                }
                .entry {
                    margin: 20px 0;
                    padding: 15px;
                    background: #FFD6E8;
                    border-left: 5px solid #FFB4D4;
                    border-radius: 8px;
                }
                .date {
                    font-weight: bold;
                    color: #2C3E2C;
                }
                .activity {
                    margin-top: 5px;
                    color: #2C3E2C;
                }
            </style>
        </head>
        <body>
            <h1>💡 Nonnetta NSE - Activity Diary</h1>
            <h2>${userName.firstName} ${userName.lastName}</h2>
            <p><strong>Generated:</strong> ${new Date().toLocaleString(currentLanguage)}</p>
            <hr>
    `;
    
    activityLog.slice().reverse().forEach(entry => {
        const date = new Date(entry.date).toLocaleString(currentLanguage);
        content += `
            <div class="entry">
                <div class="date">${date}</div>
                <div class="activity">📝 ${entry.activity}</div>
            </div>
        `;
    });
    
    content += '</body></html>';
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Nonnetta NSE - Neurocognitive Stimulation App Loaded');
    
    // Set language based on browser
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
});
