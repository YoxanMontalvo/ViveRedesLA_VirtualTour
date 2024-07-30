//////////////////////// Todas las funciones fuera de los hotspot //////////////
// Reproducir el sonido al abrir el modal
const InfoHotSound = new Audio('../Music/SoundInfoView.mp3');
function playSoundInfo() {
    InfoHotSound.play();
}
// Fin

// Reproducir el sonido al cambiar de escena
const SceneHotSound = new Audio('../Music/SoundChangeScene.mp3');
function playSoundSceneChange() {
    SceneHotSound.play();
}
// Fin

// Musica del elevador
const elevatorMusic = new Audio('../Music/RelaxSong.mp3');
function musicElevator(sceneURL) {
    const scenesWithElevatorMusic = [
        '../Img/Congresos/Elevador.jpg',
    ];

    if (scenesWithElevatorMusic.includes(sceneURL)) {
        elevatorMusic.play();
    } else {
        elevatorMusic.pause();
    }
}
// Fin

// Función para actualizar el título de la escena
function updateSceneTitle(title) {
    const titleElement = document.getElementById('scene-title');
    if (titleElement) {
        titleElement.textContent = title;
    }
}
// Fin

// Función para guardar la escena y el título actual en localStorage
function saveCurrentScene(sceneURL, sceneTitle) {
    localStorage.setItem('currentScene', sceneURL);
    localStorage.setItem('currentSceneTitle', sceneTitle);
}
// Fin

// Función para cargar la escena y el título actual desde localStorage
function loadCurrentScene() {
    const currentScene = localStorage.getItem('currentScene');
    const currentSceneTitle = localStorage.getItem('currentSceneTitle');
    return {
        sceneURL: currentScene ? currentScene : '../Img/Congresos/Lobby.jpg',
        sceneTitle: currentSceneTitle ? currentSceneTitle : 'Lobby'
    };
}
// Fin

// Función para limpiar hotspots actuales
function clearCurrentHotspots() {
    if (panorama && panorama.children) {
        const hotspotsToRemove = panorama.children.filter(child => child instanceof PANOLENS.Infospot);
        hotspotsToRemove.forEach(hotspot => panorama.remove(hotspot));
    }
}
// Fin

// Función para animar el hotspot
function animateHotspot(hotspot, amplitude = 20, frequency = 1, duration = 3000, delay = 6000) {
    const originalPosition = hotspot.position.clone();
    let isJumping = false;
    const jumpHeight = amplitude;

    function startJump() {
        if (isJumping) return;
        isJumping = true;
        const startTime = Date.now();

        function jump() {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration) {
                hotspot.position.copy(originalPosition); // Regresa a la posición original
                isJumping = false;
                return;
            }

            const progress = (elapsed % 1000) / 1000;
            const height = jumpHeight * Math.sin(progress * Math.PI * 2); // Movimiento de salto
            hotspot.position.set(
                originalPosition.x,
                originalPosition.y + height,
                originalPosition.z
            );
            requestAnimationFrame(jump);
        }
        jump();
    }
    // Configura el intervalo para repetir el salto cada 10 segundos
    setInterval(startJump, delay);
    // Inicia la animación inmediatamente para el primer ciclo
    startJump();
}
// Fin
//////////////////////// Fin //////////////


/* ============================================================================= */


/* PUERTAS */
function createDoorHotspots(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.DoorIcon);
    sceneHotspot.position.set(position.x, position.y, position.z);
    animateHotspot(sceneHotspot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        sceneHotspot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 65;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    sceneHotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    sceneHotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Cambiar de escena al hacer clic en el hotspot
    sceneHotspot.addEventListener('click', () => {
        playDoorSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            updateInitialHotspots(newPanorama, sceneURL)
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL, title); // Guardar la escena actual
        });

        newPanorama.addEventListener('error', (event) => {
            console.error('Error al cargar la nueva imagen panorámica:', event);
        });
        newPanorama.load(sceneURL);
        viewer.add(newPanorama);
        viewer.tweenControlCenter(new THREE.Vector3(3000, 0, 0), 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return sceneHotspot;
}

function setDoorHotspots(sceneURL) {
    let sceneHotspots = [];

    // Pagina principal
    if (sceneURL === '../Img/Congresos/Lobby.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 4993.16, y: -140.51, z: -25.19 }, sceneURL: '../Img/Congresos/Elevador.jpg', text: 'Entrar al elevador', title: 'Elevador' },
            { position: { x: 2200, y: -300, z: -4000 }, sceneURL: '../Img/Congresos/mezzanine.jpg', text: 'Entrar a Mezzanine', title: 'Sala de Mezzanine' },
            { position: { x: 3000, y: -400, z: 5000 }, sceneURL: '../Img/Congresos/IQuatro.jpg', text: 'Entrar a Zona iQuatro', title: 'Zona iQuatro' },
        ];
    }else if (sceneURL === '../Img/Congresos/Elevador.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 6000, y: 400, z: -4700 }, sceneURL: '../Img/Congresos/Lobby.jpg', text: 'Lobby', title: 'Congreso' },
            { position: { x: 6000, y: -500, z: -4700 }, sceneURL: '../Img/Congresos/PasilloSalones.jpg', text: 'Pasillo salones', title: 'Pasillo de los salones' },
            { position: { x: 6000, y: -1400, z: -4700 }, sceneURL: '../Img/Congresos/AuditorioCongreso.jpg', text: 'Auditorio', title: 'Auditorio' },
        ];
    }else if (sceneURL === '../Img/Congresos/mezzanine.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 8000, y: -200, z: -4000 }, sceneURL: '../Img/Congresos/Lago.jpg', text: 'Ir al Lago REDESLA', title: 'Lago' },
            { position: { x: -4934.34, y: -588.57, z: -515.44 }, sceneURL: '../Img/Congresos/Lobby.jpg', text: 'Volver al lobby del congreso', title: 'Congreso' },
        ];
    }else if (sceneURL === '../Img/Congresos/Lago.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: -8000, y: -200, z: -4000 }, sceneURL: '../Img/Congresos/mezzanine.jpg', text: 'Volver al Mezzanine', title: 'Sala de Mezzanine' },
        ];
    }else if (sceneURL === '../Img/Congresos/PasilloSalones.jpg') {
        sceneHotspots = [
            { position: { x: -9000, y: -200, z: 100 }, sceneURL: '../Img/Congresos/Elevador.jpg', text: 'Volver al elevador', title: 'Elevador' },
            { position: { x: 24.68, y: -1087.24, z: -4876.47 }, sceneURL: '../Img/Congresos/Salones.jpg', text: 'Ingresar al salon 3', title: 'Salon 3' },
        ];
    }else if (sceneURL === '../Img/Congresos/Salones.jpg') {
        sceneHotspots = [
            { position: { x: -4934.28, y: -506.02, z: 580.35 }, sceneURL: '../Img/Congresos/PasilloSalones.jpg', text: 'Volver al pasillo de salones', title: 'Pasillo de los salones' },
        ];
    }else if (sceneURL === '../Img/Congresos/AuditorioCongreso.jpg') {
        sceneHotspots = [
            { position: { x: -4971.55, y: -273.11, z: 338.14 }, sceneURL: '../Img/Congresos/Elevador.jpg', text: 'Volver al elevador', title: 'Elevador' },
        ];
    }else if (sceneURL === '../Img/Congresos/IQuatro.jpg') {
        sceneHotspots = [
            { position: { x: -2918.37, y: -325.06, z: -4043.23 }, sceneURL: '../Img/Congresos/Lobby.jpg', text: 'Volver al lobby del congreso', title: 'Lobby congreso' },
        ];
    }

    return sceneHotspots.map(hotspot => createDoorHotspots(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

const doorHotspotSound = new Audio('../Music/sonidos/door.mp3');
function playDoorSoundSceneChange() {
    doorHotspotSound.play();
}
/* FIN */


/* ESCALERAS */
function setEscalerasHotspots(sceneURL) {
    let walkHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === '../Img/Congresos/mezzanine.jpg') {// Pagina principal con sus hotspot
        walkHotspots = [
            { position: { x: 8000, y: 1500, z: -4000 }, sceneURL: '../Img/Congresos/Escalerascabina.jpg', text: 'Subir escaleras', title: 'Cabina fotografica' },
        ];
    }else if (sceneURL === '../Img/Congresos/Escalerascabina.jpg') {
        walkHotspots = [
            { position: { x: -934.97, y: -2788.14, z: 4035.68 }, sceneURL: '../Img/Congresos/mezzanine.jpg', text: 'Bajar escaleras', title: 'Sala de Mezzanine' },
        ];
    }

    return walkHotspots.map(hotspot => createEscalerasHotspots(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createEscalerasHotspots(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.EscalerasIcon);
    sceneHotspot.position.set(position.x, position.y, position.z);
    animateHotspot(sceneHotspot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        sceneHotspot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 65;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    sceneHotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    sceneHotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Cambiar de escena al hacer clic en el hotspot
    sceneHotspot.addEventListener('click', () => {
        playWalkSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            // Importante: Si se crea una nueva variante de un algun hotspot, siempre agregarlo tambien aqui asi como los demas, ya que cuando se cambie de escena y se regrese no aparecera
            /* const newLoginHotspot = createLoginHotspotsForScene(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot)); */
            updateInitialHotspots(newPanorama, sceneURL)
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL, title); // Guardar la escena actual
        });

        newPanorama.addEventListener('error', (event) => {
            console.error('Error al cargar la nueva imagen panorámica:', event);
        });
        newPanorama.load(sceneURL);
        viewer.add(newPanorama);
        viewer.tweenControlCenter(new THREE.Vector3(3000, 0, 0), 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return sceneHotspot;
}
/* FIN */


/* LOGOUT */
function setLogoutHotspots(sceneURL) {
    let pageHotspots = [];

    if(sceneURL === '../Img/Congresos/Lobby.jpg') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: -4951.47, y: -667.63, z: 10.11 }, pageURL: '../HTML/MenuPrincipal.html', text: 'Salir del congreso', title: 'Campus de la Institución' },
        ];
    }
    
    return pageHotspots.map(hotspot => createLogoutHotspots(hotspot.position, hotspot.pageURL, hotspot.text, hotspot.title));
}

function createLogoutHotspots(position, pageURL, text, title) {
    const pageHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.DoorIcon);
    pageHotspot.position.set(position.x, position.y, position.z);
    animateHotspot(pageHotspot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        pageHotspot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 65;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    pageHotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    pageHotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Evento de clic para redirigir a la URL de la página
    pageHotspot.addEventListener('click', () => {
        playDoorSoundSceneChange();
        console.log('Hotspot clickeado, redirigiendo a:', pageURL);
        saveCurrentScene(panorama.src); // Guardar la escena actual antes de cambiar de página
        localStorage.removeItem('currentScene');
        window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
}
/* FIN */


/* FOTO */
function setCameraHotspots(sceneURL) {
    let walkHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === '../Img/Congresos/Escalerascabina.jpg') {
        walkHotspots = [
            { position: { x: 4966.71, y: -224.58, z: -466.84 }, sceneURL: 'Cabina fotográfica', text: 'Tomarse una foto', title: 'Tomarse una foto' },
        ];
    }

    return walkHotspots.map(hotspot => createCameraHotspots(hotspot.scale ?? 300,hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createCameraHotspots(scale, position, text, title, fileUrl, description) {
    const infospot = new PANOLENS.Infospot(scale, PANOLENS.DataImage.CamaraIcon);
    infospot.position.set(position.x, position.y, position.z);
    animateHotspot(infospot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';


    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        infospot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 105;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    infospot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    infospot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Evento de clic para abrir el modal de información y reproducir sonido
    infospot.addEventListener('click', () => {
        playSoundInfo();

        // Actualizar el contenido del modal
        openCameraModal(title, fileUrl, description, true);

        // Función para mover la cámara al hotspot seleccionado
        const targetPosition = new THREE.Vector3(position.x, position.y, position.z);
        viewer.tweenControlCenter(targetPosition, 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return infospot;
}
/* FIN */


/* MODAL */
function setModalHotspots(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/Congresos/Lobby.jpg') {
        infoHotspots = [
            { position: { x: -3000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: 'https://www.youtube.com/watch?v=62ctHqCjtxg', description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -1000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: '../Documents/PDF/AcuseCita.pdf', description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -2000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: '../Img/auditorioCongreso.jpg', description: 'El congreso de REDESLA se celebra cada añoS' },
        ];
    } else if (sceneURL === '../Img/Congresos/Salones.jpg') {
        infoHotspots = [
            { position: { x: 4364.25, y: -2425.33, z: 71.92 }, text: 'Ingresar para calificar ponencias', title: 'Calificar ponencias', fileUrl: 'https://redesla.la/redesla/', description: 'Calificar ponencias' },
        ];
    } else if (sceneURL === '../Img/Congresos/IQuatro.jpg') {
        infoHotspots = [
            { scale: 150, position: { x: 2283.39, y: -577.71, z: -4398.62 }, text: 'Ver Publicaciones IQuatro Editores', title: 'Publicaciones IQuatro Editores', fileUrl: 'https://publicaciones.iquatroeditores.org/', description: 'Publicaciones IQuatro Editores' },
            { scale: 150, position: { x: 3175.30, y: -371.23, z: -3834.93 }, text: 'Ver Publicaciones IQuatro Editores', title: 'Publicaciones IQuatro Editores', fileUrl: 'https://publicaciones.iquatroeditores.org/', description: 'Publicaciones IQuatro Editores' },
        ];
    }

    return infoHotspots.map(hotspot => createModalHotspots(hotspot.scale ?? 300, hotspot.position, hotspot.text, hotspot.title, hotspot.fileUrl, hotspot.description));
}

function createModalHotspots(scale, position, text, title, fileUrl, description) {
    const infospot = new PANOLENS.Infospot(scale, PANOLENS.DataImage.WebsitesIcon);
    infospot.position.set(position.x, position.y, position.z);
    animateHotspot(infospot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hoverModalText');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        infospot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 105;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    infospot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    infospot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Evento de clic para abrir el modal de información y reproducir sonido
    infospot.addEventListener('click', () => {
        playSoundInfo();

        // Actualizar el contenido del modal
        openInfoModalLeft(title, fileUrl, description, true);

        // Función para mover la cámara al hotspot seleccionado
        const targetPosition = new THREE.Vector3(position.x, position.y, position.z);
        viewer.tweenControlCenter(targetPosition, 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return infospot;
}
/* FIN */


/* INFO */
function createHotspotInfo(scale, position, text, title, image, description) {
    let infospot = new PANOLENS.Infospot(scale, PANOLENS.DataImage.InfoIcon);
    infospot.position.set(position.x, position.y, position.z);
    infospot.addHoverElement(document.querySelector('#panel'), 165);
    animateHotspot(infospot);
  
    infospot.addEventListener('hoverenter', function(){
        document.querySelector('#panel').classList.add('show');
        document.querySelector('#panel h1').innerHTML = title;
        document.querySelector('#panel p').innerHTML = description;
        // document.querySelector('#panel img').src = image
    });
  
    infospot.addEventListener('hoverleave', function(){
      document.querySelector('#panel').classList.remove('show');
    });

    // Evento de clic para abrir el panel de información y reproducir sonido
    infospot.addEventListener('click', () => {
        playSoundInfo();

        // Funcion para mover la camara al hotspot seleccionado
        const targetPosition = new THREE.Vector3(position.x, position.y, position.z);
        viewer.tweenControlCenter(targetPosition, 0);
    });
  
    return infospot;
}

function setInfoHotspots(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/Congresos/Lobby.jpg') {
      infoHotspots = [
        { scale: 150, position: { x: 4762.66, y: 81.52, z: -1505.20 }, text: 'Bienvenido a REDESLA', title: '¡Bienvenidos a nuestras instalaciones del congreso virtual VIVE REDESLA!', description: 'Este recorrido virtual trata de trasmitir la mayor inmersión posible, y así usted puedad vivir las experiencia RedesLA desde la comodidad de su hogar. Al lado izquierdo podrá entrar a la <b>Zona IQuatro</b>, al lado derecho <b>Mezzanine, Lago RedesLA y cabina fotográfica</b> y al centro nuestro elevador para acceder a nuestros diferentes pisos.' },
    ];
    }

    return infoHotspots.map(hotspot => createHotspotInfo(hotspot.scale ?? 300, hotspot.position, hotspot.text, hotspot.title, hotspot.image, hotspot.description));
}
/* FIN */


/* CAMINAR */
function setWalkHotspots(sceneURL) {
    let walkHotspots = [];

    /* if (sceneURL === '../Img/Exterior/CurcePatioCongreso.jpg') {// Pagina principal con sus hotspot
        walkHotspots = [
            { position: { x: 8000, y: -400, z: 100 }, sceneURL: '../Img/Exterior/PatioCongreso.jpg', text: 'Avanzar al congreso', title: 'Edificio del congreso' },
            { position: { x: 92.81, y: -67.12, z: 4992.50 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Avanzar a los salones', title: 'Salones de las Redes' },
        ];
    } */

    return walkHotspots.map(hotspot => createHotspotCaminar(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createHotspotCaminar(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.WalkIcon);
    sceneHotspot.position.set(position.x, position.y, position.z);
    animateHotspot(sceneHotspot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        sceneHotspot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 65;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    sceneHotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    sceneHotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Cambiar de escena al hacer clic en el hotspot
    sceneHotspot.addEventListener('click', () => {
        playWalkSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            // Importante: Si se crea una nueva variante de un algun hotspot, siempre agregarlo tambien aqui asi como los demas, ya que cuando se cambie de escena y se regrese no aparecera
            const newLoginHotspot = setLoginHotspots(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot));
            const newInfoHotspots = setInfoHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newSceneHotspots = setHotspotPuerta(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newWalkHotspots = setWalkHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newPageHotspots = createPageHotspotsForScene(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL, title); // Guardar la escena actual
        });

        newPanorama.addEventListener('error', (event) => {
            console.error('Error al cargar la nueva imagen panorámica:', event);
        });
        newPanorama.load(sceneURL);
        viewer.add(newPanorama);
        viewer.tweenControlCenter(new THREE.Vector3(3000, 0, 0), 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return sceneHotspot;
}

const walkHotspotSound = new Audio('../Music/sonidos/walk.mp3');
function playWalkSoundSceneChange() {
    walkHotspotSound.play();
}
/* FIN */


/* ZOOM */
function setZoomHotspots(sceneURL) {
    let pageHotspots = [];

    if (sceneURL === '../Img/Congresos/mezzanine.jpg') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 4999.36, y: -14.73, z: -1.08 }, pageURL: 'https://redesla.la/redesla/', text: 'Entrar a ZOOM', title: 'Zoom mezzanine' },
        ];
    } else if (sceneURL === '../Img/Congresos/Salones.jpg') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 4994.15, y: 79.14, z: -52.32 }, pageURL: 'https://redesla.la/redesla/', text: 'Entrar a ZOOM', title: 'Zoom mezzanine' },
        ];
    } else if (sceneURL === '../Img/Congresos/AuditorioCongreso.jpg') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 4995.32, y: 91.20, z: -20.85 }, pageURL: 'https://redesla.la/redesla/', text: 'Entrar a ZOOM', title: 'Zoom mezzanine' },
        ];
    }
    
    return pageHotspots.map(hotspot => createZoomHotspots(hotspot.position, hotspot.pageURL, hotspot.text, hotspot.title));
}

function createZoomHotspots(position, pageURL, text, title) {
    const pageHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.ZoomIcon);
    pageHotspot.position.set(position.x, position.y, position.z);
    animateHotspot(pageHotspot);

    // Crear elemento de texto manualmente
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = text;
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        pageHotspot.getWorldPosition(vector);
        vector.project(viewer.camera);

        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        // Coordenadas de pantalla
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 65;

        // Aplicar el desplazamiento hacia arriba
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    pageHotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    pageHotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Evento de clic para redirigir a la URL de la página
    pageHotspot.addEventListener('click', () => {
        saveCurrentScene(panorama.src); // Guardar la escena actual antes de cambiar de página
        localStorage.removeItem('currentScene');
        window.open(pageURL, '_blank');
        //window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
}
/* FIN */


/* ============================================================================= */


//////////////////////// Inicialización de los hotspot //////////////
// Vista del menú principal
function initializeMainPanorama() {
    panorama = new PANOLENS.ImagePanorama('../Img/Congresos/Lobby.jpg');
    panorama.addEventListener('load', () => {
        addInitialHotspots();
    });
    viewer.add(panorama);
}

// Función para inicializar la escena guardada o la inicial
function initializePanorama() {
    const { sceneURL, sceneTitle } = loadCurrentScene();
    panorama = new PANOLENS.ImagePanorama(sceneURL);

    panorama.addEventListener('load', () => {
        addInitialHotspots();
        updateSceneTitle(sceneTitle);
    });

    viewer.add(panorama);
    viewer.tweenControlCenter(new THREE.Vector3(3000, 0, 0), 0);
}

// Función para agregar hotspots iniciales
function addInitialHotspots() {
    const initialModalHotspots = setModalHotspots(panorama.src);
    initialModalHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialSceneHotspots = setDoorHotspots(panorama.src);
    initialSceneHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialLogoutHotspots = setLogoutHotspots(panorama.src);
    initialLogoutHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialEscalerasHotspots = setEscalerasHotspots(panorama.src);
    initialEscalerasHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialCameraHotspots = setCameraHotspots(panorama.src);
    initialCameraHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialInfoHotspots = setInfoHotspots(panorama.src);
    initialInfoHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialWalkHotspots = setWalkHotspots(panorama.src);
    initialWalkHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialZoomHotspots = setZoomHotspots(panorama.src);
    initialZoomHotspots.forEach(hotspot => panorama.add(hotspot));
}

function updateInitialHotspots(newPanorama, sceneURL) {

    const initialModalHotspots = setModalHotspots(sceneURL);
    initialModalHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialSceneHotspots = setDoorHotspots(sceneURL);
    initialSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialLogoutHotspots = setLogoutHotspots(sceneURL);
    initialLogoutHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialEscalerasHotspots = setEscalerasHotspots(sceneURL);
    initialEscalerasHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialCameraHotspots = setCameraHotspots(sceneURL);
    initialCameraHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialInfoHotspots = setInfoHotspots(sceneURL);
    initialInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialWalkHotspots = setWalkHotspots(sceneURL);
    initialWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));

    const initialZoomHotspots = setZoomHotspots(sceneURL);
    initialZoomHotspots.forEach(hotspot => newPanorama.add(hotspot));

}

// Vista del menú principal
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ container: container,  output: 'console' });
initializePanorama();
//////////////////////// Fin //////////////