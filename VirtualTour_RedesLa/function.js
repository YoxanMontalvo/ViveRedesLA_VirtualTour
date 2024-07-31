// Variable global para manejar la instancia de Typed.js
var typedInstance = null;

document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('start-button').style.display = 'none';
  document.getElementById('typed').style.display = 'block';
  startAnimation();
});

function startAnimation() {
  // Asegúrate de que no haya una instancia previa de Typed.js
  if (typedInstance) {
    typedInstance.destroy();
  }

  typedInstance = new Typed("#typed", {
    strings: [
      '<strong>¡Bienvenido!</strong>',
      '<strong>Antes de comenzar, seleccione su genero</strong>'
    ],
    typeSpeed: 50,
    showCursor: false,
    startDelay: 500,
    onComplete: function() {
      setTimeout(function() {
        document.getElementById('typed').style.display = 'none';
        document.getElementById('gender-selection').style.display = 'flex';
      }, 1000);
    }
  });
}

function selectGender(gender) {
  // Guardar el sexo seleccionado en localStorage
  localStorage.setItem('selectedGender', gender);
  console.log(gender)

  var welcomeText = gender === 'male'
    ? '<strong>Caballero</strong>'
    : '<strong>Dama</strong>';
    
  document.getElementById('gender-selection').style.display = 'none';
  document.getElementById('typed').style.display = 'block';

  // Asegúrate de que no haya una instancia previa de Typed.js
  if (typedInstance) {
    typedInstance.destroy();
  }

  typedInstance = new Typed("#typed", {
    strings: [
      welcomeText,
      '<strong>Vive REDESLA presenta</strong>',
      'Un recorrido virtual por nuestras instalaciones',
      '¿Estás listo?',
      '¡Disfruta de tu experiencia inmersiva!'
    ],
    typeSpeed: 50,
    showCursor: false,
    startDelay: 500,
    onComplete: function() {
      setTimeout(function() {
        document.body.style.opacity = 0;
        setTimeout(function() {
          window.location.href = './HTML/MenuPrincipal.html';
        }, 400);
      }, 1800);
    }
  });
}

function showGender(gender) {
  var label = document.getElementById(gender + '-label');
  if (label) {
    label.style.display = 'block';
  }
}

function hideGender() {
  document.querySelectorAll('.gender-label').forEach(function(label) {
    label.style.display = 'none';
  });
}
