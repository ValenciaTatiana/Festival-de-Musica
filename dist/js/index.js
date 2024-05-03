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
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    // Generar modal
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.onclick = cerrarModal;

    // Btn cerrar modal
    const btnCerrarModal = document.createElement("BUTTON");
    btnCerrarModal.textContent = "X";
    btnCerrarModal.classList.add("btn-cerrar");
    modal.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(btnCerrarModal);

    // Agg al HTML
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden")
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector(".modal");
    modal.classList.add("fade-out");

    setTimeout(() => {
        modal?.remove(); // Esto significa que si modal existe, se remueva.

        const body = document.querySelector("body");
        body.classList.remove("overflow-hidden")
    }, 500)
}