const contenedores = document.querySelectorAll('.contenedor');

contenedores.forEach(function(contenedor) {
    contenedor.addEventListener('mouseover', function() {
        contenedor.style.backgroundColor = 'blue'; /
        contenedor.style.color = 'white'; 
    });

    contenedor.addEventListener('mouseout', function() {
        contenedor.style.backgroundColor = 'white'; // Restaura el fondo a blanco
        contenedor.style.color = 'black'; // Restaura el texto a negro
    });
});
