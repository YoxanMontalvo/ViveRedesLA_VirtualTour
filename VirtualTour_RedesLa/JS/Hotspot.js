// Reproducir el sonido al abrir el modal
const InfoHotSound = new Audio('../Music/SoundInfoView.mp3');
function playSoundInfo() {
    InfoHotSound.play();
}
// Fin

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
        '../Img/elevadorRelen.jpeg',
        '../Img/elevadorReleem.jpeg',
        '../Img/elevadorReleg.jpeg',
        '../Img/elevadorREDESLA.jpeg',
        '../Img/elevadorOrgulloRDLA.jpeg'
    ];

    if (scenesWithElevatorMusic.includes(sceneURL)) {
        elevatorMusic.play();
    } else {
        elevatorMusic.pause();
    }
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
            const newWalkHotspots = createWalkHotspotsForScene(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));
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

// Función para guardar la escena actual en localStorage
function saveCurrentScene(sceneURL) {
    localStorage.setItem('currentScene', sceneURL);
}
// Fin

// Función para cargar la escena actual desde localStorage
function loadCurrentScene() {
    return localStorage.getItem('currentScene') || '../Img/PanoramaInterior.png';
}
// Fin

// Modificar la función de crear hotspot de cambio de página para guardar el estado
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
        window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
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

// Función para crear hotspot de avanzar simulando caminar
function createWalkHotspot(position, direction, text) {
    const walkHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Feed);
    walkHotspot.position.set(position.x, position.y, position.z);
    walkHotspot.addHoverText(text, 40);
    walkHotspot.userData.direction = direction;
    walkHotspot.addEventListener('click', () => {
        console.log('Avanzar:', direction);
    });
    return walkHotspot;
}
// Fin

// Funcion para crear un hotspot para desplegar el inicio de sesion mediante un modal
function createLoginHotspot(position) {
    const hotspot = new PANOLENS.Infospot(350, PANOLENS.DataImage.LoginIcon);
    hotspot.position.set(position.x, position.y, position.z);

    // Crear elemento de texto para el hotspot
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = 'Entrar a Congresos';
    hotspotText.style.display = 'none';

    // Función para actualizar la posición del texto del hotspot
    function updateHotspotTextPosition() {
        const vector = new THREE.Vector3();
        hotspot.getWorldPosition(vector);
        vector.project(viewer.camera);
        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;
        const screenX = (vector.x * widthHalf) + widthHalf;
        const screenY = (-vector.y * heightHalf) + heightHalf;
        const offsetTop = 75;
        hotspotText.style.top = `${screenY - offsetTop}px`;
        hotspotText.style.left = `${screenX}px`;
    }

    // Mostrar el texto al hacer hover sobre el hotspot
    hotspot.addEventListener('hoverenter', () => {
        updateHotspotTextPosition();
        hotspotText.style.display = 'block';
    });

    // Ocultar el texto al salir del hover
    hotspot.addEventListener('hoverleave', () => {
        hotspotText.style.display = 'none';
    });

    // Evento de clic para abrir el modal de inicio de sesión
    hotspot.addEventListener('click', () => {
        $('#loginModal').modal('show');
    });

    document.getElementById('container').appendChild(hotspotText);
    return hotspot;
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

// Hotspot de inicio de sesion
function createLoginHotspotsForScene(sceneURL) {
    let loginHotspots = [];

    if (sceneURL === '../Img/PanoramaInterior.png') {
        loginHotspots = [
            { position: { x: 3000, y: 100, z: -5000 }}
        ];
    }
    return loginHotspots.map(hotspot => createLoginHotspot(hotspot.position));
}
// Fin

// Función para crear hotspots de información específicos para una escena
function createInfoHotspotsForScene(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/PanoramaInterior.png') {
      infoHotspots = [
        { position: { x: -1000, y: 1000, z: -5000 }, text: 'Bienvenido a REDESLA', title: 'Vive RedesLa', image: '../Icons/CursosImage.png', description: 'Este recorrido virtual trata de trasmitir la mayor inmersión posible, y así usted puedad vivir las experiencia RedesLA desde la comodidad de su hogar' },
    ];
    }

    return infoHotspots.map(hotspot => createInfoHotspot(hotspot.position, hotspot.text, hotspot.title, hotspot.image, hotspot.description));
}
// Fin

// Hotspot para cambiar de pagina no se escena
function createPageHotspotsForScene(sceneURL) {
    let pageHotspots = [];

    if(sceneURL === '../Img/cafeteriaPlanta.png') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, pageURL: '../GameZone/index.html', text: 'Entrar al Arcade', title: 'Zona de videojuegos' },
        ];
    }else if (sceneURL === '../Img/auditorioPlanta.png') { // Ejemplo de una escena
        pageHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, pageURL: 'https://us02web.zoom.us/j/89184349159?pwd=OTNvWUg3MjdEK1FFSjNwWXZaa0E2UT09#success', text: 'Acceder al curso', title: 'Acceder al curso' },
        ];
    }else if (sceneURL === '../Img/RecervoriosSala.jpg'){
        pageHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, pageURL: 'https://iquatroeditores.org/revista/', text: '¡Quatro Editores', title: 'Acceder a ¡Quatro Editores' },//¡Quatro Editores
            { position: { x: 2000, y: 1000, z: -5000 }, pageURL: 'https://www.mheducation.com.mx/mh_redesla', text: 'Mc Graw Hill-RedesLA', title: 'Acceder a Mc Graw Hill-RedesLA' },//Mc Graw Hill-RedesLA
            { position: { x: 3000, y: 1000, z: -5000 }, pageURL: 'https://publicaciones.redesla.la/', text: 'Productos académicos RedesLA', title: 'Acceder a Productos académicos RedesLA' },//Productos académicos RedesLA
            { position: { x: 4000, y: 1000, z: -5000 }, pageURL: 'https://drive.google.com/drive/folders/1qsuM3Ps235kfiabNtnyhZ_Xj9O73otYt', text: 'Trabajos académicos RedesLA', title: 'Acceder a Trabajos académicos RedesLA' },//Trabajos académicos RedesLA

            { position: { x: 1000, y: 2000, z: -5000 }, pageURL: 'https://www.redalyc.org/', text: 'REDALYC', title: 'Acceder a REDALYC' },//REDALYC
            { position: { x: 2000, y: 2000, z: -5000 }, pageURL: 'https://dialnet.unirioja.es/', text: 'DIALNET', title: 'Acceder a DIALNET' },//DIALNET
            { position: { x: 3000, y: 2000, z: -5000 }, pageURL: 'https://scielo.org/es/', text: 'SCIELO', title: 'Acceder a SCIELO' },//SCIELO
            { position: { x: 4000, y: 2000, z: -5000 }, pageURL: 'https://journals.sagepub.com/', text: 'SAGE JOURNALS', title: 'Acceder a SAGE JOURNALS' },//SAGE JOURNALS
            { position: { x: 5000, y: 2000, z: -5000 }, pageURL: 'https://scholar.google.es/schhp?hl=es', text: 'GOOGLE ACADÉMICO', title: 'Acceder a GOOGLE ACADÉMICO' },//GOOGLE ACADÉMICO
            { position: { x: 5000, y: 2000, z: -5000 }, pageURL: 'https://link.springer.com/', text: 'SPRINGER LINK', title: 'Acceder a SPRINGER LINK' },//SPRINGER LINK
        ];
    }else if (sceneURL === '../Img/centroComputoSala.jpg'){
        pageHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, pageURL: 'https://www.jamovi.org/', text: 'Descargar Jamovi', title: 'Descargar Jamovi' },//Jamovy
            { position: { x: 2000, y: 1000, z: -5000 }, pageURL: 'https://www.mendeley.com/', text: 'Descargar Mendeley', title: 'Descargar Mendeley' },//Mendeley
            { position: { x: 3000, y: 1000, z: -5000 }, pageURL: 'https://www.gnu.org/software/pspp/', text: 'Descargar PSPP', title: 'Descargar PSPP' },//PSPP
            { position: { x: 4000, y: 1000, z: -5000 }, pageURL: 'https://atlasti.com/es', text: 'Descargar Atlas.ti', title: 'Descargar Atlas.ti' },//Atlas.ti
            { position: { x: 5000, y: 1000, z: -5000 }, pageURL: 'https://www.decisionanalyst.com/download/#desktop', text: 'Descargar Decision Analyst', title: 'Descargar Decision Analyst' },//Decision Analyst

            { position: { x: 3000, y: 2000, z: -5000 }, pageURL: 'https://moodle.redesla.la/login/index.php', text: 'Entrar a Moodle RedesLA', title: 'Entrar a Moodle RedesLA' },//Moodle RedesLA
            { position: { x: 4000, y: 2000, z: -5000 }, pageURL: 'https://redesla.la/redesla/', text: 'Entrar a Plataforma RedesLA', title: 'Entrar a Plataforma RedesLA' },//Plataforma RedesLA
        ];
    }
    
    return pageHotspots.map(hotspot => createPageHotspot(hotspot.position, hotspot.pageURL, hotspot.text, hotspot.title));
}
// Fin

// Función para crear hotspots de cambio de escena específicos para una escena
function createSceneHotspotsForScene(sceneURL) {
    let sceneHotspots = [];

    // Pagina principal
    if (sceneURL === '../Img/PanoramaInterior.png') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Entrar a Oficinas', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosOficinas.jpg', text: 'Entrar a Cursos', title: 'Recepción de Cursos' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/congresosOficinas.jpg', text: 'Entrar a Congresos', title: 'Congresos ' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/CIROficinas.jpg', text: 'Entrar a Centro de Investigación REDESLA', title: 'Centro de Investigación REDESLA' },
            { position: { x: 5000, y: 1000, z: -5000 }, sceneURL: '../Img/redeslaOficinas.jpg', text: 'Entrar a REDESLA', title: 'Oficina REDESLA' },
        ];
    } 
    // Salones de las Redes
    else if (sceneURL === '../Img/RedesSalones.png') {// Pagina donde se encuentran los salos de las redes
        sceneHotspots = [
            // Hotspot de los edificiones de las redes
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELAYN.jpg', text: 'Entrar a RELAYN', title: 'RELAYN' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEP.jpg', text: 'Entrar a RELEP', title: 'RELEP' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEN.jpg', text: 'Entrar a RELEN', title: 'RELEN' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEEM.jpg', text: 'Entrar a RELEEM', title: 'RELEEM' },
            { position: { x: 5000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEG.jpg', text: 'Entrar a RELEG', title: 'RELEG' },
            // Hotspot para regresar
            { position: { x: 6000, y: 1000, z: -5000 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Regresar', title: 'Campus de la Institución' },
        ];
    }
    // RELAYN CODIGO
    else if (sceneURL === '../Img/RecepRELAYN.jpg') {//Recepcion de Relayn
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Regresar al pasillo', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelayn.jpeg', text: 'Entrar al elevador', title: 'Elevador Relayn' },
        ];
    
    }else if (sceneURL === '../Img/elevadorRelayn.jpeg') {// Elevador Relayn y selector de planta
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELAYN.jpg', text: 'Planta 1 - Recepción', title: 'RELAYN' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloATMRELAYN.jpg', text: 'Planta 2 - Atención a miembros', title: 'Atención a miembros' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloReunionesRELAYN.jpg', text: 'Planta 3 - Sala de reuniones', title: 'Sala de reuniones' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccion.jpg', text: 'Planta 4 - Dirección', title: 'Dirección' },
        ];
    }else if (sceneURL === '../Img/PasilloATMRELAYN.jpg') {// Pasillo Atencion a miembros y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelayn.jpeg', text: 'Regresar al elevador', title: 'Elevador Relayn' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaATMRELAYN.jpg', text: 'Entrar a Atención a miembros', title: 'Atención a miembros RELAYN' },
        ];
    }else if (sceneURL === '../Img/PasilloReunionesRELAYN.jpg') {// Pasillo de reuniones y oficiana
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelayn.jpeg', text: 'Regresar al elevador', title: 'Elevador Relayn' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaReunionesRELAYN.jpg', text: 'Entrar a Reuniones', title: 'Sala de reuniones RELAYN' },
        ];
    }else if (sceneURL === '../Img/PasilloDireccion.jpg') {// Pasillo de direccion y oficiana
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelayn.jpeg', text: 'Regresar al elevador', title: 'Elevador Relayn' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaDireccionRELAYN.jpg', text: 'Entrar a Dirección', title: 'Oficina de dirección RELAYN' },
        ];
    }else if(sceneURL === '../Img/OficinaDireccionRELAYN.jpg'){
        sceneHotspots = [
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccion.jpg', text: 'Regresar', title: 'Dirección' },
        ];
    }
    // RELEP CODIGO
    else if (sceneURL === '../Img/RecepRELEP.jpg') {//Recepcion de Relep
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Regresar al pasillo', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelep.jpeg', text: 'Entrar al elevador', title: 'Elevador Relep' },
        ];
    
    }else if (sceneURL === '../Img/elevadorRelep.jpeg') {//Elevador Relep y selector de planta
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEP.jpg', text: 'Planta 1 - Recepción', title: 'RELEP' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloATMRELEP.jpg', text: 'Planta 2 - Atención a miembros', title: 'Atención a miembros' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloReunionesRELEP.jpg', text: 'Planta 3 - Sala de reuniones', title: 'Sala de reuniones' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccionRELEP.jpg', text: 'Planta 4 - Dirección', title: 'Dirección' },
        ];

    }else if (sceneURL === '../Img/PasilloATMRELEP.jpg') {// Pasillo Atencion a miembros y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelep.jpeg', text: 'Regresar al elevador', title: 'Elevador Relep' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaATMRELEP.jpg', text: 'Entrar a Atención a miembros', title: 'Atención a miembros RELEP' },
        ];
    }else if (sceneURL === '../Img/PasilloReunionesRELEP.jpg') {// Pasillo de reuniones y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelep.jpeg', text: 'Regresar al elevador', title: 'Elevador Relep' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaReunionesRELEP.jpg', text: 'Entrar a Reuniones', title: 'Sala de reuniones RELEP' },
        ];
    }else if (sceneURL === '../Img/PasilloDireccionRELEP.jpg') {// Pasillo de direccion y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelep.jpeg', text: 'Regresar al elevador', title: 'Elevador Relep' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaDireccionRELEP.jpg', text: 'Entrar a Dirección', title: 'Oficina de dirección RELEP' },
        ];
    }
    // RELEN CODIGO
    else if (sceneURL === '../Img/RecepRELEN.jpg') {//Recepcion de Relen
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Regresar al pasillo', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelen.jpeg', text: 'Entrar al elevador', title: 'Elevador Relen' },
        ];
    
    }else if (sceneURL === '../Img/elevadorRelen.jpeg') {//Elevador Relen y selector de planta
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEN.jpg', text: 'Planta 1 - Recepción', title: 'RELEN' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloATMRELEN.jpg', text: 'Planta 2 - Atención a miembros', title: 'Pasillo de Atención a miembros' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloReunionesRELEN.jpg', text: 'Planta 3 - Sala de reuniones', title: 'Pasillo de Sala de reuniones' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccionRELEN.jpg', text: 'Planta 4 - Dirección', title: 'Pasillo de Dirección' },
        ];

    }else if (sceneURL === '../Img/PasilloATMRELEN.jpg') {// Pasillo Atencion a miembros y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelen.jpeg', text: 'Regresar al elevador', title: 'Elevador Relen' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaATMRELEN.jpg', text: 'Entrar a Atención a miembros', title: 'Atención a miembros RELEN' },
        ];
    }else if (sceneURL === '../Img/PasilloReunionesRELEN.jpg') {// Pasillo de reuniones y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelen.jpeg', text: 'Regresar al elevador', title: 'Elevador Relen' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaReunionesRELEN.jpg', text: 'Entrar a Reuniones', title: 'Sala de reuniones RELEN' },
        ];
    }else if (sceneURL === '../Img/PasilloDireccionRELEN.jpg') {// Pasillo de direccion y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorRelen.jpeg', text: 'Regresar al elevador', title: 'Elevador Relen' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaDireccionRELEN.jpg', text: 'Entrar a Dirección', title: 'Oficina de dirección RELEN' },
        ];
    }
    // RELEEM
    else if (sceneURL === '../Img/RecepRELEEM.jpg') {//Recepcion de Releem
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Regresar al pasillo', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleem.jpeg', text: 'Entrar al elevador', title: 'Elevador Releem' },
        ];
    
    }else if (sceneURL === '../Img/elevadorReleem.jpeg') {//Elevador Releem y selector de planta
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEEM.jpg', text: 'Planta 1 - Recepción', title: 'RELEEM' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloATMRELEEM.jpg', text: 'Planta 2 - Atención a miembros', title: 'Pasillo de Atención a miembros' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloReunionesRELEEM.jpg', text: 'Planta 3 - Sala de reuniones', title: 'Pasillo de Sala de reuniones' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccionRELEEM.jpg', text: 'Planta 4 - Dirección', title: 'Pasillo de Dirección' },
        ];

    }else if (sceneURL === '../Img/PasilloATMRELEEM.jpg') {// Pasillo Atencion a miembros y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleem.jpeg', text: 'Regresar al elevador', title: 'Elevador Releem' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaATMRELEEM.jpg', text: 'Entrar a Atención a miembros', title: 'Atención a miembros RELEEM' },
        ];
    }else if (sceneURL === '../Img/PasilloReunionesRELEEM.jpg') {// Pasillo de reuniones y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleem.jpeg', text: 'Regresar al elevador', title: 'Elevador Releem' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaReunionesRELEEM.jpg', text: 'Entrar a Reuniones', title: 'Sala de reuniones RELEEM' },
        ];
    }else if (sceneURL === '../Img/PasilloDireccionRELEEM.jpg') {// Pasillo de direccion y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleem.jpeg', text: 'Regresar al elevador', title: 'Elevador Releem' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaDireccionRELEEM.jpg', text: 'Entrar a Dirección', title: 'Oficina de dirección RELEEM' },
        ];
    }
    // RELEG
    else if (sceneURL === '../Img/RecepRELEG.jpg') {//Recepcion de Releem
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Regresar al pasillo', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleg.jpeg', text: 'Entrar al elevador', title: 'Elevador Releg' },
        ];
    
    }else if (sceneURL === '../Img/elevadorReleg.jpeg') {//Elevador Releem y selector de planta
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RecepRELEG.jpg', text: 'Planta 1 - Recepción', title: 'RELEG' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloATMRELEG.jpg', text: 'Planta 2 - Atención a miembros', title: 'Pasillo de Atención a miembros' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloReunionesRELEG.jpg', text: 'Planta 3 - Sala de reuniones', title: 'Pasillo de Sala de reuniones' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/PasilloDireccionRELEG.jpg', text: 'Planta 4 - Dirección', title: 'Pasillo de Dirección' },
        ];

    }else if (sceneURL === '../Img/PasilloATMRELEG.jpg') {// Pasillo Atencion a miembros y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleg.jpeg', text: 'Regresar al elevador', title: 'Elevador Releg' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaATMRELEG.jpg', text: 'Entrar a Atención a miembros', title: 'Atención a miembros RELEG' },
        ];
    }else if (sceneURL === '../Img/PasilloReunionesRELEG.jpg') {// Pasillo de reuniones y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleg.jpeg', text: 'Regresar al elevador', title: 'Elevador Releg' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaReunionesRELEG.jpg', text: 'Entrar a Reuniones', title: 'Sala de reuniones RELEG' },
        ];
    }else if (sceneURL === '../Img/PasilloDireccionRELEG.jpg') {// Pasillo de direccion y Oficina
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorReleg.jpeg', text: 'Regresar al elevador', title: 'Elevador Releg' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/OficinaDireccionRELEG.jpg', text: 'Entrar a Dirección', title: 'Oficina de dirección RELEG' },
        ];
    }
    // Recepcion de la oficina de cursos
    else if (sceneURL === '../Img/cursosOficinas.jpg') {// Pagina donde se encuentran los salos de las redes
        sceneHotspots = [
            // Hotspot de los edificiones de las redes
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosRecepcion.jpg', text: 'Entrar a Cursos', title: 'Cursos' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/redeslaOficinas.jpg', text: 'Entrar a Oficinas RedesLA', title: 'Oficina REDESLA' },
            // Hotspot para regresar
            { position: { x: 6000, y: 1000, z: -5000 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Regresar', title: 'Campus de la Institución' },
        ];
    }
    // Departamentos de la oficina de cursos
    else if (sceneURL === '../Img/cursosRecepcion.jpg') {// Pagina donde se encuentran los salos de las redes
        sceneHotspots = [
            // Hotspot de los edificiones de las redes
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/cafeteriaPlanta.png', text: 'Entrar a Cafeteria', title: 'Cafeteria' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/bibliotecaPlanta.png', text: 'Entrar a Biblioteca', title: 'Biblioteca' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/auditorioPlanta.png', text: 'Entrar a Auditorio', title: 'Auditorio' },
            // Hotspot para regresar
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosOficinas.jpg', text: 'Regresar', title: 'Recepción de Cursos' },
        ];
    }else if (sceneURL === '../Img/cafeteriaPlanta.png'){//SALIR DE CAFETERIA
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosRecepcion.jpg', text: 'Regresar', title: 'Recepción de Cursos' },
        ];
    }else if (sceneURL === '../Img/auditorioPlanta.png'){//SALIR DE AUDITORIO
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosRecepcion.jpg', text: 'Regresar', title: 'Recepción de Cursos' },
        ];
    }else if (sceneURL === '../Img/bibliotecaPlanta.png'){//SALA DE BIBLIOTECA PARA ENTRAR A OTRAS DOS SALAS
        sceneHotspots = [
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/RecervoriosSala.jpg', text: 'Entrar a Recervorios', title: 'Recervorios' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/centroComputoSala.jpg', text: 'Entrar a Centro de computo', title: 'Centro de computo' },
        ];
    }else if (sceneURL === '../Img/RecervoriosSala.jpg'){//SALIR DE LA SALA DE RESERVORIOS
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/bibliotecaPlanta.png', text: 'Regresar', title: 'Biblioteca' },
        ];
    }else if(sceneURL === '../Img/centroComputoSala.jpg'){//SALIR DE LA SALA DE COMPUTO
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/bibliotecaPlanta.png', text: 'Regresar', title: 'Biblioteca' },
        ];
    }
    // Oficina de REDESLA
    else if(sceneURL === '../Img/redeslaOficinas.jpg'){//RECEPCION DE LAS OFICINAS DE REDESLA
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Regresar', title: 'Campus de la Institución' },
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/elevadorREDESLA.jpeg', text: 'Entrar al elevador', title: 'Elevador REDESLA' },
        ]; 
    }else if(sceneURL === '../Img/elevadorREDESLA.jpeg'){//ELEAVDOR DE LAS OFICINAS DE REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloAtencionREDESLA.jpg', text: 'Entrar a Atención', title: 'Pasillo de Atención REDESLA' },
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloSalaREDESLA.jpg', text: 'Entrar a Sala de reuniones', title: 'Pasillo de Sala de reuniones REDESLA' },
            { position: { x: 3000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloDireccionREDESLA.jpg', text: 'Entrar a Dirección', title: 'Pasillo de Dirección REDESLA' },

            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/redeslaOficinas.jpg', text: 'Regresar', title: 'Oficina REDESLA' },
        ]; 
    }else if(sceneURL === '../Img/pasilloAtencionREDESLA.jpg'){//PASILLO ATENCION REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/AtencionREDESLA.jpg', text: 'Entrar a Atención', title: 'Atención REDESLA' },
            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorREDESLA.jpeg', text: 'Regresar', title: 'Elevador REDESLA' },
        ]; 
    }else if(sceneURL === '../Img/pasilloSalaREDESLA.jpg'){//PASILLO SALA DE REUNIONES REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/ReuinionesREDESLA.jpg', text: 'Entrar a Sala de reuniones', title: 'Sala de reuniones REDESLA' },
            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorREDESLA.jpeg', text: 'Regresar', title: 'Elevador REDESLA' },
        ]; 
    }else if(sceneURL === '../Img/pasilloDireccionREDESLA.jpg'){//PASILLO DIRECCION REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/DireccionREDESLA.jpg', text: 'Entrar a Dirección', title: 'Dirección REDESLA' },
            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/elevadorREDESLA.jpeg', text: 'Regresar', title: 'Elevador REDESLA' },
        ]; 
    }
    // CENTRO DE INVESTIGACION REDESLA
    else if(sceneURL == '../Img/CIROficinas.jpg'){//RECEPCION CENTRO DE INVESTIGACIONES REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloOrgulloRDLA.jpg', text: 'Entrar al pasillo', title: 'Pasillo "Orgullo REDESLA"' },
            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Regresar', title: 'Campus de la Institución' },
        ];
    }else if(sceneURL == '../Img/pasilloOrgulloRDLA.jpg'){//PASILLO DEL ORGULLO REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/elevadorOrgulloRDLA.jpeg', text: 'Entrar elevador', title: 'Elevador de "Orgullo REDESLA"' },
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/salaOrgulloRDLA.jpg', text: 'Entrar a "Orgullo REDESLA"', title: 'Sala de "Orgullo REDESLA"' },
            // Hotspot para regresar
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/CIROficinas.jpg', text: 'Regresar', title: 'Centro de Investigación REDESLA' },
        ];
    }else if (sceneURL === '../Img/salaOrgulloRDLA.jpg'){//SALA DEL ORGULLO REDESLA
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloOrgulloRDLA.jpg', text: 'Regresar', title: 'Pasillo "Orgullo REDESLA"' },
        ];
    }else if (sceneURL === '../Img/elevadorOrgulloRDLA.jpeg'){//ELEVADOR ORGULLORDLA
        sceneHotspots = [
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloEstudiosCientificos.jpg', text: 'Piso 2 - Aulas de estudios científicos', title: 'Aulas de estudios científicos' },
            // Hotspot para regresar
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/CIROficinas.jpg', text: 'Piso 1 - Recepción', title: 'Centro de Investigación REDESLA' },
        ];
    }else if (sceneURL === '../Img/pasilloEstudiosCientificos.jpg'){//PASILO ORGULLO REDESLA
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RelenEstudiosCientificos.jpg', text: 'Entrar a Estudios cientificos Relen', title: 'Aulas de estudios cientificos Relen' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/RelepEstudiosCientificos.jpg', text: 'Entrar a Estudios cientificos Relep', title: 'Aulas de estudios cientificos Relep' },
            { position: { x: 3000, y: 1000, z: -5000 }, sceneURL: '../Img/RelaynEstudiosCientificos.jpg', text: 'Entrar a Estudios cientificos Relayn', title: 'Aulas de estudios cientificos Relayn' },
            { position: { x: 4000, y: 1000, z: -5000 }, sceneURL: '../Img/RelegEstudiosCientificos.jpg', text: 'Entrar a Estudios cientificos Releg', title: 'Aulas de estudios cientificos Releg' },

            // Hotspot para regresar
            { position: { x: 2000, y: -1000, z: -5000 }, sceneURL: '../Img/elevadorOrgulloRDLA.jpeg', text: 'Regresar al elevador', title: 'Elevador de "Orgullo REDESLA"' },
        ];
    }else if (sceneURL === '../Img/RelenEstudiosCientificos.jpg'){//Relen
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloEstudiosCientificos.jpg', text: 'Regresar', title: 'Aulas de estudios científicos' },
        ];
    }else if (sceneURL === '../Img/RelepEstudiosCientificos.jpg'){//Relep
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloEstudiosCientificos.jpg', text: 'Regresar', title: 'Aulas de estudios científicos' },
        ];
    }else if (sceneURL === '../Img/RelaynEstudiosCientificos.jpg'){//Relayn
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloEstudiosCientificos.jpg', text: 'Regresar', title: 'Aulas de estudios científicos' },
        ];
    }else if (sceneURL === '../Img/RelegEstudiosCientificos.jpg'){//Releg
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/pasilloEstudiosCientificos.jpg', text: 'Regresar', title: 'Aulas de estudios científicos' },
        ];
    }else if (sceneURL === '../Img/congresosOficinas.jpg'){
        sceneHotspots = [
            // Hotspot para regresar
            { position: { x: 6000, y: 1000, z: -5000 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Regresar', title: 'Campus de la Institución' },
        ];
    }

    return sceneHotspots.map(hotspot => createSceneHotspot(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}
// Fin

// Función para crear hotspots de caminata específicos para una escena
function createWalkHotspotsForScene(sceneURL) {
    let walkHotspots = [];

    if (sceneURL === '../Img/salones.png') {
        walkHotspots = [
            { position: { x: 7000, y: 1000, z: -5000 }, text: 'Avanzar hacia adelante' },
        ];
    } else if (sceneURL === '../Img/otra_escena.png') {
        walkHotspots = [
            { position: { x: 6000, y: 1200, z: -5000 }, text: 'Avanzar en la otra dirección' },
        ];
    }

    return walkHotspots.map(hotspot => createWalkHotspot(hotspot.position, hotspot.direction, hotspot.text));
}
// Fin

// Vista del menú principal
function initializeMainPanorama() {
    panorama = new PANOLENS.ImagePanorama('../Img/PanoramaInterior.png');
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

    const initialWalkHotspots = createWalkHotspotsForScene(panorama.src);
    initialWalkHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialPageHotspots = createPageHotspotsForScene(panorama.src);
    initialPageHotspots.forEach(hotspot => panorama.add(hotspot));

    const initialLoginHotspots = createLoginHotspotsForScene(panorama.src);
    initialLoginHotspots.forEach(hotspot => panorama.add(hotspot));
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