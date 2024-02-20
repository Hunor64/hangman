let selectedWord = "";
let guessedLetters = [];
let lives = 6;
const alphabet = 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz'.split('');

const wordDisplay = document.getElementById('word-display');
const canvas = document.getElementById('hangman-canvas');
const keyboard = document.getElementById('keyboard');
const livesDisplay = document.getElementById('lives');
const resetBtn = document.getElementById('reset-btn');

init();

resetBtn.addEventListener('click', init);

function init() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = 6;
    updateDisplay();
    createKeyboard();
}

function createKeyboard() {
    keyboard.innerHTML = ''; 
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.setAttribute('data-letter', letter);
        button.classList.add('gey')
        button.classList.add(letter);
        button.addEventListener('click', handleLetterClick);
        keyboard.appendChild(button);
    });
}

function handleLetterClick(event) {
    const letter = event.target.dataset.letter;
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        const isCorrect = selectedWord.includes(letter);
        if (isCorrect) {
            event.target.classList.add('green');
            event.target.classList.remove('gey');
        } else {
            lives--;
            event.target.classList.add('red')
            event.target.classList.remove('gey');
        }
        updateDisplay();
        checkWinLose();
    }
}
function handleKeyEvents(event) {
    if (event.key.length === 1) {
        const letter = event.key.toLowerCase();
        const button = document.querySelector(`button[data-letter="${letter}"]`);
        if (button) {
            button.click();
        }
    }
}

document.addEventListener('keypress', handleKeyEvents);

function updateDisplay() {
    wordDisplay.innerHTML = selectedWord.split('').map(letter => 
        `<span>${guessedLetters.includes(letter) ? letter : (letter === ' ' ? ' ' : '_')}</span>`
    ).join(''); 
    livesDisplay.textContent = "Lives: " + lives;
}

function checkWinLose() {
    const wordSolved = selectedWord.split('').every(letter => guessedLetters.includes(letter));
    if (wordSolved) {
        alert('Nyertél!');
        init(); 
    } else if (lives === 0) {
        alert('Vesztettél! A szó: ' + selectedWord+ " volt!");
        init(); 
    }
}


//sUOPER SEKRET DEBUGGING SETTIGNGS
function debug(){
    console.log(selectedWord);
    console.log(guessedLetters);
    console.log(lives);
    console.log(alphabet);
    console.log(wordDisplay);

}
function morLives(){
    lives = 999;
    checkWinLose() 
    debug()
}
function kys(){
    lives = 0
    checkWinLose()
    console.log("You have been dies")
}