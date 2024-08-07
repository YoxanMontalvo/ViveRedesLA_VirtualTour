<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="<?= base_url('resources/css/games/spaceword/home.css') ?>"/>
    <link rel="stylesheet" href="<?= base_url('resources/css/games/spaceword/spaceword.css') ?>" />
    <link rel="shortcut icon" href="favicon.png" type="image/png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Primary Meta Tags -->
    <title>SpaceWord</title>
    <meta name="title" content="SpaceWord" />

  </head>
  <body>
    <div class="main-home-container">
      <div id="purple-planet" class="planet purple-planet planet-left large">
        <div class="planet-crater-med"></div>
        <div class="planet-crater-small"></div>
        <div class="planet-right-row"></div>
        <div class="planet-left-row"></div>
      </div>
      <div id="red-planet" class="planet red-planet planet-right small">
        <div class="planet-crater-med red"></div>
        <div class="planet-crater-small red"></div>
        <div class="planet-right-row red"></div>
        <div class="planet-left-row red"></div>
      </div>

      <main>
        <div class="card-title">
          <h1>SpaceWord</h1>
        </div>

        <div class="main-card-container">
          <a href="<?= base_url('game/spacewordjugar') ?>">Empezar Partida</a>
          <button id="instructions-btn">Indicaciones del juego</button>
          <button id="open-settings-btn">Configuración</button>
        </div>
      </main>

      <footer>
        VIVE REDESLA
      </footer>
    </div>
    <!-- Instructions dialog -->
    <dialog id="instructions-modal">
      <section >
        <h1>¿Que debo hacer?</h1>
        <div class="modal-card">
          <p class="textoCorrecto">
            Tienes como misión el defender al planeta de una lluvia espacial de palabras, las cuales son destruidas al teclearlas. 
            Destrúyelas a todas y demuestra que eres un genio, pero si pierdes, las faltas de ortografía se apoderaran del mundo
          </p>

          <h4>¡¡¡Demuestra de que estas hecho!!!</h4>
        </div>
        <button id="close-instructions-modal-btn">Entendido</button>
      </section>
    </dialog>

    <!-- Settings dialog -->
    <dialog id="settings-modal">
      <section>
        <h1>Ajustes generales</h1>
        <form class="modal-form" id="settings-form">
          <div class="modal-form-row">
            <label for="enable-accents">¿Quiere jugar con los acentos activos?</label>
            <div class="icon-switch-container">
              <input type="checkbox" class="icon-switch" name="enable-accents" id="enable-accents-checkbox" />
              <label for="enable-accents-checkbox" class="icon-switch-label">
                <i class="fas fa-crown yes-icon"></i>
                <i class="fas fa-ban no-icon"></i>
              </label>
            </div>
          </div>
        </form>
        <hr />
        <button id="close-settings-modal-btn">Guardar la configuración</button>
      </section>
    </dialog>

    <script>
      var base_url = "<?= base_url() ?>";
    </script>
    <script
      defer
      data-domain="programacion-es.dev/orbita"
      src="<?= base_url('resources/libs/plausible/plausible.js')?>"
    ></script>
    <script type="module" src="<?= base_url('resources/js/games/spaceword/modal.js') ?>"></script>
  </body>
</html>
