document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('start-button').style.display = 'none'; // Ocultar el botón
  document.getElementById('typed').style.display = 'block'; // Mostrar el contenedor de texto
  startAnimation();
});

function startAnimation() {
var typed = new Typed("#typed", {
    strings: ['<strong>¡Bienvenido!</strong>', '<strong>Vive REDESLA presenta</strong>','Un recorrido virtual por nuestras instalaciones', '¿Estas listo?', '¡Disfruta de tu experiencia inmersiva!'],
    typeSpeed: 50,
    showCursor: false,
    startDelay: 500,
    onComplete: function() {
      setTimeout(function() {
        document.body.style.opacity = 0;
        setTimeout(function() {
          window.location.href = './HTML/MenuPrincipal.html';
        }, 400); // Esperar 500 milisegundos antes de redirigir
      }, 1800); // Esperar 2 segundos antes de iniciar el efecto de fundido
    }
});
}
