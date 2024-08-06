<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no">
  <title>Menu principal</title>

  <link rel="icon" href="<?= base_url('resources/favicons/inicioIcon.png') ?>" type="image/x-icon">
  <link rel="stylesheet" href="<?= base_url('resources/libs/fontawsome/css/all.min.css') ?>">
  <link rel="stylesheet" href="<?= base_url('resources/css/menu.css') ?>">
  <link rel="stylesheet" href="<?= base_url('resources/libs/sweetalert/sweetAlert.min.css') ?>">
  <link href="https://fonts.googleapis.com/css?family=Julius+Sans+One|Press+Start+2P" rel="stylesheet">
</head>
<body>

  <!-- Contenido principal -->
  <div id="main-content">
    <!-- Boton del comenzar -->
    <div id="start-button" class="btn-arcade">Comenzar recorrido</div>

    <!-- Dialogo typeado -->
    <div id="dialog">
      <div id="typed"></div>
    </div>

    <!-- Imagenes de los avatar -->
    <div id="gender-selection" style="display: none;">
      <div class="avatar male" onmouseover="showGender('masculino')" onmouseout="hideGender()" onclick="selectGender('masculino')">
        <img src="<?= base_url('resources/img/gifs/AvatarMasculino.gif')?>">
        <div class="gender-label" id="masculino-label">Masculino</div>
      </div>
      <div class="avatar female" onmouseover="showGender('femenino')" onmouseout="hideGender()" onclick="selectGender('femenino')">
        <img src="<?= base_url('resources/img/gifs/AvatarFemenino.gif') ?>" alt="Avatar Femenino">
        <div class="gender-label" id="femenino-label">Femenino</div>
      </div>
    </div>
    <!-- Fin -->

    <!-- Botón para guardar el género -->
    <div id="save-gender-button" style="display: none;" class="btn-generoLS" onclick="saveGender()">Guardar Género</div>

    <!-- Fin -->

  </div>
  <!-- Fin -->

  <script src="<?= base_url('resources/libs/typed/typed.min.js') ?>"></script>
  <script src="<?= base_url('resources/js/menu/menu.js') ?>"></script>
  <script src="<?= base_url('resources/js/modal/easterEgg.js') ?>"></script>
  <script src="<?= base_url('resources/libs/sweetalert/sweetAlert.min.js') ?>"></script>
  <script>
    var baseUrl = "<?= base_url() ?>";
  </script>
</body>
</html>