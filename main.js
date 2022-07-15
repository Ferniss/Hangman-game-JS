const input = require('sync-input');
let gameState = true;
let winCount = 0;
let loseCount = 0;
let attempts = 8;

console.log(`H A N G M A N`);
while (gameState) {
    let inputMainMenu = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: ');
    console.log();
    if (inputMainMenu === "play") {
        let wordList = ["python", "java", "swift", "javascript"];
        let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        let randomWordArray = randomWord.split("");
        for (let index = 0; index < randomWordArray.length; index++) {
            randomWordArray[index] = "-";
        }


        function hiddenRandomWord() {
            return randomWordArray.join("");
        }


        let guessedWords = [];

        while (attempts > 0) {
            console.log(hiddenRandomWord());
            let userInput = input("Input a letter: ");

            if (userInput.length !== 1) {
                console.log("Please, input a single letter.\n");
                continue;
            }
            if (userInput.search(/^[a-z]+$/) !== 0) {
                console.log("Please, enter a lowercase letter from the English alphabet.\n");
                continue;
            }

            let matchFind = 0;
            for (let index = 0; index < randomWord.length; index++) {
                if (guessedWords.includes(userInput)) {
                    matchFind++;
                    console.log("You've already guessed this letter.");
                    break;
                } else if (randomWord[index] === userInput) {
                    randomWordArray[index] = userInput;
                    matchFind++;
                }
            }
            if (matchFind === 0) {
                attempts--;
                console.log(`That letter doesn't appear in the word.  # ${attempts} attempts`);
            }
            console.log();
            guessedWords.push(userInput);

            if (hiddenRandomWord().includes("-") === false) {
                console.log(`You guessed the word ${randomWord}!`);
                console.log("You survived!\n");
                winCount++;
                break;
            } else if (hiddenRandomWord().includes("-") && attempts === 0) {
                console.log("You lost!\n");
                loseCount++;
            }
        }
    } else if (inputMainMenu === "results") {
        console.log(`You won: ${winCount} times`);
        console.log(`You lost: ${loseCount} times\n`);
    } else if (inputMainMenu === "exit") {
        gameState = false;
    }
}
