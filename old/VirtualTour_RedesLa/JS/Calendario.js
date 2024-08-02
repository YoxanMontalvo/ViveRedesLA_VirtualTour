document.addEventListener('DOMContentLoaded', function() {
    const floatingButton = document.getElementById('botonCalendario');
    const expandedPanel = document.getElementById('calendarioPanel');
    const messagePanel = document.getElementById('hoverInfoPanel');
    const toggleViewButton = document.getElementById('toggleViewButton');
    const calendarEl = document.getElementById('calendar');
    const remindersEl = document.getElementById('reminders');
    const remindersList = document.getElementById('remindersList');

    // Inicializar FullCalendar
    // Inicializar FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Puedes añadir eventos aquí
            {
                title: 'Reunion del congreso',
                start: '2024-07-30'
            },
            {
                title: 'Visitar el arcade',
                start: '2024-07-22'
            },
            {
                title: 'Reunion en Relayn',
                start: '2024-07-25'
            }
        ]
    });

    // Renderizar el calendario
    calendar.render();

    // Inicialmente mostrar los recordatorios y ocultar el calendario
    calendarEl.style.display = 'none';
    remindersEl.style.display = 'block';

    toggleViewButton.addEventListener('click', function() {
        if (calendarEl.style.display === 'none') {
            calendarEl.style.display = 'block';
            remindersEl.style.display = 'none';
            toggleViewButton.textContent = 'Ver Recordatorios';
        } else {
            calendarEl.style.display = 'none';
            remindersEl.style.display = 'block';
            toggleViewButton.textContent = 'Ver Calendario';
        }
    });

    // Función para agregar recordatorios
    function addReminder(title, startDate) {
        const li = document.createElement('li');
        li.textContent = `${title} - Fecha: ${startDate}`;
        remindersList.appendChild(li);
    }

    // Función para actualizar la lista de recordatorios
    function updateReminders() {
        remindersList.innerHTML = '';
        const events = calendar.getEvents();
        events.forEach(event => {
            addReminder(event.title, event.startStr);
        });
    }

    // Actualizar los recordatorios al cargar la página
    updateReminders();


    // Mostrar el panel desplegable y cambiar el estado del botón al hacer clic
    floatingButton.addEventListener('click', function() {
        expandedPanel.classList.toggle('active');
        floatingButton.classList.toggle('active');
        messagePanel.classList.toggle('active');
        window.panelGlobalSound();
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
});
