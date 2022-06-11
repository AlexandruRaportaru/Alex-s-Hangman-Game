//========================= Selectors ========================//
const keyboard = document.querySelector(".keyboard");
const maxWrong = document.querySelector(".max-mistakes");
const wordToBeGuest = document.querySelector(".word-to-be-guest");
const mistakesCount = document.querySelector(".mistakes");
const hangmanImg = document.querySelector(".hangman-img");
const textStatus = document.querySelector(".text-status")

let answer = "";
let mistakes = 0;
let maxMistakes = 6;
let guessed = [];
wordStatus = null;


//======================= Functions ==========================//

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length )];
}

function createButtons() {
    let gameButtons = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => 
        `<button class="btn btn-lg btn-dark m-2" id='${letter}' onClick="handleGuess('${letter}')">${letter}</button>`
    ).join("");
    keyboard.innerHTML = gameButtons; 
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) :  null;
    document.querySelector(`#${chosenLetter}`).setAttribute("disabled", true);

    if(answer.indexOf(chosenLetter) >= 0) {
        wordGuessed();
        checkIfGameWon();
    } else if(answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangman();
    }
}

function updateHangman() {
    hangmanImg.src = `./Images/${mistakes}.png`
}

function checkIfGameWon() {
    if(wordStatus === answer) {
        keyboard.innerHTML = "<span style='font-size: 40px; color: green'>You won!</span>";
    }
}

function checkIfGameLost() {
    if(mistakes === maxMistakes) {
        textStatus.innerHTML = `The answer was:  ${answer}`
        keyboard.innerHTML = "<span style='font-size: 40px; color: red'>You lost!</span>";
        wordToBeGuest.innerHTML = "";
    }
}

function updateMistakes() {
    mistakesCount.innerHTML = mistakes;
}

function wordGuessed() {
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter: " _ ")).join("");
    wordToBeGuest.innerHTML = wordStatus;
}

function reset() {
    mistakes = 0;
    guessed = [];
    hangmanImg.src = "./Images/0.png"

    randomWord();
    wordGuessed();
    updateMistakes();
    createButtons();
    textStatus.innerHTML = "Please fill up your answer with a programming word:  ";
}

maxWrong.innerHTML = maxMistakes;

randomWord();
createButtons();
wordGuessed();