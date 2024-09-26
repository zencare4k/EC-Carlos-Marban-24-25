// Seleccionamos todos los divs con la clase 'contenedor'
const contenedores = document.querySelectorAll('.contenedor');

// Iteramos sobre cada div para agregar los eventos de mouseover y mouseout
contenedores.forEach(function(contenedor) {
    contenedor.addEventListener('mouseover', function() {
        contenedor.style.backgroundColor = 'blue'; // Cambia el fondo a azul
        contenedor.style.color = 'white'; // Cambia el texto a blanco
    });

    contenedor.addEventListener('mouseout', function() {
        contenedor.style.backgroundColor = 'white'; // Restaura el fondo a blanco
        contenedor.style.color = 'black'; // Restaura el texto a negro
    });
});
