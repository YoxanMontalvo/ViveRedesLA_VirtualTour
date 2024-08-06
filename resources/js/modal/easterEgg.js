 // Secuencia del código Konami
 const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
 let konamiCodePosition = 0;

 // Listener para las teclas presionadas
 document.addEventListener('keydown', function(event) {
     // Verifica la tecla presionada con la secuencia del código Konami
     if (event.key === konamiCode[konamiCodePosition]) {
         konamiCodePosition++;
         // Si se completa el código, se muestra la alerta con el iframe
         if (konamiCodePosition === konamiCode.length) {
             konamiCodePosition = 0; // Reinicia la posición para permitir múltiples activaciones
             Swal.fire({
                 title: '¡Código Konami activado!',
                 html: '<iframe id="content-frame" src="index.html" frameborder="0"></iframe>',
                 width: 800,
                 height: 600,
                 padding: '3em',
                 showConfirmButton: true
             });
         }
     } else {
         konamiCodePosition = 0; // Reinicia si la secuencia es incorrecta
     }
 });