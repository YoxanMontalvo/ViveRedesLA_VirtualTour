//Validacion del avatar del genero
document.addEventListener('DOMContentLoaded', function() {
    const maleAvatar = `${base_url}resources/img/gifs/AvatarMasculino.gif`;
    const femaleAvatar = `${base_url}resources/img/gifs/AvatarFemenino.gif`;
    const noAvatar = `${base_url}resources/img/gifs/NoImage.png`;

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