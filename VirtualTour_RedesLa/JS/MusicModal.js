var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("closeModal")[0];

// Obtener los elementos de audio y botones
var audio = document.getElementById("musica");
var playPauseBtn = document.getElementById("play-pause");
var volumeControl = document.getElementById("volume");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

// Lista de canciones
var canciones = [
    "../Music/ambientacionSong.mp3",
    "../Music/PianoRelax.mp3",
    "../Music/RelaxSong.mp3",
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
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Manejar el botón de reproducción/pausa
playPauseBtn.onclick = function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Manejar el control de volumen
volumeControl.oninput = function() {
    audio.volume = this.value;
}

// Manejar el botón de siguiente
nextBtn.onclick = function() {
    currentSongIndex = (currentSongIndex + 1) % canciones.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Manejar el botón de anterior
prevBtn.onclick = function() {
    currentSongIndex = (currentSongIndex - 1 + canciones.length) % canciones.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Cargar la primera canción al inicio
loadSong(currentSongIndex);
