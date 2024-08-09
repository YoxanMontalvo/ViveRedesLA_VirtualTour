<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="<?= base_url('resources/css/games/spaceword/spaceword.css') ?>" />
    <link rel="shortcut icon" href="favicon.png" type="image/png" />
    
  </head>
  <body>
    <div class="planet purple-planet planet-left large">
      <div class="planet-crater-med"></div>
      <div class="planet-crater-small"></div>
      <div class="planet-right-row"></div>
      <div class="planet-left-row"></div>
    </div>
    <div class="planet red-planet planet-right small">
      <div class="planet-crater-med red"></div>
      <div class="planet-crater-small red"></div>
      <div class="planet-right-row red"></div>
      <div class="planet-left-row red"></div>
    </div>
    
    <main>
      <div class="score" id="score"></div>
        <div id="word"></div>
      <div id="bullet" class="bullet"></div>

      <div class="rocket-container" id="rocket-ship">
        <div class="rocket-head"></div>
        <div class="rocket-cabine">
          <div class="rocket-window"></div>
        </div>
        <div class="rocket-body"></div>
        <div class="rocket-left-wing"></div>
        <div class="rocker-left-wing-edge"></div>
        <div class="rocket-right-wing"></div>
        <div class="rocker-right-wing-edge"></div>
        <div class="rocket-engine"></div>
        <div class="wind">
          <div class="rocket-wind-1"></div>
          <div class="rocket-wind-2"></div>
          <div class="rocket-wind-3"></div>
          <div class="rocket-wind-4"></div>
          <div class="rocket-wind-5"></div>
        </div>
      </div>
      
      <dialog id="lose-dialog">
        <p>Has perdido</p>
        <p>
          El universo sufrirá ahora por mala ortografía y errores de typing.
        </p>
        <p id="losing-score"></p>
        <a class="go-home-link" href="<?= base_url('game/spaceword')?>">Ir al inicio</a>
        <button class="restart-btn">Volver a jugar</button>
      </dialog>
      <dialog id="win-dialog">
        <p>¡Has ganado!</p>
        <p>
          El universo está a salvo de errores ortográficos y de typing... Por el
          momento.
        </p>
        <a class="go-home-link" href="<?= base_url('game/spaceword')?>">Ir al inicio</a>
        <button class="restart-btn">Volver a jugar</button>
      </dialog>
    </main>
    <script>
      var base_url = "<?= base_url() ?>";
    </script>
    <script type="module" src="<?= base_url('resources/js/games/spaceword/data.js') ?>"></script>
    <script type="module" src="<?= base_url('resources/js/games/spaceword/utils.js') ?>"></script>
    <script type="module" src="<?= base_url('resources/js/games/spaceword/spaceword.js') ?>"></script>
  </body>
</html>