// function.js
function openModal(game) {
    document.getElementById('modal').style.display = 'flex';
    setModalTitle(game);
    loadGame(game);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('game-container').innerHTML = '';
}

function loadGame(game) {
    let gameContainer = document.getElementById('game-container');
    switch (game) {
        case 'SpaceWord':
            gameContainer.innerHTML = '<iframe src="./SpaceWord/HTML/Index.html" width="100%" height="100%"></iframe>';
            break;
        case 'Memorama':
            gameContainer.innerHTML = '<iframe src="./Memoram" width="100%" height="100%"></iframe>';
            break;
        case 'HangMan':
            gameContainer.innerHTML = '<iframe src="./HangmanGame/Index.html" width="100%" height="100%"></iframe>';
            break;
        case 'Snake':
            gameContainer.innerHTML = '<iframe src="./Snake/HTML/Index.html" width="100%" height="100%"></iframe>';
            break;
        default:
            gameContainer.innerHTML = 'Juego no encontrado';
    }
}

function setModalTitle(game) {
    let titleElement = document.getElementById('modal-title');
    switch (game) {
        case 'SpaceWord':
            titleElement.textContent = 'SPACEWORD';
            break;
        case 'Memorama':
            titleElement.textContent = 'MEMORAMA';
            break;
        case 'HangMan':
            titleElement.textContent = 'HangMan';
            break;
        case 'Snake':
            titleElement.textContent = 'SNAKE';
            break;
        default:
            titleElement.textContent = 'Juego no encontrado';
    }
}

