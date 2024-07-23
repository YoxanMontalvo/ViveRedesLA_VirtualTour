document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Borrar el localStorage antes de cambiar la escena
        localStorage.removeItem('currentScene');

        // Redirigir a la página del congreso
        window.location.href = '../HTML/Congreso.html';
    });
});
