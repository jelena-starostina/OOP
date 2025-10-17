//Импортируем необходимые модули
const readLineSync = require('readline-sync');

//Определяем игрока
class Player {
    constructor(name) {
        //Конструктор инициализирует игрока с именем
        this.name = name;
    }
}

//Определяем игровую логику
class GuessTheNumberGame {
    //Конструктор настраивает игру
    constructor(player) {
        this.player = player;
        this.secretNumber = 0;
        this.maxGuesses = 5;
        this.guessesLeft = 0;
    }
    //Метод начала игры
    start() {
        console.log(`Welcome ${this.player.name} to 'Guess the Number'!`);
        this.secretNumber = Math.floor(Math.random() * 100) + 1; // Секретное число от 1 до 100
        this.guessesLeft = this.maxGuesses;
        console.log(`I have chosen a number between 1 and 100. You have ${this.maxGuesses} attempts to guess it.`);
        this.playRound();

    }
    //Метод игрового раунда
    playRound() {
        while (this.guessesLeft > 0) {
            //получаем предположение игрока
            const guess = readLineSync.questionInt(`You have ${this.guessesLeft} guesses left. Enter your guess: `);
            const guessNum = parseInt(guess, 10);

            //проверяем что ввел пользователь
            if (isNaN(guessNum)) {
                console.log('this is not a number, please try again.');
                continue;
            }
            this.guessesLeft--;

            //проверяем правильность предположения
            if (guessNum === this.secretNumber) {
                console.log(`Congratulations ${this.player.name}, you guessed the number ${this.secretNumber}!`);
                return;
            } else if (guessNum < this.secretNumber) {
                console.log('too low!');
            } else {
                console.log('too high!');
            }
        }
        console.log(`Sorry, ${this.secretNumber}. Try again!`);
        }
    }
    //Создаем функцию для экспорта игры
    function runGame() {
        const playerName = readLineSync.question('Enter your name: ');
        const player = new Player(playerName || 'Player');   
        const game = new GuessTheNumberGame(player);
        game.start();
    }
    //Экспортируем функцию запуска игры
    module.exports = runGame;

