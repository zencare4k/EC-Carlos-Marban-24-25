HEAD
const contenedores = document.querySelectorAll('.contenedor');

contenedores.forEach(function(contenedor) {
    contenedor.addEventListener('mouseover', function() {
        contenedor.style.backgroundColor = 'blue'; 
        contenedor.style.color = 'white'; 
function dinamicstyle() {
    let div1 = document.getElementById('div1');
    let div2 = document.getElementById('div2');

    div1.addEventListener('mouseover', function() {
        div1.style.backgroundColor = 'blue';
        div1.style.color = 'white';
    });
    div1.addEventListener('mouseout', function() {
        div1.style.backgroundColor = 'white';
        div1.style.color = 'black';


    });

    div2.addEventListener('mouseover', function() {
        div2.style.backgroundColor = 'blue';
        div2.style.color = 'white';

    });
    div2.addEventListener('mouseout', function() {
        div2.style.backgroundColor = 'white';
        div2.style.color = 'black';
    });
}
dinamicstyle();