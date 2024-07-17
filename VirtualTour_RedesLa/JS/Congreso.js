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
        '../Img/elevadorRelayn.jpeg',
        '../Img/elevadorRelep.jpeg',
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
    return currentScene ? currentScene : '../Img/auditorioCongreso.jpg';
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
function createInfoHotspot(position, text, title, image, description) {
    let infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.WatchInfos);
    infospot.position.set(position.x, position.y, position.z);
    infospot.addHoverElement(document.querySelector('#panel'), 165);
  
    infospot.addEventListener('hoverenter', function(){
        document.querySelector('#panel').classList.add('show');
        document.querySelector('#panel h1').textContent = title;
        document.querySelector('#panel p').textContent = description;
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
// Fin

// Función para crear hotspot de cambio de escena
function createSceneHotspot(position, sceneURL, text, title) {
    const sceneHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.EnterDoor);
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
            const newInfoHotspots = createInfoHotspotsForScene(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newSceneHotspots = createSceneHotspotsForScene(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));
            const newPageHotspots = createPageHotspotsForScene(sceneURL);
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
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return sceneHotspot;
}
// Fin

// Funcion para cambiar de pagina
function createPageHotspot(position, pageURL, text, title) {
    const pageHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Walker);
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
// Fin
//////////////////////// Fin //////////////


//////////////////////// Se declaran los hotspot y su elemento junto con sus rutas //////////////
// Función para crear hotspots de información específicos para una escena
function createInfoHotspotsForScene(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/auditorioCongreso.jpg') {
      infoHotspots = [
        { position: { x: -1000, y: 1000, z: -5000 }, text: 'Bienvenido al congreso de REDESLA', title: 'Bienvenido al congreso de REDESLA', image: '', description: 'El congreso de REDESLA se celebra cada añoS' },
    ];
    }

    return infoHotspots.map(hotspot => createInfoHotspot(hotspot.position, hotspot.text, hotspot.title, hotspot.image, hotspot.description));
}
// Fin

// Función para crear hotspots de cambio de escena específicos para una escena
function createSceneHotspotsForScene(sceneURL) {
    let sceneHotspots = [];

    // Pagina principal
    if (sceneURL === '../Img/auditorioCongreso.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/salaOrgulloRDLA.jpg', text: 'Entrar a congreso', title: 'Sala de congreso' },
        ];
    }else if (sceneURL === '../Img/salaOrgulloRDLA.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/auditorioCongreso.jpg', text: 'Regresar', title: 'Congreso' },
        ];
    }

    return sceneHotspots.map(hotspot => createSceneHotspot(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}
// Fin

// Hotspot para cambiar de pagina no se escena
function createPageHotspotsForScene(sceneURL) {
    let pageHotspots = [];

    if(sceneURL === '../Img/auditorioCongreso.jpg') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 6000, y: 1000, z: -5000 }, pageURL: '../Source/MenuPrincipal.html', text: 'Salir del congreso', title: 'Campus de la Institución' },
        ];
    }
    
    return pageHotspots.map(hotspot => createPageHotspot(hotspot.position, hotspot.pageURL, hotspot.text, hotspot.title));
}
// Fin
//////////////////////// Fin //////////////


//////////////////////// Inicialización de los hotspot //////////////
// Vista del menú principal
function initializeMainPanorama() {
    panorama = new PANOLENS.ImagePanorama('../Img/auditorioCongreso.jpg');
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
}

// Función para agregar hotspots iniciales
function addInitialHotspots() {
    const initialInfoHotspots = createInfoHotspotsForScene(panorama.src);
    initialInfoHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialSceneHotspots = createSceneHotspotsForScene(panorama.src);
    initialSceneHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialPageHotspots = createPageHotspotsForScene(panorama.src);
    initialPageHotspots.forEach(hotspot => panorama.add(hotspot));
}

// Vista del menú principal
function initializePanorama() {
    const savedSceneURL = loadCurrentScene();
    panorama = new PANOLENS.ImagePanorama(savedSceneURL);

    panorama.addEventListener('load', () => {
        addInitialHotspots();
    });

    viewer.add(panorama);
}

// Vista del menú principal
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ container: container });
initializePanorama();
//////////////////////// Fin //////////////