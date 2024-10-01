function agregarli() {
    let nuevoli = document.createElement('li');
    
    let contenidoInput = document.getElementById('inputItem').value;
    
if (contenidoInput == "") {
 alert('No hay nada escrito')
} else {
    nuevoli.textContent = contenidoInput;

    let lista = document.getElementById('itemList'); // Corrige el id
    lista.appendChild(nuevoli);

    document.getElementById('inputItem').value = '';
}
}

// Asignar el evento click al botón
let boton = document.getElementById('addButton');
boton.addEventListener('click', agregarli);
