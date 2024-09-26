// Función para generar un color RGB aleatorio
function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Valor de 0 a 255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`; // Devuelve un string de color RGB
}

// Seleccionar el botón y agregar un evento de clic
const button = document.getElementById('changeColorButton');
button.addEventListener('click', function() {
    // Cambiar el color del fondo del cuerpo de la página
    document.body.style.backgroundColor = getRandomColor();
});
