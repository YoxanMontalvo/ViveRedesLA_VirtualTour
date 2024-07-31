// Variable global para manejar la instancia de Typed.js
var typedInstance = null;
var selectedGender = null;

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
      '<strong>Antes de comenzar, seleccione su género</strong>'
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

// Función para seleccionar el género
function selectGender(gender) {
  // Almacenar el género seleccionado en una variable global
  selectedGender = gender;

  // Mostrar el botón de guardar
  document.getElementById('save-gender-button').style.display = 'block';

  var welcomeText = gender === 'masculino'
    ? '<strong>Caballero</strong>'
    : '<strong>Dama</strong>';

  // Asegúrate de que no haya una instancia previa de Typed.js
  if (typedInstance) {
    typedInstance.destroy();
  }

  // Mostrar el mensaje de bienvenida
  typedInstance = new Typed("#typed", {
    strings: [
      welcomeText
    ],
    typeSpeed: 50,
    showCursor: false,
    startDelay: 500,
  });
}

// Función para guardar el género en el localStorage
function saveGender() {
  if (selectedGender) {
    localStorage.setItem('selectedGender', selectedGender);
    console.log(selectedGender);
    
    document.getElementById('save-gender-button').style.display = 'none';
    document.getElementById('gender-selection').style.display = 'none';
    continueAnimation();
  } else {
    console.error('No se ha seleccionado ningún género.');
  }
}

function continueAnimation() {
  // Asegúrate de que no haya una instancia previa de Typed.js
  if (typedInstance) {
    typedInstance.destroy();
  }

  // Asegúrate de que el elemento #typed esté visible
  document.getElementById('typed').style.display = 'block';

  typedInstance = new Typed("#typed", {
    strings: [
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

// Funciones para mostrar y ocultar la etiqueta de género
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
