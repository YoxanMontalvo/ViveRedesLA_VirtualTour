<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vive RedesLa</title>
    <link rel="icon" href="<?= base_url('resources/favicons/tourVirtualcon.png') ?>" type="image/x-icon">
    <link rel="stylesheet" href="<?= base_url('resources/libs/bootstrap/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/libs/fontawsome/css/all.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/libs/sweetalert/sweetAlert.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/css/congreso.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/css/inicio.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/css/musicamodal.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/css/calendario.css') ?>">
    <link rel="stylesheet" href="<?= base_url('resources/css/fotos.css') ?>" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/6.1.7/index.min.css">
</head>
<body>
    <!-- Contener del visor -->
    <div id="container" style="position: relative; width: 100%; height: 100vh;">
        <!-- Contenedor del título sobre el visor -->
        <div id="scene-title"></div>
        

        <!-- Modal del hotspot de información -->
        <div id="infoModalLeft" class="modal">
            <div class="modal-header">
                <h5 class="modal-title" id="infoModalLeftLabel">Título del Modal</h5>
                <button type="button" class="close" onclick="closeInfoModalLeft()">
                    <span>&times;</span>
                </button>
            </div>
            <div id="modal-content-container" class="modal-body">
                
            </div>
        </div>
        <!-- Fin del Modal -->

         <!-- Modal del reproductor de musica -->
         <div id="modalMostrar" class="modalMusica">
          <!-- Contenido del Modal -->
          <div class="contenModal">
              <span class="closeModal" title="Cerrar ventana emergente">&times;</span>
              <div class="music-content">
                  <div class="disc-container">
                      <img src="../Img/iconos/Disco.png" alt="Disco" class="disc">
                  </div>
                  <div class="controls-container">
                      <h3>Ambientación musical</h3>
                      <div id="music-controls">
                          <button id="prev" class="btn" title="Anterior"><i class="fas fa-backward"></i></button>
                          <button id="play-pause" title="Reproducir / pausar" class="btn"><i class="fas fa-play"></i></button>
                          <button id="next" title="Siguiente" class="btn"><i class="fas fa-forward"></i></button>
                      </div>
                      <input type="range" id="volume" min="0" max="1" step="0.01" value="1">
                      <audio id="musica" loop>
                          <source src="../Music/music/moonlight.mp3" type="audio/mp3">
                          Tu navegador no soporta la reproducción de audio.
                      </audio>
                  </div>
              </div>
          </div>
      </div>
      <!-- Fin -->

      <!-- Calendario del congreso -->
      <div id="calendarioPanel">
      <div class="panel-body">
          <!-- Contenedor para el calendario -->
          <div id="calendar"></div>
          <div id="reminders" style="display: none;">
              <ul id="remindersList">
                  <!-- Los recordatorios se añadirán aquí -->
              </ul>
          </div>
      </div>
      <div class="panel-footer">
          <button id="toggleViewButton">Ver Recordatorios</button>
      </div>
      </div>
      <div id="hoverInfoPanel">
          <p>Calendario del congreso</p>
      </div>
      <div id="botonCalendario" title="Calendario">
          <i class="fas fa-calendar-alt"></i>
      </div>
      <!-- Fin -->

      <!-- Avatar -->
      <div id="avatarImage">
        <img id="avatar-image" src="" alt="Avatar">
      </div>
      <!-- Fin -->
    </div>
      
    <!-- Panel del hotspot de informacion -->
    <div id="panel">
      <h1>Título</h1>
      <p>Descripción</p>
    </div>
    <!-- Fin -->

    <!-- Modal del hotspot de información -->
    <div id="infoModalLeft" class="modal">
      <div class="modal-header">
        <h5 class="modal-title" id="infoModalLeftLabel">Título del Modal</h5>
        <button type="button" class="close" onclick="closeInfoModalLeft()">
          <span>&times;</span>
        </button>
      </div>
      <div id="modal-content-container" class="modal-body"></div>
    </div>

    <!-- Modal de la cabina fotografica -->
    <div class="modal" tabindex="-1" role="dialog" id="cameraModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cabina fotográfica</h5>
            <button id="closeModalCamera" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <section class="cam-container">
              <div class="video-wrap">
                <video class="video"></video>
              </div>
              <div class="canvas-wrap">
                <canvas class="canvas">
                  <img src="" class="photo" alt="photo" />
                </canvas>
              </div>
              <button type="button" class="start-btn btn btn-block" title="Da clíc para tomar una foto">Tomar foto <i class="fa-solid fa-camera"></i></button>
              <button type="button" class="btn btn-block" id="anotherTake" title="Tomar nuevamente la fotografía">Tomar otra foto <i class="fa-solid fa-camera-rotate"></i></button>
              <button type="button" class="btn btn-block" id="savePhoto" title="Guarda esta foto en tu dispositivo">Guardar foto <i class="fa-solid fa-download"></i></button>
            </section>
          </div>
        </div>
      </div>
    </div>



    <!-- <div id="cameraModal" class="modal">
      <div class="modal-header">
        <h5 class="modal-title" id="infoModalLeftLabel">Título del Modal</h5>
        <button type="button" class="close" onclick="closeCameraModalLeft()">
          <span>&times;</span>
        </button>
      </div>
      <div id="modal-content-container" class="modal-body">
        
      </div>
    </div> -->

    <!-- Fin del Modal -->
    <script src="<?= base_url('resources/libs/sweetalert/sweetAlert.min.js') ?>"></script>
    <script src="<?= base_url('resources/libs/jquery/jquery.min.js') ?>"></script>
    <script src="<?= base_url('resources/libs/popper/popper.min.js') ?>"></script>
    <script src="<?= base_url('resources/libs/bootstrap/bootstrap.min.js') ?>"></script>
    <script src="<?= base_url('resources/libs/three/three.min.js') ?>"></script>
    <script src="<?= base_url('resources/libs/panolens/panolens.min.js') ?>"></script>
    <script src="<?= base_url('resources/js/hotspot/congreso.js') ?>"></script>
    <script src="<?= base_url('resources/js/modal/infomodal') ?>"></script>
    <script src="<?= base_url('resources/js/modal/fotos.js') ?>"></script>
    <script src="<?= base_url('resources/js/modal/musicmodal') ?>"></script>
    <script src="<?= base_url('resources/js/calendario/calendario.js') ?>"></script>
    <script src="<?= base_url('resources/js/avatar/avatar.js') ?>"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/6.1.7/index.global.min.js"></script>
  </body>
</html>
