function closeInfoModalLeft() {
    $('#infoModalLeft').modal('hide');
}

function openInfoModalLeft(title, fileUrl, description) {
    const container = $('#modal-content-container');
    container.empty(); // Limpiar contenido previo

    console.log('File URL:', fileUrl); // Verifica la URL

    // Convertir URL corta de YouTube al formato de embed
    if (fileUrl.includes('youtu.be')) {
        const videoId = fileUrl.split('youtu.be/')[1];
        fileUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (fileUrl.includes('youtube.com/watch?v=')) {
        const videoId = fileUrl.split('watch?v=')[1];
        fileUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // Manejo de URL de YouTube en formato embed
    if (fileUrl.includes('youtube.com/embed/')) {
        container.html(`<iframe width="100%" height="315" src="${fileUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    } else {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();

        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
                container.html(`<img src="${fileUrl}" alt="Image" style="width: 100%;">`);
                break;
            case 'pdf':
                container.html(`<embed src="${fileUrl}" type="application/pdf" width="100%" height="600px">`);
                break;
            case 'doc':
            case 'docx':
                container.html(`<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}" width="100%" height="600px"></iframe>`);
                break;
            case 'mp4':
            case 'webm':
                container.html(`<video controls width="100%" height="auto"><source src="${fileUrl}" type="video/${fileExtension}">Your browser does not support the video tag.</video>`);
                break;
            default:
                container.html('<p>Tipo de contenido no soportado.</p>');
        }
    }

    $('#infoModalLeft .modal-title').text(title);
    $('#infoModalLeft').modal('show');
}
