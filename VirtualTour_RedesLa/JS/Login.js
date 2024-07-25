document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Enfocar el campo de entrada cuando el modal se muestra
    $('#loginModal').on('shown.bs.modal', function () {
        $('#claveGafete').trigger('focus');
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const claveGafete = document.getElementById('claveGafete').value.trim();
        const claveCorrecta = '12345';

        // Validar la clave de gafete
        if (claveGafete === claveCorrecta) {
            localStorage.removeItem('currentScene');
            window.location.href = '../HTML/Congreso.html';
        } else {
            $("#login-status").html('<b>La clave de gafete es incorrecta</b>').css('color', '#ff5252');
            $("#claveGafete").trigger('focus');
        }
    });
});