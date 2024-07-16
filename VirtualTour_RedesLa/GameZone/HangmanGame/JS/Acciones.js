const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const scoreText = document.querySelector(".score");
const timerText = document.querySelector(".timer");

let currentWord, correctLetters, wrongGuessCount, timerInterval;
const maxGuesses = 6;
let score = 0;
let wordsGuessed = 0;
let timeRemaining = 5 * 60;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "Img/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory, timeUp = false) => {
    let modalText, titleText;
    playAgainBtn.style.display = 'block';

    if (timeUp) {
        modalText = `Usted acertó ${wordsGuessed} palabra(s).`;
        titleText = '¡Tiempo Agotado!';
        playAgainBtn.style.display = 'block';
    } else {
        if (isVictory) {
            modalText = `La palabra correcta era: <b>${currentWord}</b>`;
            titleText = '¡Increíble!';
            playAgainBtn.style.display = 'none';
            setTimeout(() => {
                getRandomWord();
                resetGame();
            }, 2000);
        } else {
            modalText = `No pudo adivinar la palabra: <b>${currentWord}</b>`;
            titleText = '¡Ha perdido!';
            playAgainBtn.style.display = 'block';
            score = 0;
            wordsGuessed = 0;
        }
    }
    
    gameModal.querySelector("img").src = `Img/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = titleText;
    gameModal.querySelector("p").innerHTML = modalText;
    gameModal.classList.add("show");

    if (timeUp || !isVictory) {
        clearInterval(timerInterval);
    }

    if (isVictory) {
        score++;
        wordsGuessed++;
        scoreText.innerText = score;
    } else {
        scoreText.innerText = score;
    }
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `Img/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

const startTimer = () => {
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerText.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            gameOver(false, true);
        }
    }, 1000);
}

const resetTimer = () => {
    clearInterval(timerInterval);
    timeRemaining = 5 * 60;
    timerText.innerText = "05:00";
    startTimer();
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", () => {
    getRandomWord();
    resetTimer();
});
startTimer();
