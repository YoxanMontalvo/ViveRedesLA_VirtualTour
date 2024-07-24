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
            Swal.fire({
                icon: 'error',
                title: '¡Clave de gafete no encontrada!',
                text: 'La clave de gafete no existe. Por favor contacte a sistemas',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});