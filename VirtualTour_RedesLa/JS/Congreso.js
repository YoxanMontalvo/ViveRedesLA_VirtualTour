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

// Función para guardar la escena actual en localStorage
function saveCurrentScene(sceneURL) {
    localStorage.setItem('currentScene', sceneURL);
}
// Fin

// Función para cargar la escena actual desde localStorage
function loadCurrentScene() {
    const currentScene = localStorage.getItem('currentScene');
    return currentScene ? currentScene : '../Img/Congresos/Lobby.jpg';
    // return localStorage.getItem = '../Img/auditorioCongreso.jpg';
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
//////////////////////// Fin //////////////


//////////////////////// Declaracion de los hotspot //////////////
// Función para crear hotspot de información y la apertura del modal

// Fin


// Función para crear hotspot de cambio de escena

// Fin

// Funcion para cambiar de pagina

// Fin

// Función para crear hotspot de avanzar simulando caminar

// Fin
//////////////////////// Fin //////////////


//////////////////////// Se declaran los hotspot y su elemento junto con sus rutas //////////////
// Función para crear hotspots de información específicos para una escena

// Fin

// Función para crear hotspots de cambio de escena específicos para una escena

// Fin

// Hotspot para cambiar de pagina no se escena

// Fin

// Función para crear hotspots de caminata específicos para una escena




/* ============================================================================= */

/* PUERTAS */

function createDoorHotspots(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.DoorIcon);
    sceneHotspot.position.set(position.x, position.y, position.z);

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
        playSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            const newInfoHotspots = setModalHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newSceneHotspots = setDoorHotspots(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newWalkHotspots = setEscalerasHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newPageHotspots = setLogoutHotspots(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL); // Guardar la escena actual
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

/* Escaleras */

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
        playSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            // Importante: Si se crea una nueva variante de un algun hotspot, siempre agregarlo tambien aqui asi como los demas, ya que cuando se cambie de escena y se regrese no aparecera
            /* const newLoginHotspot = createLoginHotspotsForScene(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot)); */
            const newInfoHotspots = setModalHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newSceneHotspots = setDoorHotspots(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newWalkHotspots = setEscalerasHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newPageHotspots = setLogoutHotspots(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL); // Guardar la escena actual
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

/* CAMINAR */

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
        console.log('Hotspot clickeado, redirigiendo a:', pageURL);
        saveCurrentScene(panorama.src); // Guardar la escena actual antes de cambiar de página
        localStorage.removeItem('currentScene');
        window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
}

/* FOTO */

function setCameraHotspots(sceneURL) {
    let walkHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === '../Img/Congresos/Escalerascabina.jpg') {
        walkHotspots = [
            { position: { x: 4974.72, y: -260.64, z: -286.94 }, sceneURL: '../Img/Congresos/mezzanine.jpg', text: 'Tomarse una foto', title: 'Tomarse una foto' },
        ];
    }

    return walkHotspots.map(hotspot => createCameraHotspots(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createCameraHotspots(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.CamaraIcon);
    sceneHotspot.position.set(position.x, position.y, position.z);

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
        playSoundSceneChange();//Sonido al cambiar de escena
        musicElevator(sceneURL);//Musica del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);
            // Importante: Si se crea una nueva variante de un algun hotspot, siempre agregarlo tambien aqui asi como los demas, ya que cuando se cambie de escena y se regrese no aparecera
            /* const newLoginHotspot = createLoginHotspotsForScene(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot)); */
            const newInfoHotspots = setModalHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newSceneHotspots = setDoorHotspots(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newWalkHotspots = setEscalerasHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newPageHotspots = setLogoutHotspots(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));
            viewer.setPanorama(newPanorama);
            panorama = newPanorama;
            saveCurrentScene(sceneURL); // Guardar la escena actual
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

/* INFO */

function setModalHotspots(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/Congresos/Lobby.jpg') {
        infoHotspots = [
            { position: { x: -3000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: 'https://www.youtube.com/watch?v=62ctHqCjtxg', description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -1000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: '../Documents/PDF/AcuseCita.pdf', description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -2000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: '../Img/auditorioCongreso.jpg', description: 'El congreso de REDESLA se celebra cada añoS' },
        ];
    }

    return infoHotspots.map(hotspot => createModalHotspots(hotspot.position, hotspot.text, hotspot.title, hotspot.fileUrl, hotspot.description));
}

function createModalHotspots(position, text, title, fileUrl, description) {
    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.InfoIcon);
    infospot.position.set(position.x, position.y, position.z);

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
        openInfoModalLeft(title, fileUrl, description);

        // Función para mover la cámara al hotspot seleccionado
        const targetPosition = new THREE.Vector3(position.x, position.y, position.z);
        viewer.tweenControlCenter(targetPosition, 0);
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return infospot;
}



function createHotspotInfo(scale, position, text, title, image, description) {
    let infospot = new PANOLENS.Infospot(scale, PANOLENS.DataImage.InfoIcon);
    infospot.position.set(position.x, position.y, position.z);
    infospot.addHoverElement(document.querySelector('#panel'), 165);
  
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

/* ============================================================================= */














// Fin
//////////////////////// Fin //////////////


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
    const savedSceneURL = loadCurrentScene();
    if (savedSceneURL) {
        panorama = new PANOLENS.ImagePanorama(savedSceneURL);
    } else {
        initializeMainPanorama();
    }

    panorama.addEventListener('load', () => {
        addInitialHotspots();
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

    const initialPageHotspots = setLogoutHotspots(panorama.src);
    initialPageHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialWalkHotspots = setEscalerasHotspots(panorama.src);
    initialWalkHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialCameraHotspots = setCameraHotspots(panorama.src);
    initialCameraHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialInfoHotspots = setInfoHotspots(panorama.src);
    initialInfoHotspots.forEach(hotspot => panorama.add(hotspot));
}

// Vista del menú principal
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ container: container,  output: 'console' });
initializePanorama();
//////////////////////// Fin //////////////