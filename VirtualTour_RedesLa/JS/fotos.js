"use strict";

$(document).ready(() => {
  $("#anotherTake").hide()
  $("#savePhoto").hide()
})

//capturar video ó imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

//constrains
/*
Aquí enviamos las caracteristicas del video y
audio que solicitamos
*/

const widthCamera = 916
const heightCamera = 520;

const constraints = {
  video: { width: widthCamera, height: heightCamera },
  audio: false,
};


//acceso a la webcam
/*
Aquí recibimos la respuesta del navegador, es una promesa
 */
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    $('#cameraModal').modal('hide');
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo acceder a la cámara. Por favor, otorga los permisos necesarios al navegador.',
    });
    console.log(error);
  }
};

//3. -----------> si la promesa tiene exito
const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

//4.------------>Llamada a la función get

$(document).on('show.bs.modal','#cameraModal', function () {
  getVideo();
});

const frame = new Image();
frame.src = '../Img/marcos/marco.png'; // asegúrate de que la ruta a tu marco PNG sea correcta



//4. ----------> Button y foto

/* 
//SOLO FOTO
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 420, 340);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}); */

/* 
//FOTO CON FONDO PNG
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");

  // primero dibuja la imagen del video
  context.drawImage(video, 0, 0, 420, 340);

  // luego dibuja el marco sobre la imagen del video
  frame.onload = () => {
    context.drawImage(frame, 0, 0, 420, 340);
    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  };

  // en caso de que el marco ya esté cargado, dibújalo de inmediato
  if (frame.complete) {
    context.drawImage(frame, 0, 0, 420, 340);
    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }
}); */










// coordenadas y tamaño para colocar la imagen capturada dentro del marco
const targetX = 260;  // X-coordinate where the captured image will be placed
const targetY = 144;  // Y-coordinate where the captured image will be placed
const targetWidth = 400;  // Width of the captured image
const targetHeight = 235; // Height of the captured image

canvas.width = widthCamera;
canvas.height = heightCamera;


// button y foto
button.addEventListener("click", () => {
  playCameraSound()
  let context = canvas.getContext("2d");

  // primero dibuja el marco
  frame.onload = () => {
    context.drawImage(frame, 0, 0, widthCamera, heightCamera);

    // luego dibuja la imagen del video dentro del marco
    context.drawImage(video, targetX, targetY, targetWidth, targetHeight);

    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  };

  // en caso de que el marco ya esté cargado, dibújalo de inmediato
  if (frame.complete) {
    context.drawImage(frame, 0, 0, widthCamera, heightCamera);
    context.drawImage(video, targetX, targetY, targetWidth, targetHeight);

    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  $(".video-wrap").hide()
  $(".canvas").width(widthCamera)
  $(".canvas").height(heightCamera)
  $("#anotherTake").show()
  $("#savePhoto").show()
  $(".start-btn").hide()
  $(".canvas-wrap").show()

});

const cameraSound = new Audio('../Music/sonidos/camara.mp3');
function playCameraSound() {
  cameraSound.play();
}

$("#anotherTake").on('click', () => {
  $("#anotherTake").hide()
  $("#savePhoto").hide()
  $(".start-btn").show()
  $(".video-wrap").show()
  $(".canvas-wrap").hide()
})

$("#savePhoto").on('click', () => {
  let data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = data;
  link.download = "Fotografia Congreso VIVE REDESLA.png";
  link.click();
})