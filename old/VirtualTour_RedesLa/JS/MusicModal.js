document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modalMostrar");
    var span = document.getElementsByClassName("closeModal")[0];
    
    if (!modal || !span) {
        console.error("El modal o el botón de cerrar no se encontraron.");
        return;
    }   

    // Obtener los elementos de audio y botones
    var audio = document.getElementById("musica");
    var playPauseBtn = document.getElementById("play-pause");
    var volumeControl = document.getElementById("volume");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var disc = document.querySelector('.disc');

    modal.style.display = "none";
    disc.style.animationPlayState = 'paused';

    // Lista de canciones
    var canciones = [
        "../Music/music/coffee shop.mp3",
        "../Music/music/forward.mp3",
        "../Music/music/moonlight.mp3",
        "../Music/music/ambientacionSong.mp3"
    ];
    var currentSongIndex = 0;

    // Función para cargar una canción
    function loadSong(index) {
        audio.src = canciones[index];
    }

    // Cerrar el modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar el modal cuando el usuario haga clic fuera del modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Manejar el botón de reproducción/pausa
    playPauseBtn.onclick = function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            disc.style.animationPlayState = 'running';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            disc.style.animationPlayState = 'paused';
        }
    }

    // Funcion global para el pausa de la musica, se utiliza en los hotspot de zoom
    window.pausarMusica = function() {
        if (!audio.paused) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            disc.style.animationPlayState = 'paused';
        }
    };

    // Manejar el control de volumen
    volumeControl.oninput = function() {
        audio.volume = this.value;
    }

    // Prevenir la propagación de eventos cuando se arrastra la barra de volumen
    volumeControl.addEventListener('mousedown', function(event) {
        event.stopPropagation();
    });

    // Manejar el botón de siguiente
    nextBtn.onclick = function() {
        currentSongIndex = (currentSongIndex + 1) % canciones.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        disc.style.animationPlayState = 'running';
    }

    // Manejar el botón de anterior
    prevBtn.onclick = function() {
        currentSongIndex = (currentSongIndex - 1 + canciones.length) % canciones.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.innerHTML = '<i class "fas fa-pause"></i>';
        disc.style.animationPlayState = 'running';
    }

    // Cargar la primera canción al inicio
    loadSong(currentSongIndex);
});
