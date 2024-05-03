// Evento para que una vez el HTML este cargado se llame a la función crearGaleria()
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
})

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    const cantidadImagenes = 16;

    for(let i = 1; i <= cantidadImagenes; i++) {
    // Creación de un elemento HTML
    const imagenes = document.createElement("IMG");
    imagenes.src = `src/img/gallery/full/${i}.jpg`;
    imagenes.alt = 'Imagen Galeria';
    
    galeria.appendChild(imagenes)
    }
}