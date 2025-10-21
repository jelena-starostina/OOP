//импортируем библиотеку readline для работы с пользователем через консоль
const readLineSync = require('readline-sync');

//Определяем класс игрока
class Player {
    constructor(name) {
        this.name = name;
        this.choice = null;
    }
}

//Определяем компьютерного игрока
class Computer extends Player {
    constructor() {
        super('Computer');
    }

    //Метод для случайного выбора хода компьютером
    makeRandomChoice(options) {
        const randomIndex = Math.floor(Math.random() * options.length);
        this.choice = options[randomIndex];
    }
}

//Определяем основную игровую логику
class RockPaperScissorsGame {
    constructor(player) {
        this.player = player;
        this.computer = new Computer();
        this.choices = ['Rock', 'Paper', 'Scissors'];
        this.rules = {
            Rock: 'Scissors', // Rock beats Scissors
            Paper: 'Rock', // Paper beats Rock
            Scissors: 'Paper' // Scissors beats Paper
        };
    }
    //Метод начала игры
    start() {
        console.log(`Welcome ${this.player.name} to Rock-Paper-Scissors!`);
        this.playRound();
    }
    //Метод игрового раунда
    playRound() {
        const choiceIndex = readLineSync.keyInSelect(this.choices, 'Choose Rock, Paper,or Scissors:');

        if (choiceIndex === -1) {
            console.log('Game exited.');
            return;
        }
        this.player.choice = this.choices[choiceIndex];
        this.computer.makeRandomChoice(this.choices);

        console.log(`${this.player.name} chose: ${this.player.choice}`);
        console.log(`Computer chose: ${this.computer.choice}`);

        this.determineWinner();
    }
    //Метод определения победителя
    determineWinner() {
        const playerChoice = this.player.choice;
        const computerChoice = this.computer.choice;

        if (playerChoice === computerChoice) {
            console.log("It's a tie");
        } else if (this.rules[playerChoice] === computerChoice) {
            console.log(`${this.player.name} wins!`);
        }else {
            console.log('Computer wins!');
        }
        
    }
}
//создаём функцию для экспорта игры
function runGame() {
    const playerName = readLineSync.question('Enter your name: ');
    const player = new Player(playerName || 'Player');
    const game = new RockPaperScissorsGame(player);
    game.start();
}
//И теперь экспортируем функцию запуска игры
module.exports = runGame;