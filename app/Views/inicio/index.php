<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vive RedesLa</title>
    <link rel="icon" href="../Documents/Icons/tourVirtualcon.png" type="image/x-icon">
    <link rel="stylesheet" href="../Lib/CSS/bootstrap.min.css">
    <link rel="stylesheet" href="../Lib/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="../Lib/CSS/sweetAlert.min.css">
    <link rel="stylesheet" href="../CSS/Estilos.css">
    <link rel="stylesheet" href="../CSS/MusicModal.css">
    <link rel="stylesheet" href="../CSS/Calendario.css">
    <link rel="stylesheet" href="../CSS/gameBoy.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/6.1.7/index.min.css">
    <link href="https://fonts.googleapis.com/css?family=Julius+Sans+One|Press+Start+2P" rel="stylesheet">
</head>
<body>
    <!-- Contener del visor -->
    <div id="container" style="position: relative; width: 100%; height: 100vh;">
        <!-- Contenedor del título sobre el visor -->
        <div id="scene-title"></div>
        
        <!-- Modal de inicio de sesion-->
        <div id="loginModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">Comprobación de acceso</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Cerrar ventana emergente">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <label for="claveGafete">Ingrese su clave de gafete <span class="text-danger" title="Campo obligatorio">*</span></label>
                                <input type="text" class="form-control" id="claveGafete" name="claveGafete" required>
                                <span id="login-status"></span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-block" id="btnLogin">Iniciar sesión</button>
                            </div>

                            <div class="form-group">
                                <a href="#">¿Donde encuentro mi clave de gafete?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal -->

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

        <!-- Modal del arcade -->
        <div id="modalArcade" class="modalArcade">
            <div class="arcade-container">

                <!-- Diseño de la consola -->
                <div id="game-and-watch">
                    <div id="game-and-watch-case">
                    <div id="game-and-watch-case-in">
                    <div id="game-and-watch-left">
                    <div id="game-and-watch-badge">
                        <div id="gameSpace"><h1 class="classh1">Game</h1>
                            <h1 class="classh1">&</h1>
                            <h1 class="classh1">Watch</h1>
                        </div>
                    </div>
                    <div id="game-and-watch-leftbutton">
                    <div id="game-and-watch-leftbutton-horizontal"></div>
                    <div id="game-and-watch-leftbutton-vertical">
                    <div id="game-and-watch-leftbutton-top">
                    <a class="aclass" href="#topbut"></a>
                    </div>
                    <div id="game-and-watch-leftbutton-cover"></div>
                    <div id="game-and-watch-leftbutton-bottom">
                    <a href="#botbut"></a>
                    </div>
                    <div id="game-and-watch-leftbutton-left">
                    <a href="#leftbut"></a>
                    </div>
                    <div id="game-and-watch-leftbutton-right">
                    <a href="#rightbut"></a>
                    </div>
                    </div>
                    </div>
                    <div class="espacioButon">
                    <i class="fa fa-arrow-circle-left iclass" aria-hidden="true"></i>
                    <i class="fa fa-arrow-circle-right iclass" aria-hidden="true"></i>
                    <i class="fa fa-arrow-circle-down iclass" aria-hidden="true"></i>
                    <i class="fa fa-arrow-circle-up iclass" aria-hidden="true"></i>

                    <br>
                    <h4 class="espacioControl">Control</h4>
                    </div>
                    
                    <p class="vertical-text">Nintendo</p>
                    </div>
                
                    <div id="game-and-watch-screen">
                    <div id="game-and-watch-screen-top"></div>
                
                    <div id="game-and-watch-screen-in">
                    <h4 id="modal-title" class="arcade-title"></h4>
                    
                
                    <!-- Pantalla donde se muestran los juegos -->
                        <div id="game-and-watch-game">
                            <div id="game-container" class="arcade-screen">
                                <!-- Aquí se cargarán los juegos -->
                                
                            </div>
                        </div>
                    <!-- Fin -->
                    </div>
                    </div>
                    <div id="game-and-watch-right">
                    <div id="game-and-watch-game-start">
                    <div id="game-and-watch-start-one"><div class="game-and-watch-start-inner"><a href="#game-a"></a></div></div><h2 class="classh2">Start</h2><br>
                    <div id="game-and-watch-start-two"><div class="game-and-watch-start-inner"><a href="#game-b"></a></div></div><div id="game-and-watch-gameb-text"><h2 class="classh2">Pause</h2><br></a></div><div id="game-and-watch-start-three"><div class="game-and-watch-start-inner"><a href="#timebut"></a></div></div><div id="game-and-watch-time-text"><h2 class="classh2">Reset</h2></div></div>

                    <div id="game-and-watch-rightbutton"><div id="game-and-watch-rightbutton-in"><a onclick="closeModal()"></a></div><div id="game-and-watch-rightbutton-text"><h1 class="classh1">Close</h1></div></div><div id="gameboy-rightbutton-in"><a href="#gameboybut"></a></div></div>
                    <div id="game-and-watch-gameboy-speaker"><ul class="ulclass"><li class="liclass"></li><li class="liclass"></li><li class="liclass"></li><li class="liclass"></li><li class="liclass"></li><li class="liclass"></li></ul></div>
                    <div id="game-and-watch-left-gloss"></div>
                    <div id="game-and-watch-right-gloss"></div>
                    </div>
                    </div>
                </div>
                <!-- Fin -->

            </div>
        </div>
        <!-- Fin -->
    </div>
    <!-- Fin -->

    <!-- Panel del hotspot de informacion -->
    <div id="panel">
        <h1>Título</h1>
        <p>Descripción</p>
    </div>
    <!-- Fin -->

    <script src="../Lib/sweetAlert.min.js"></script>
    <script src="../Lib/jquery.min.js"></script>
    <script src="../Lib/popper.min.js"></script>
    <script src="../Lib/bootstrap.min.js"></script>
    <script src="../Lib/three.min.js"></script>
    <script src="../Lib/panolens.min.js"></script>
    <script src="../JS/Hotspot.js"></script>
    <script src="../JS/Login.js"></script>
    <script src="../JS/MusicModal.js"></script>
    <script src="../JS/Calendario.js"></script>
    <script src="../JS/Avatar.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/6.1.7/index.global.min.js"></script>
</body>
</html>
