<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangman Game</title>
    <link rel="stylesheet" href="<?= base_url('resources/css/games/hangman/hangman.css') ?>">
</head>

<body>
    <div class="game-modal">
        <div class="content">
            <img src="#" alt="gif">
            <h4>Fin del juego!</h4>
            <p>La palabra correcta era: <b>rainbow</b></p>
            <button class="play-again">Jugar de nuevo</button>
        </div>
    </div>
    <div class="container">
        <div class="hangman-box">
            <img src="#" draggable="false" alt="hangman-img">
            <h1>Hangman Game</h1>
        </div>
        <div class="game-box">
            <div class="timer-score">
                <div class="card timer-card">
                    <h4>Tiempo: <span class="timer">05:00</span></h4>
                </div>
                <div class="card score-card">
                    <h4>Puntuación: <span class="score">0</span></h4>
                </div>
            </div>
            <ul class="word-display"></ul>
            <h4 class="hint-text">Descripción: <b></b></h4>
            <h4 class="guesses-text">Intentos restantes: <strong><b></b></strong></h4>
            <div class="keyboard"></div>
        </div>
    </div>

    <script>
      var base_url = "<?= base_url() ?>";
    </script>
    <script src="<?= base_url('resources/js/games/hangman/preguntashangman.js') ?>" defer></script>
    <script src="<?= base_url('resources/js/games/hangman/hangman.js') ?>" defer></script>
</body>
</html>