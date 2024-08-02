//Validacion del avatar del genero
document.addEventListener('DOMContentLoaded', function() {
    const maleAvatar = '../Img/Gifs/AvatarMasculino.gif';
    const femaleAvatar = '../Img/Gifs/AvatarFemenino.gif';
    const noAvatar = '../Img/Gifs/NoImage.png';

    const avatarImage = document.getElementById('avatar-image');
    const selectedGender = localStorage.getItem('selectedGender');

    // Validar y establecer la imagen del avatar
    if (selectedGender === 'masculino') {
        avatarImage.src = maleAvatar;
    } else if (selectedGender === 'femenino') {
        avatarImage.src = femaleAvatar;
    } else {
        avatarImage.src = noAvatar;
    }
});


// Validacion si no existe un genero seleccionado vuelve al recorrido virtual
window.addEventListener('DOMContentLoaded', (event) => {
    const selectedGender = localStorage.getItem('selectedGender');

    if (!selectedGender) {
        window.location.href = '../index.html';
    }
});