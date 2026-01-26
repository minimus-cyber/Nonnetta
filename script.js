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
        menu: "Menu",
        next: "Next",
        correct: "Correct",
        typingInstructions: "Type the word shown below as fast as you can!"
    },
    it: {
        subtitle: "Esercizi di Stimolazione Neurocognitiva",
        chooseExercise: "Scegli un Esercizio",
        memoryMatch: "Memoria",
        patternRecognition: "Riconoscimento Pattern",
        colorMatch: "Colori",
        sequenceMemory: "Sequenza",
        typingGame: "Dattilografia",
        menu: "Menu",
        next: "Avanti",
        correct: "Corrette",
        typingInstructions: "Digita la parola mostrata il più velocemente possibile!"
    },
    es: {
        subtitle: "Ejercicios de Estimulación Neurocognitiva",
        chooseExercise: "Elige un Ejercicio",
        memoryMatch: "Memoria",
        patternRecognition: "Reconocimiento de Patrones",
        colorMatch: "Colores",
        sequenceMemory: "Secuencia",
        typingGame: "Mecanografía",
        menu: "Menú",
        next: "Siguiente",
        correct: "Correctas",
        typingInstructions: "¡Escribe la palabra mostrada lo más rápido que puedas!"
    },
    fr: {
        subtitle: "Exercices de Stimulation Neurocognitive",
        chooseExercise: "Choisissez un Exercice",
        memoryMatch: "Mémoire",
        patternRecognition: "Reconnaissance de Motifs",
        colorMatch: "Couleurs",
        sequenceMemory: "Séquence",
        typingGame: "Dactylographie",
        menu: "Menu",
        next: "Suivant",
        correct: "Correctes",
        typingInstructions: "Tapez le mot affiché aussi vite que possible!"
    },
    de: {
        subtitle: "Neurokognitive Stimulationsübungen",
        chooseExercise: "Wähle eine Übung",
        memoryMatch: "Gedächtnis",
        patternRecognition: "Mustererkennung",
        colorMatch: "Farben",
        sequenceMemory: "Sequenz",
        typingGame: "Tippen",
        menu: "Menü",
        next: "Weiter",
        correct: "Richtig",
        typingInstructions: "Tippe das angezeigte Wort so schnell wie möglich!"
    }
};

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
const typingWords = {
    en: ['HELLO', 'WORLD', 'BRAIN', 'SMART', 'HAPPY', 'LIGHT', 'PLAY', 'THINK', 'LEARN', 'FOCUS'],
    it: ['CIAO', 'MONDO', 'CERVELLO', 'INTELLIGENTE', 'FELICE', 'LUCE', 'GIOCA', 'PENSA', 'IMPARA', 'CONCENTRA'],
    es: ['HOLA', 'MUNDO', 'CEREBRO', 'INTELIGENTE', 'FELIZ', 'LUZ', 'JUGAR', 'PENSAR', 'APRENDER', 'ENFOQUE'],
    fr: ['BONJOUR', 'MONDE', 'CERVEAU', 'INTELLIGENT', 'HEUREUX', 'LUMIÈRE', 'JOUER', 'PENSER', 'APPRENDRE', 'FOCUS'],
    de: ['HALLO', 'WELT', 'GEHIRN', 'KLUG', 'GLÜCKLICH', 'LICHT', 'SPIELEN', 'DENKEN', 'LERNEN', 'FOKUS']
};

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
}

function backToMenu() {
    showSection('menu');
    currentGame = null;
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
        card1.card.classList.add('matched');
        card2.card.classList.add('matched');
        matchedPairs++;
        memoryScore++;
        document.getElementById('memory-score').textContent = memoryScore;
        
        // Check if game is complete
        if (matchedPairs === 6) {
            setTimeout(() => {
                alert('🎉 Congratulations! You matched all pairs!');
            }, 500);
        }
    } else {
        // No match
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
        btn.classList.add('correct');
        patternScore++;
        document.getElementById('pattern-score').textContent = patternScore;
        setTimeout(() => {
            generatePattern();
        }, 1000);
    } else {
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
        btn.classList.add('correct');
        colorScore++;
        document.getElementById('color-score').textContent = colorScore;
        setTimeout(() => {
            generateColorChallenge();
        }, 1000);
    } else {
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
}

function checkTyping(event) {
    const input = document.getElementById('typing-input');
    const typed = input.value.toUpperCase().trim();
    
    // Early return if word is not complete yet
    if (typed.length < currentTypingWord.length) {
        return;
    }
    
    if (typed === currentTypingWord) {
        typingScore++;
        document.getElementById('typing-score').textContent = typingScore;
        
        // Animate success
        input.style.borderColor = 'var(--dark-green)';
        setTimeout(() => {
            input.style.borderColor = '';
            generateTypingWord();
        }, 500);
    }
}

function nextTypingWord() {
    generateTypingWord();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rosetta Neurocognitive Stimulation App Loaded');
    
    // Set language based on browser
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
});
