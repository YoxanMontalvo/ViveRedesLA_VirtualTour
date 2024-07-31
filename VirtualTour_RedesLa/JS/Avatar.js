//Validacion del avatar del genero
document.addEventListener('DOMContentLoaded', function() {
    // Rutas de las imágenes de los avatares
    const maleAvatar = '../Img/Gifs/AvatarMasculino.gif';
    const femaleAvatar = '../Img/Gifs/AvatarFemenino.gif';
    const noAvatar = '../Img/Gifs/NoImage.png';

    // Obtener el contenedor y la imagen del avatar
    const avatarImage = document.getElementById('avatar-image');

    // Obtener el valor de selectedGender desde localStorage
    const selectedGender = localStorage.getItem('selectedGender');

    // Validar y establecer la imagen del avatar
    if (selectedGender === 'male') {
        avatarImage.src = maleAvatar;
    } else if (selectedGender === 'female') {
        avatarImage.src = femaleAvatar;
    } else {
        avatarImage.src = noAvatar;
    }
});