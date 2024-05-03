// Evento para que una vez el HTML este cargado se llame a la función crearGaleria()
document.addEventListener('DOMContentLoaded', function () {
    crearGaleria();
})

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    const cantidadImagenes = 16;

    for (let i = 1; i <= cantidadImagenes; i++) {
        // Creación de un elemento HTML
        const imagen = document.createElement("IMG");
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galeria';

        galeria.appendChild(imagen)

        // Event Handler: Proceso de detectar y responder a un evento o interacción del usuario
        imagen.onclick = function () {
            mostrarModalImagenes(i)
        }
    }
}

function mostrarModalImagenes(i) {
    // Generar modal
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.onclick = cerrarModal;

    // Agg al HTML
    const body = document.querySelector("body");
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector(".modal");

    modal?.remove(); // Esto significa que si modal existe, se remueva.
}