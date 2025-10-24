//Импортируем необходимые модули
const readLineSync = require('readline-sync');

//Определяем загадочное слово и прогресс игрока
class Word {
    constructor(secretWord) {
        this.secretWord = secretWord.toLowerCase();
        this.guessedLetters = new Set();
        this.display = '_'.repeat(secretWord.length).trim();
    }

    //метод обновления отображения слова на основе предложенных букв
    updateDisplay(letter) {
        const newDisplay = this.secretWord.split('').map(char => {
            return this.guessedLetters.has(char) || char === letter ? char : '_';
        }).join(' ');
        this.display = newDisplay;
    }

    //проверка, угадано ли всё слово
    isGuessed() {
        return !this.display.includes('_');
    }
}

class HangmanGame {
    constructor() {
        this.wordList = ['javascript', 'nodejs', 'hangman', 'programming', 'developer'];
        this.secretWord = null;
        this.maxIncorrectGuesses = 6;
        this.incorrectGuesses = 0;
    }

    //метод начала игры
    start() {
        console.log('--- Welcome to Hangman! ---');
        const randomWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.secretWord = new Word(randomWord);
        this.play();
    }

    //Метод игрового процесса
    play() {
        while (this.incorrectGuesses < this.maxIncorrectGuesses) {
            this.displayStatus();
            const guess = readLineSync.question('Guess a letter: ').toLowerCase();

            if(!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
                console.log('Invalid input. pleas enter a single letter.');
                continue;
            }


            //Проверка, была ли буква уже угадана
            if (this.secretWord.guessedLetters.has(guess)) {
                console.log(`You already guessed "${guess}". Try again.`);
                continue;
            }
            this.secretWord.guessedLetters.add(guess);
            //Проверяем, есть ли буква в загаданном слове
            if (this.secretWord.secretWord.includes(guess)) {
                console.log(`Good guess!`);
                this.secretWord.updateDisplay(guess);
                if (this.secretWord.isGuessed()) {
                    this.displayStatus();
                    console.log('Congratulations! You guessed the word!');
                    return;
                }
            }else {
                this.incorrectGuesses++;
                console.log('Wrong guess!');
            }
        }
        //если игрок исчерпал все попытки
        this.displayStatus();
        console.log(`Game over! The word was: ${this.secretWord.secretWord}`);
    }
    //Метод отображения текущего статуса игры
    displayStatus() {
        console.log(`\nWord: ${this.secretWord.display}`);
        console.log(`Incorrect guesses: ${this.maxIncorrectGuesses - this.incorrectGuesses}`);
        this.displayHangman();
    }
    //Метод отображения виселицы
    displayHangman() {
        const stages = [
            `
    +---+ 
    |   |
        |
        |
        |
 =========\n`,                   
            `
    +---+ 
    |   |
    O   |
        |
        |
 =========\n`,  
            `
    +---+ 
    |   |
    O   |
    |   |
        |
 =========\n`,
 `
   +---+ 
    |   |
    O   |
   /|   |
        |
 =========\n`,
 ` 
   +---+ 
    |   |
    O   |
   /|\\  |
        |
 =========\n`, 
 `
   +---+ 
    |   |
    O   |
   /|\\  |
   /    |
 =========\n`,
 `
   +---+ 
    |   |
    O   |
   /|\\  |
   / \\  |
 =========\n`
        ];
        console.log(stages[this.incorrectGuesses]);
    }
}

//функция для запуска игры
function runGame() {
    const game = new HangmanGame();
    game.start();
}
//Экспортируем функцию запуска игры
module.exports = runGame;