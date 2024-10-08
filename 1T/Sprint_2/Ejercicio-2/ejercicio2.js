// Obtener referencias a los elementos del DOM
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultado = document.getElementById("resultado");
const calcular = document.getElementById("calcular");

let operacion = ""; // Variable para almacenar la operación seleccionada

// Función para validar si los campos están vacíos
function validarEntradas() {
    if (num1.value === "" || num2.value === "") {
        alert("Por favor, complete ambos campos.");
        return false;
    }
    return true;
}

// Asignar la operación según el botón que se presione
document.getElementById("sumar").addEventListener("click", function() {
    operacion = "sumar";
});

document.getElementById("restar").addEventListener("click", function() {
    operacion = "restar";
});

document.getElementById("multiplicar").addEventListener("click", function() {
    operacion = "multiplicar";
});

document.getElementById("dividir").addEventListener("click", function() {
    operacion = "dividir";
});

// Función para realizar el cálculo basado en la operación seleccionada
function realizarOperacion() {
    if (!validarEntradas()) return; // Si los campos están vacíos, se detiene la ejecución

    const numero1 = parseFloat(num1.value);
    const numero2 = parseFloat(num2.value);
    let res;

    switch (operacion) {
        case "sumar":
            res = numero1 + numero2;
            break;
        case "restar":
            res = numero1 - numero2;
            break;
        case "multiplicar":
            res = numero1 * numero2;
            break;
        case "dividir":
            if (numero2 === 0) {
                alert("INDEFINIDO");
                return; // Salir de la función si hay división por 0
            }
            res = numero1 / numero2;
            break;
        default:
            alert("Por favor, seleccione una operación.");
            return; // Salir si no hay operación seleccionada
    }

    // Mostrar el resultado en el párrafo
    resultado.textContent = `El resultado es: ${res}`;
}

// Asociar el evento click del botón de calcular a la función realizarOperacion
calcular.addEventListener("click", realizarOperacion);
