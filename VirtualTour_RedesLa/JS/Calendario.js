const floatingButton = document.getElementById('botonCalendario');
const expandedPanel = document.getElementById('calendarioPanel');
const closeButton = document.getElementById('closePanelC');
const messagePanel = document.getElementById('hoverInfoPanel');

// Mostrar el panel desplegable y cambiar el estado del botón al hacer clic
floatingButton.addEventListener('click', function() {
    expandedPanel.classList.toggle('active');
    floatingButton.classList.toggle('active');
    messagePanel.classList.toggle('active');
});

// Cerrar el panel desplegable y restaurar el estado del botón al hacer clic en el botón de cierre
closeButton.addEventListener('click', function() {
    expandedPanel.classList.remove('active');
    floatingButton.classList.remove('active');
    messagePanel.style.display = 'none';
});

// Mostrar el panel de mensaje al pasar el cursor sobre el botón
floatingButton.addEventListener('mouseover', function() {
    messagePanel.style.opacity = '1';
    messagePanel.style.transform = 'translateX(0)';
    messagePanel.style.display = 'block';
});

// Ocultar el panel de mensaje al retirar el cursor del botón
floatingButton.addEventListener('mouseout', function() {
    if (!expandedPanel.classList.contains('active')) {
        messagePanel.style.opacity = '0';
        messagePanel.style.transform = 'translateX(50px)';
    }
});

// Inicializar Pikaday
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FullCalendar
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Vista inicial del calendario
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Puedes añadir eventos aquí
            {
                title: 'Evento Ejemplo',
                start: '2024-08-01',
                end: '2024-08-02'
            }
        ]
    });

    calendar.render();
});
