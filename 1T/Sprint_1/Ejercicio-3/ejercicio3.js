<<<<<<< HEAD
function addlist() {
    const newelement = document.getElementById("addlist").value;

    if (newelement == "") {
        alert("Escriba algo en el cuadro de texto makinon");
        return;
    }

    const newLi = document.createElement("li");

    newLi.textcontent = newelement

    document.getElementById("addlist")


}
=======
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
>>>>>>> 60849502786400672ffe1f4322a21eeabc8c45ed
