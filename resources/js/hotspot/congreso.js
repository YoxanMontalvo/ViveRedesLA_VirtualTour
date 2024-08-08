//////////////////////// Todas las funciones fuera de los hotspot //////////////
// Este sonido se debe de utilizar en todos los paneles y modales del recorrido
const soundGlobal = new Audio(`${base_url}resources/sounds/PanelSound.mp3`);
window.panelGlobalSound = function() {
    soundGlobal.play();
};
// Fin


// Reproducir el sonido al abrir el modal
const InfoHotSound = new Audio(`${base_url}resources/sounds/PanelSound.mp3`);
function playSoundInfo() {
    InfoHotSound.play();
}
// Fin

// Musica del elevador
const elevatorMusic = new Audio(`${base_url}resources/music/ambientacionSong.mp3`);
function musicElevator(sceneURL) {
    const scenesWithElevatorMusic = [
        `${base_url}resources/img/congreso/Elevador.jpg`
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

function saveCurrentScene(sceneURL, sceneTitle) {
    localStorage.setItem('currentScene', sceneURL);
    if (sceneTitle) {
        localStorage.setItem('currentSceneTitle', sceneTitle);
    } else {
        localStorage.setItem('currentSceneTitle', 'Entrada de Vive RedesLA');
    }
}

// Función para cargar la escena y el título actual desde localStorage
function loadCurrentScene() {
    const currentScene = localStorage.getItem('currentScene');
    const currentSceneTitle = localStorage.getItem('currentSceneTitle');
    return {
        sceneURL: currentScene ? currentScene : `${base_url}resources/img/congreso/Lobby.jpg`,
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
    setInterval(startJump, delay);
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
            updateInitialHotspots(newPanorama, sceneURL);
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
    if (sceneURL === `${base_url}resources/img/congreso/Lobby.jpg`) {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 4993.16, y: -140.51, z: -25.19 }, sceneURL: `${base_url}resources/img/congreso/Elevador.jpg`, text: 'Entrar al elevador', title: 'Elevador' },
            { position: { x: 2200, y: -300, z: -4000 }, sceneURL: `${base_url}resources/img/congreso/mezzanine.jpg`, text: 'Entrar a Mezzanine', title: 'Sala de Mezzanine' },
            { position: { x: 3000, y: -400, z: 5000 }, sceneURL: `${base_url}resources/img/congreso/IQuatro.jpg`, text: 'Entrar a Zona iQuatro', title: 'Zona iQuatro' },

            { position: { x: -5000, y: -400, z: 5000 }, sceneURL: `${base_url}resources/img/congreso/Arcade.jpg`, text: 'Arcade prueba', title: 'Arcade prueba' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/Elevador.jpg`) {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 6000, y: 400, z: -4700 }, sceneURL: `${base_url}resources/img/congreso/Lobby.jpg`, text: 'Lobby', title: 'Congreso' },
            { position: { x: 6000, y: -500, z: -4700 }, sceneURL: `${base_url}resources/img/congreso/PasilloSalones.jpg`, text: 'Pasillo salones', title: 'Pasillo de los salones' },
            { position: { x: 6000, y: -1400, z: -4700 }, sceneURL: '../Img/Congresos/AuditorioCongreso.jpg', text: 'Auditorio', title: 'Auditorio' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/mezzanine.jpg`) {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 8000, y: -200, z: -4000 }, sceneURL: `${base_url}resources/img/congreso/Lago.jpg`, text: 'Ir al Lago REDESLA', title: 'Lago' },
            { position: { x: -4934.34, y: -588.57, z: -515.44 }, sceneURL: `${base_url}resources/img/congreso/Lobby.jpg`, text: 'Volver al lobby del congreso', title: 'Congreso' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/Lago.jpg`) {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: -8000, y: -200, z: -4000 }, sceneURL: `${base_url}resources/img/congreso/mezzanine.jpg`, text: 'Volver al Mezzanine', title: 'Sala de Mezzanine' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/PasilloSalones.jpg`) {
        sceneHotspots = [
            { position: { x: -9000, y: -200, z: 100 }, sceneURL: `${base_url}resources/img/congreso/Elevador.jpg`, text: 'Volver al elevador', title: 'Elevador' },
            { position: { x: 24.68, y: -1087.24, z: -4876.47 }, sceneURL: `${base_url}resources/img/congreso/Salones.jpg`, text: 'Ingresar al salon 3', title: 'Salon 3' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/Salones.jpg`) {
        sceneHotspots = [
            { position: { x: -4934.28, y: -506.02, z: 580.35 }, sceneURL: `${base_url}resources/img/congreso/PasilloSalones.jpg`, text: 'Volver al pasillo de salones', title: 'Pasillo de los salones' },
        ];
    }else if (sceneURL === '../Img/Congresos/AuditorioCongreso.jpg') {
        sceneHotspots = [
            { position: { x: -4971.55, y: -273.11, z: 338.14 }, sceneURL: `${base_url}resources/img/congreso/Elevador.jpg`, text: 'Volver al elevador', title: 'Elevador' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/IQuatro.jpg`) {
        sceneHotspots = [
            { position: { x: -2918.37, y: -325.06, z: -4043.23 }, sceneURL: `${base_url}resources/img/congreso/Lobby.jpg`, text: 'Volver al lobby del congreso', title: 'Lobby congreso' },
        ];
    }

    return sceneHotspots.map(hotspot => createDoorHotspots(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

const doorHotspotSound = new Audio(`${base_url}resources/sounds/door.mp3`);
function playDoorSoundSceneChange() {
    doorHotspotSound.play();
}
/* FIN */


/* ESCALERAS */
function setEscalerasHotspots(sceneURL) {
    let walkHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === `${base_url}resources/img/congreso/mezzanine.jpg`) {// Pagina principal con sus hotspot
        walkHotspots = [
            { position: { x: 8000, y: 1500, z: -4000 }, sceneURL: `${base_url}resources/img/congreso/Escalerascabina.jpg`, text: 'Subir escaleras', title: 'Cabina fotografica' },
        ];
    }else if (sceneURL === `${base_url}resources/img/congreso/Escalerascabina.jpg`) {
        walkHotspots = [
            { position: { x: -934.97, y: -2788.14, z: 4035.68 }, sceneURL: `${base_url}resources/img/congreso/mezzanine.jpg`, text: 'Bajar escaleras', title: 'Sala de Mezzanine' },
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

    if(sceneURL === `${base_url}resources/img/congreso/Lobby.jpg`) { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: -4951.47, y: -667.63, z: 10.11 }, pageURL: `${base_url}/inicio`, text: 'Salir del congreso', title: 'Campus de la Institución' },
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
        saveCurrentScene(panorama.src);
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
    if (sceneURL === `${base_url}resources/img/congreso/Escalerascabina.jpg`) {
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
        window.panelGlobalSound();

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

    if (sceneURL === `${base_url}resources/img/congreso/Lobby.jpg`) {
        infoHotspots = [
            { position: { x: -3000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: 'https://www.youtube.com/watch?v=62ctHqCjtxg', description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -1000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: `${base_url}resources/documents/pdf/AcuseCita.pdf`, description: 'El congreso de REDESLA se celebra cada añoS' },
            { position: { x: -2000, y: 1000, z: -5000 }, text: 'Breve descripcion de lo que tratara el modal', title: 'Bienvenido al congreso de REDESLA', fileUrl: `${base_url}resources/documents/imgInfo/CursosImage.png`, description: 'El congreso de REDESLA se celebra cada añoS' },
        ];
    } else if (sceneURL === `${base_url}resources/img/congreso/Salones.jpg`) {
        infoHotspots = [
            { position: { x: 4364.25, y: -2425.33, z: 71.92 }, text: 'Ingresar para calificar ponencias', title: 'Calificar ponencias', fileUrl: 'https://redesla.la/redesla/', description: 'Calificar ponencias' },
        ];
    } else if (sceneURL === `${base_url}resources/img/congreso/IQuatro.jpg`) {
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
        window.panelGlobalSound();

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
        window.panelGlobalSound();
        // document.querySelector('#panel img').src = image
    });
  
    infospot.addEventListener('hoverleave', function(){
      document.querySelector('#panel').classList.remove('show');
    });

    // Evento de clic para abrir el panel de información y reproducir sonido
    infospot.addEventListener('click', () => {
        // Funcion para mover la camara al hotspot seleccionado
        const targetPosition = new THREE.Vector3(position.x, position.y, position.z);
        viewer.tweenControlCenter(targetPosition, 0);
    });
  
    return infospot;
}

function setInfoHotspots(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === `${base_url}resources/img/congreso/Lobby.jpg`) {
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

const walkHotspotSound = new Audio(`${base_url}resources/sounds/walk.mp3`);
function playWalkSoundSceneChange() {
    walkHotspotSound.play();
}
/* FIN */


/* ZOOM */
function setZoomHotspots(sceneURL) {
    let pageHotspots = [];

    if (sceneURL === `${base_url}resources/img/congreso/mezzanine.jpg`) { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 4999.36, y: -14.73, z: -1.08 }, pageURL: 'https://redesla.la/redesla/', text: 'Entrar a ZOOM', title: 'Zoom mezzanine' },
        ];
    } else if (sceneURL === `${base_url}resources/img/congreso/Salones.jpg`) { // Ejemplo de una escena
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
        // Llamar a la función para pausar la música
        if (typeof window.pausarMusica === 'function') {
            window.pausarMusica();
        }
        
        // Guardar la escena actual antes de cambiar de página
        saveCurrentScene(panorama.src); 
        localStorage.removeItem('currentScene');
        window.open(pageURL, '_blank');
        //window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
}
/* FIN */


/* ARCADE */
function createHotspotArcade(position, game, description, imageUrl) {
    const hotspot = new PANOLENS.Infospot(350, PANOLENS.DataImage.ArcadeIcon);
    hotspot.position.set(position.x, position.y, position.z);
    animateHotspot(hotspot);

    // Crear el panel del hotspot con título, imagen y descripción
    const hotspotPanel = document.createElement('div');
    hotspotPanel.classList.add('game-panel');

    // Crear el título
    const title = document.createElement('h3');
    title.textContent = game;
    title.classList.add('title');
    hotspotPanel.appendChild(title);

    // Crear la imagen
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = game;
        image.classList.add('image');
        hotspotPanel.appendChild(image);
    }

    // Crear la descripción
    const desc = document.createElement('p');
    desc.textContent = description;
    desc.classList.add('description');
    hotspotPanel.appendChild(desc);

    // Mostrar el panel al hacer hover sobre el hotspot
    hotspot.addEventListener('hoverenter', () => {
        hotspotPanel.classList.add('show');
        panelGlobalSound();
    });

    // Ocultar el panel al salir del hover
    hotspot.addEventListener('hoverleave', () => {
        hotspotPanel.classList.remove('show');
    });

    // Evento de clic para abrir el modal del juego específico
    hotspot.addEventListener('click', () => {
        hotspotPanel.classList.remove('show');
        playArcadeSound();
        openModal(game);
    });

    // Agregar el panel al contenedor
    document.body.appendChild(hotspotPanel);
    return hotspot;
}

// Configura los hotspots del arcade con sus respectivos juegos
function setArcadeHotspots(sceneURL) {
    let arcadeHotspots = [];

    if (sceneURL === `${base_url}resources/img/congreso/Arcade.jpg`) {
        arcadeHotspots = [
            { position: { x: 4981.38, y: -351.43, z: -91.83 }, game: 'SpaceWord', description: 'Resuelve las palabras ocultas', image: `${base_url}resources/documents/imgInfo/CursosImage.png`},
            { position: { x: 4884.93, y: -326.47, z: 994.37 }, game: 'Memorama', description: 'Encuentra los pares de cartas', image: `${base_url}resources/documents/imgInfo/CursosImage.png`},
            { position: { x: 4808.88, y: -250.31, z: -1307.09 }, game: 'HangMan', description: 'Acierta la palabra antes de que se termine el tiempo', image: `${base_url}resources/documents/imgInfo/CursosImage.png`},
            { position: { x: 4511.45, y: -243.81, z: 2123.06}, game: 'Snake', description: 'Guía la serpiente para que coma sin chocar', image: `${base_url}resources/documents/imgInfo/CursosImage.png`}
        ];
    }

    return arcadeHotspots.map(hotspot => createHotspotArcade(hotspot.position, hotspot.game, hotspot.description, hotspot.image));
}

// Funciones dedicadas al modal del Arcade
function openModal(game) {
    document.getElementById('modalArcade').style.display = 'flex';
    loadGame(game);
}
// Cerrar modal
function closeModal() {
    document.getElementById('modalArcade').style.display = 'none';
    document.getElementById('game-container').innerHTML = '';
}
// Función para cargar el juego en el modal
function loadGame(game) {
    let gameContainer = document.getElementById('game-container');
    let gameUrl;

    switch (game) {
        case 'SpaceWord':
            gameUrl = `${base_url}game/spaceword`;
            break;
        case 'Memorama':
            gameUrl = `${base_url}game/memoria`;
            break;
        case 'HangMan':
            gameUrl = `${base_url}game/hangman`;
            break;
        case 'Snake':
            gameUrl = `${base_url}game/snake`;
            break;
        default:
            gameContainer.innerHTML = 'Juego no encontrado';
            return;
    }

    gameContainer.innerHTML = `<iframe src="${gameUrl}" width="100%" height="100%"></iframe>`;
}
// Reproducir el sonido al abrir el juego para usarlo
const ArcadeSound = new Audio(`${base_url}resources/sounds/ArcadeSound2.mp3`);
function playArcadeSound() {
    ArcadeSound.play();
}
/* FIN */


/* ============================================================================= */


//////////////////////// Inicialización de los hotspot //////////////
// Vista del menú principal
function initializeMainPanorama() {
    panorama = new PANOLENS.ImagePanorama(`${base_url}resources/img/congreso/Lobby.jpg`);
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

    // Arcade
    const initialArcadeHotspots = setArcadeHotspots(panorama.src);
    initialArcadeHotspots.forEach(hotspot => panorama.add(hotspot));
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

    // Arcade
    const initialArcadeHotspots = setArcadeHotspots(sceneURL);
    initialArcadeHotspots.forEach(hotspot => newPanorama.add(hotspot));

}

// Vista del menú principal
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ container: container,  output: 'console' });
initializePanorama();
//////////////////////// Fin //////////////