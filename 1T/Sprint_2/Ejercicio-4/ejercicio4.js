// Variables para controlar el tiempo
let horas = 0;
let minutos = 0;
let segundos = 0;
let intervalo = null;
let enMarcha = false; // Estado para controlar si el cronómetro está corriendo

// Referencias a los elementos del DOM
const tiempoDisplay = document.getElementById("tiempo");
const btnIniciar = document.getElementById("iniciar");
const btnPausar = document.getElementById("pausar");
const btnReiniciar = document.getElementById("reiniciar");

// Función para actualizar la visualización del tiempo
function actualizarDisplay() {
    let horasStr = horas < 10 ? `0${horas}` : horas;
    let minutosStr = minutos < 10 ? `0${minutos}` : minutos;
    let segundosStr = segundos < 10 ? `0${segundos}` : segundos;
    tiempoDisplay.textContent = `${horasStr}:${minutosStr}:${segundosStr}`;
}

// Función para iniciar el cronómetro
function iniciarCronometro() {
    if (!enMarcha) { // Solo iniciamos si no está ya corriendo
        enMarcha = true;
        intervalo = setInterval(() => {
            segundos++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
            }
            if (minutos === 60) {
                minutos = 0;
                horas++;
            }
            actualizarDisplay();
        }, 1000);
    }
}

// Función para pausar el cronómetro
function pausarCronometro() {
    if (enMarcha) {
        enMarcha = false;
        clearInterval(intervalo);
    }
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    clearInterval(intervalo);
    horas = 0;
    minutos = 0;
    segundos = 0;
    enMarcha = false;
    actualizarDisplay();
}

// Eventos para los botones
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnReiniciar.addEventListener("click", reiniciarCronometro);
