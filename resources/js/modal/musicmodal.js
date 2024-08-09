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
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var disc = document.querySelector('.disc');

    modal.style.display = "none";
    disc.style.animationPlayState = 'paused';

    // Lista de canciones
    var canciones = [
        `${base_url}resources/music/coffeeshop.mp3`,
        `${base_url}resources/music/forward.mp3`,
        `${base_url}resources/music/moonlight.mp3`,
        `${base_url}resources/music/ambientacionSong.mp3`
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

    // Controlador general de audio
    const sounds = [doorHotspotSound, ArcadeSound, typingSound, LoginSound, elevatorMusic, soundGlobal, walkHotspotSound, defaultWalking, womenWalking, menWalkin];

    // Función para ajustar el volumen de los sonidos
    function setVolume(volume) {
        // Convertimos el valor de 0-1 para usarlo en el volumen del audio
        sounds.forEach(sound => {
            sound.volume = volume;
        });

        // Ajustar el volumen de todos los elementos <audio> y <video> en la página
        const mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(media => {
            media.volume = volume;
        });
    }

    // Controlador de volumen a través del input
    document.getElementById('volumeControl').addEventListener('input', function() {
        setVolume(this.value);
    });

    // Evento para ajustar el volumen al hacer clic en cualquier parte de la barra
    document.getElementById('volumeControl').addEventListener('click', function(event) {
        const rangeWidth = this.clientWidth;
        const clickX = event.offsetX;
        const newVolume = clickX / rangeWidth;
        this.value = newVolume.toFixed(2);
        setVolume(newVolume);
    });
    // Fin

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
