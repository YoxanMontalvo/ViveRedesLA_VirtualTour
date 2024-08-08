<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="<?= base_url('resources/css/games/snake/snake.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div id="title">Snake</div>

    <canvas id="snakeCanvas" width="800" height="400"></canvas>
    
    <div id="tutorial">
        <div class="keybtnGroup">
            <div>
                <div class="keybtn" id="keybtnup">W</div>
            </div>
            <div>
                <div class="keybtn" id="keybtnup">A</div>
                <div class="keybtn" id="keybtnup">S</div>
                <div class="keybtn" id="keybtnup">D</div>
            </div>
        </div>
        <div>or</div>
        <div class="keybtnGroup">
            <div>
                <div class="keybtn" id="keybtnup"><i class="fas fa-arrow-up"></i></div>
            </div>
            <div>
                <div class="keybtn" id="keybtnup"><i class="fas fa-arrow-left"></i></div>
                <div class="keybtn" id="keybtnup"><i class="fas fa-arrow-down"></i></div>
                <div class="keybtn" id="keybtnup"><i class="fas fa-arrow-right"></i></div>
            </div>
        </div>
    </div>
    
    <script>
        var base_url = "<?= base_url() ?>";
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.1/howler.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js"></script>
    <script src="<?= base_url('resources/js/games/snake/snake.js') ?>"></script>
</body>
</html>
