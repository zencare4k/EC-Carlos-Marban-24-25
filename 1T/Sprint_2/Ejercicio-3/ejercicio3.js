// Inicializar los contadores de votos
const votes = {
    rojo: 0,
    azul: 0,
    verde: 0,
    amarillo: 0
};

// Detectar el botón "Enviar"
document.getElementById("submit").addEventListener("click", function() {
    // Obtener la opción seleccionada
    const selectedColor = document.querySelector('input[name="color"]:checked');
    if (selectedColor) {
        const color = selectedColor.value;
        
        // Actualizar el voto
        votes[color]++;
        
        // Actualizar el gráfico
        updateChart();
    } else {
        alert("Por favor, seleccione un color antes de enviar.");
    }
});

// Función para actualizar el gráfico
function updateChart() {
    // Máximo número de votos
    const maxVotes = Math.max(...Object.values(votes));

    // Actualizar cada barra y el número de votos
    for (const color in votes) {
        const count = votes[color];
        const bar = document.querySelector(`.${color}-bar`);
        const countElement = document.querySelector(`.${color}-count`);
        
        // Ajustar el ancho de la barra en función del porcentaje
        const barWidth = maxVotes === 0 ? 0 : (count / maxVotes) * 100;
        bar.style.width = `${barWidth}%`;
        
        // Actualizar el contador de votos
        countElement.textContent = count;
    }
}
