document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const claveGafete = document.getElementById('claveGafete').value.trim();
        const claveCorrecta = '12345';

        // Validar la clave de gafete
        if (claveGafete === claveCorrecta) {
            localStorage.removeItem('currentScene');
            window.location.href = '../HTML/Congreso.html';
        } else {
            $("#login-status").html('<b>La clave de gafete es incorrecta</b>').css('color', '#ff5252')
            $("#claveGafete").focus()
        }
    });
});