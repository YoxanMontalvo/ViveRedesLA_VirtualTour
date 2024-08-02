//////////////////////// Todas las funciones fuera de los hotspot //////////////
// Este sonido se debe de utilizar en todos los paneles y modales del recorrido
const soundGlobal = new Audio('../Music/sonidos/PanelSound.mp3');
window.panelGlobalSound = function() {
    soundGlobal.play();
};
// Fin

// Musica del elevador
const elevatorMusic = new Audio('../Music/sonidos/RelaxSong.mp3');

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
        sceneURL: currentScene ? currentScene : '../Img/Exterior/EntradaViveRedesla.jpg',
        sceneTitle: currentSceneTitle ? currentSceneTitle : 'Entrada de Vive RedesLA'
    };
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
function setHotspotPuerta(sceneURL) {
    let sceneHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === '../Img/Exterior/EntradaViveRedesla.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 8000, y: -400, z: 100 }, sceneURL: '../Img/Exterior/CurcePatioCongreso.jpg', text: 'Ingresar a las instalaciones', title: 'Edificios de RedesLA' },
        ];
    }else if (sceneURL === '../Img/Exterior/CurcePatioCongreso.jpg') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: -7000, y: 100, z: 100 }, sceneURL: '../Img/Exterior/EntradaViveRedesla.jpg', text: 'Salir de la institución', title: 'Entrada de Vive RedesLA' },
        ];
    }



    // Pagina principal
    else if (sceneURL === '../Img/PanoramaInterior.png') {// Pagina principal con sus hotspot
        sceneHotspots = [
            { position: { x: 1000, y: 1000, z: -5000 }, sceneURL: '../Img/RedesSalones.png', text: 'Entrar a Oficinas', title: 'Oficinas' },
            { position: { x: 2000, y: 1000, z: -5000 }, sceneURL: '../Img/cursosOficinas.jpg', text: 'Entrar a Cursos', title: 'Recepción de Cursos' },
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
            { position: { x: 1000, y: -1000, z: -5000 }, sceneURL: '../Img/cursosRecepcion.jpg', text: 'Regresar', title: 'Cursos' },
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
    }

    return sceneHotspots.map(hotspot => createHotspotPuerta(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createHotspotPuerta(position, sceneURL, text, title) {
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
            // Importante: Si se crea una nueva variante de un algun hotspot, siempre agregarlo tambien aqui asi como los demas, ya que cuando se cambie de escena y se regrese no aparecera
            const newLoginHotspot = setLoginHotspots(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot));

            const newInfoHotspots = setConversationHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newSceneHotspots = setHotspotPuerta(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newWalkHotspots = setWalkHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newPageHotspots = createPageHotspotsForScene(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newArcadeHotspot = setArcadeHotspots(sceneURL);
            newArcadeHotspot.forEach(hotspot => newPanorama.add(hotspot));

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

const doorHotspotSound = new Audio('../Music/sonidos/door.mp3');
function playDoorSoundSceneChange() {
    doorHotspotSound.play();
}
/* FIN */


/* CAMINAR */
function setWalkHotspots(sceneURL) {
    let walkHotspots = [];

    //Pagina de inicio del recorrido
    if (sceneURL === '../Img/Exterior/CurcePatioCongreso.jpg') {// Pagina principal con sus hotspot
        walkHotspots = [
            { position: { x: 8000, y: -400, z: 100 }, sceneURL: '../Img/Exterior/PatioCongreso.jpg', text: 'Avanzar al congreso', title: 'Edificio del congreso' },
            { position: { x: 92.81, y: -67.12, z: 4992.50 }, sceneURL: '../Img/PanoramaInterior.png', text: 'Avanzar a los salones', title: 'Salones de las Redes' },
        ];
    } else if (sceneURL === '../Img/Exterior/PatioCongreso.jpg') {
        walkHotspots = [
            { position: { x: -4984.35, y: -173.67, z: -168.41 }, sceneURL: '../Img/Exterior/CurcePatioCongreso.jpg', text: 'Regresar al cruce', title: 'Edificio del congreso' },
        ];
    }

    return walkHotspots.map(hotspot => createHotspotCaminar(hotspot.position, hotspot.sceneURL, hotspot.text, hotspot.title));
}

function createHotspotCaminar(position, sceneURL, text, title) {
    // Obtener el género del localStorage
    const selectedGender = localStorage.getItem('selectedGender');
    let walkIcon = PANOLENS.DataImage.WalkIcon
    let walkSoundPath = '../Music/sonidos/walk.mp3';

    if (selectedGender === 'femenino') {
        walkIcon = PANOLENS.DataImage.WomenShoes;
        walkSoundPath = '../Music/sonidos/WomenWalkingSound.mp3';
    } else if (selectedGender === 'masculino') {
        walkIcon = PANOLENS.DataImage.MenShoes;
        walkSoundPath = '../Music/sonidos/MenWalkingSound.mp3';
    }

    const walkHotspotSound = new Audio(walkSoundPath);

    const sceneHotspot = new PANOLENS.Infospot(300, walkIcon);
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
        walkHotspotSound.play();
        musicElevator(sceneURL); // Música del elevador

        const newPanorama = new PANOLENS.ImagePanorama(sceneURL);

        newPanorama.addEventListener('load', () => {
            clearCurrentHotspots();
            updateSceneTitle(title);

            // Importante: Si se crea una nueva variante de un algún hotspot, siempre agregarlo también aquí así como los demás, ya que cuando se cambie de escena y se regrese no aparecerá
            const newLoginHotspot = setLoginHotspots(sceneURL);
            newLoginHotspot.forEach(hotspot => newPanorama.add(hotspot));

            const newInfoHotspots = setConversationHotspots(sceneURL);
            newInfoHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newSceneHotspots = setHotspotPuerta(sceneURL);
            newSceneHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newWalkHotspots = setWalkHotspots(sceneURL);
            newWalkHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newPageHotspots = createPageHotspotsForScene(sceneURL);
            newPageHotspots.forEach(hotspot => newPanorama.add(hotspot));

            const newArcadeHotspot = setArcadeHotspots(sceneURL);
            newArcadeHotspot.forEach(hotspot => newPanorama.add(hotspot));

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


/* LOGIN */
function createHotspotLogin(position) {
    const hotspot = new PANOLENS.Infospot(350, PANOLENS.DataImage.LoginIcon);
    hotspot.position.set(position.x, position.y, position.z);
    animateHotspot(hotspot);

    // Crear elemento de texto para el hotspot
    const hotspotText = document.createElement('div');
    hotspotText.classList.add('hotspot-text');
    hotspotText.textContent = 'Entrar al congreso';
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
        playLoginSound();
        $('#loginModal').modal('show');
        
    });

    document.getElementById('container').appendChild(hotspotText);
    return hotspot;
}

function setLoginHotspots(sceneURL) {
    let loginHotspots = [];

    if (sceneURL === '../Img/PanoramaInterior.png') {
        loginHotspots = [
            { position: { x: 3000, y: 1000, z: -5000 }}
        ];
    }else if (sceneURL === '../Img/Exterior/PatioCongreso.jpg') {
        loginHotspots = [
            { position: { x: 6000, y: 1000, z: -1100 }}
        ];
    }

    return loginHotspots.map(hotspot => createHotspotLogin(hotspot.position));
}

// Reproducir el sonido al abrir el modal de inicio de sesion
const LoginSound = new Audio('../Music/sonidos/SoundLogin.mp3');
function playLoginSound() {
    LoginSound.play();
}
/* FIN */


/* CONVERSACIÓN */
// Variable para almacenar el sonido
let typingSound = new Audio('../Music/sonidos/TalkingSound.mp3');

// Función para crear un hotspot de conversación
function createHotspotConversation(position, text, title, image, description) {
    let infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Conversation);
    infospot.position.set(position.x, position.y, position.z);
    infospot.addHoverElement(document.querySelector('#panel'), 165);
    animateHotspot(infospot);

    // Mostrar panel
    infospot.addEventListener('hoverenter', function() {
        document.querySelector('#panel').classList.add('show');
        document.querySelector('#panel h1').textContent = title;
        document.querySelector('#panel p').textContent = '';

        // Iniciar el efecto de máquina de escribir
        conversacionEfecto(document.querySelector('#panel p'), description, 50);
    });

    // Cerrar panel
    infospot.addEventListener('hoverleave', function() {
        document.querySelector('#panel').classList.remove('show');
        // Limpiar el texto y el timeout si es necesario
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            document.querySelector('#panel p').textContent = '';
        }
        // Detener el sonido de tecleo
        typingSound.pause();
        typingSound.currentTime = 0; // Reiniciar el sonido
    });
    return infospot;
}

// Función para establecer los hotspots de conversación
function setConversationHotspots(sceneURL) {
    let infoHotspots = [];

    if (sceneURL === '../Img/PanoramaInterior.png') {
        infoHotspots = [
            { position: { x: -1000, y: 1000, z: -5000 }, text: 'Bienvenido a REDESLA', title: 'Vive RedesLa', image: '../Icons/CursosImage.png', description: 'Este recorrido virtual trata de trasmitir la mayor inmersión posible, y así usted pueda vivir la experiencia RedesLA desde la comodidad de su hogar' },
        ];
    }

    return infoHotspots.map(hotspot => createHotspotConversation(hotspot.position, hotspot.text, hotspot.title, hotspot.image, hotspot.description));
}

// Efecto de máquina de escribir
let typingTimeout;
function conversacionEfecto(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ''; // Limpiar el contenido existente

    // Iniciar el sonido de tecleo
    typingSound.play();
    typingSound.loop = true;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        } else {
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) {
                callback();
            }
        }
    }

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    type();
}
/* FIN */


/* CAMBIAR PAGINA */
function createPageHotspot(position, pageURL, text, title) {
    const pageHotspot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Walker);
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
        console.log('Hotspot clickeado, redirigiendo a:', pageURL);
        saveCurrentScene(panorama.src); // Guardar la escena actual antes de cambiar de página
        window.location.href = pageURL; // Redirige a la URL especificada
    });

    // Agregar el elemento de texto al contenedor
    document.getElementById('container').appendChild(hotspotText);

    return pageHotspot;
}

function createPageHotspotsForScene(sceneURL) {
    let pageHotspots = [];

    if (sceneURL === '../Img/auditorioPlanta.png') { // Ejemplo de una escena
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

    if (sceneURL === '../Img/cafeteriaPlanta.png') {
        arcadeHotspots = [
            { position: { x: 3000, y: 1000, z: -5000 }, game: 'SpaceWord', description: 'Resuelve las palabras ocultas', image: '../Img/AtencionREDESLA.jpg' },
            { position: { x: -2000, y: 500, z: -4000 }, game: 'Memorama', description: 'Encuentra los pares de cartas', image: '../Img/AtencionREDESLA.jpg' },
            { position: { x: 1000, y: 0, z: -3000 }, game: 'HangMan', description: 'Acierta la palabra antes de que se termine el tiempo', image: '../Img/AtencionREDESLA.jpg' },
            { position: { x: 500, y: -500, z: -2000 }, game: 'Snake', description: 'Guía la serpiente para que coma sin chocar', image: '../Img/AtencionREDESLA.jpg' }
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
// Cargar juegos en el modal
function loadGame(game) {
    let gameContainer = document.getElementById('game-container');
    switch (game) {
        case 'SpaceWord':
            gameContainer.innerHTML = '<iframe src="../GameZone/SpaceWord/HTML/Index.html" width="100%" height="100%"></iframe>';
            break;
        case 'Memorama':
            gameContainer.innerHTML = '<iframe src="../GameZone/Memoria/Index.html" width="100%" height="100%"></iframe>';
            break;
        case 'HangMan':
            gameContainer.innerHTML = '<iframe src="../GameZone/HangmanGame/Index.html" width="100%" height="100%"></iframe>';
            break;
        case 'Snake':
            gameContainer.innerHTML = '<iframe src="../GameZone/Snake/HTML/Index.html" width="100%" height="100%"></iframe>';
            break;
        default:
            gameContainer.innerHTML = 'Juego no encontrado';
    }
}
// Reproducir el sonido al abrir el juego para usarlo
const ArcadeSound = new Audio('../Music/sonidos/ArcadeSound2.mp3');
function playArcadeSound() {
    ArcadeSound.play();
}
/* FIN */

/* ============================================================================= */

//////////////////////// Inicialización de los hotspot y escenas ////////////////////////
function initializeMainPanorama() {
    panorama = new PANOLENS.ImagePanorama('../Img/Exterior/EntradaViveRedesla.jpg');
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

// INICIALIZAR HOTSPOTS
function addInitialHotspots() {
    // Informacion
    const initialInfoHotspots = setConversationHotspots(panorama.src);
    initialInfoHotspots.forEach(hotspot => panorama.add(hotspot));

    // Cambio escena
    const initialSceneHotspots = setHotspotPuerta(panorama.src);
    initialSceneHotspots.forEach(hotspot => panorama.add(hotspot));

    // Caminar
    const initialWalkHotspots = setWalkHotspots(panorama.src);
    initialWalkHotspots.forEach(hotspot => panorama.add(hotspot));

    // Links
    const initialPageHotspots = createPageHotspotsForScene(panorama.src);
    initialPageHotspots.forEach(hotspot => panorama.add(hotspot));

    // Login
    const initialLoginHotspots = setLoginHotspots(panorama.src);
    initialLoginHotspots.forEach(hotspot => panorama.add(hotspot));

    // Arcade
    const initialArcadeHotspots = setArcadeHotspots(panorama.src);
    initialArcadeHotspots.forEach(hotspot => panorama.add(hotspot));
}

// Vista del menú principal
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ container: container, output: 'console' });
initializePanorama();
//////////////////////// Fin //////////////