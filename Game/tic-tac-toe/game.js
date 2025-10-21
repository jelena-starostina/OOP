//Импортируем библиотеку readline для взаимодействия с пользователем через консоль
const readLineSync = require('readline-sync');

//Определяем класс игрока
class Player {
    constructor(name, symbol) {
        //Конструктор инициализирует игрока с именем и символом
        this.name = name;
        this.symbol = symbol;
    }
}

//Определяем класс игрового поля
class Board {
    constructor() {
        //Конструктор инициализирует пустую доску 3х3
        this.grid = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    }
    //Метод для отображения доски
    display() {
        console.log('\n');
        this.grid.forEach(row => {
            console.log(` ${row.join(' | ')} `);
            console.log('---|---|---');
        });
        console.log('\n');
    }

    //Ставим символ игрока на доску, если позиция свободна
    placeSymbol(position, symbol) {
        const pos = parseInt(position);
        if (pos < 1 || pos > 9) {
            return false;
        }
        const row = Math.floor((pos - 1) / 3);
        const col = (pos - 1) % 3;
        if (this.grid[row][col] !== 'X' || this.grid[row][col] !== 'O') {
            this.grid[row][col] = symbol;
            return true;
        }else {
            return false; //позиция занята
        }
    }
}
//управляет общим процессом игры
class TicTacToeGame {
    constructor() {
        this.players = [
            new Player(readLineSync.question('enter name for Player 1 (X): ') || 'Player 1', 'X'),
            new Player(readLineSync.question('enter name for Player 2 (O): ') || 'Player 2', 'O')

        ];
        this.board = new Board();
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.turnCount = 0;
    }
    start(){
        console.log('Welcome to Tic-Tac-Toe!');
        while(!this.gameOver){
            this.playTurn();
        }
    }
    //Метод, обрабатывающий ход текущего игрока
    playTurn(){
        const currentPlayer = this.players[this.currentPlayerIndex];
        this.board.display();
        console.log(`${currentPlayer.name}'s turn (${currentPlayer.symbol})`);

        const move = readLineSync.question('Choose a position (1-9): ');
        if (this.board.placeSymbol(move, currentPlayer.symbol)) {
            this.turnCount++;
            if (this.checkWin(currentPlayer.symbol)) {
                this.board.display();
                console.log(`Congratulations ${currentPlayer.name}, you win!`);
                this.gameOver = true;
            }else if (this.turnCount === 9) {
                this.board.display();
                console.log(`It's a draw!`);
                this.gameOver = true;
            }else {
                this.currentPlayerIndex = 1 - this.currentPlayerIndex; //cvtyf buhjrf
            }
        }else {
            console.log('invalid move, try again.');
        }
    }
    //метод проверки победы
    checkWin(symbol){
        const grid = this.board.grid;
        //проверка строк, столюцов и диагоналей
        for (let i = 0; i < 3; i++) {
            if (grid[i][0] === symbol && grid[i][1] === symbol && grid[i][2] === symbol) return true; //строки
            if (grid[0][i] === symbol && grid[1][i] === symbol && grid[2][i] === symbol) return true; //столбцы
        }
        if (grid[0][0] === symbol && grid[1][1] === symbol && grid[2][2] === symbol) return true; //диагональ\
        if (grid[0][2] === symbol && grid[1][1] === symbol && grid[2][0] === symbol) return true; //диагональ/
        return false;
    }
}
//создаём функции для экспорта игры
function runGame() {
    const game = new TicTacToeGame();
    game.start();
}
//экспортируем функцию запуска игры
module.exports = runGame;
