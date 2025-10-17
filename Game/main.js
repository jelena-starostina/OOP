//Импортируем необходимые модули
//import modules

const readLineSync = require('readline-sync');

//Импортируем игровые модули
const runGuessTheNumber = require('./guess-the-number/game');

//Контроллер игрового цикла
//Game loop controller
let keepPlaying = true;

//основной цикл меню. Будет продолжаться, пока игра не захочет выйти
//Main menu loop. Will continue until the player wants to exit
while (keepPlaying) {
    console.clear();
    console.log("============================");
    console.log("=    WELCOME TO THE CAME   =");
    console.log("============================");
    console.log("Which game mode do you want to play?");

    const games = [
        'Guess the Number'
    ];

    //Отображаем боступные игры
    const index = readLineSync.keyInSelect(games, "Choose a game or exit:");

    //в зависимости от выбора игрока запускаем соответствующую игру
    switch (index) {
        case 0:
          runGuessTheNumber();
            break;
            //дальше будет добавляться новые игры
            default:
                console.log("Exiting the game. Goodbye!");
                keepPlaying = false;
                break;
    }
    //После завершения игры спрашиваем, хочет ли игрок сыграть снова
    if (keepPlaying) {
        if (!readLineSync.keyInYN('do you want to game?')) {
            keepPlaying = false;
            console.log("Goodbye!");
        }
    }
}
