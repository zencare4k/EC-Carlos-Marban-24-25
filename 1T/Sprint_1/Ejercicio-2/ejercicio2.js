function arearectangulo(ancho, alto) {
    const area = ancho * alto;
    return area;
}

document.getElementById("calcularArea").addEventListener("click", function() {
    const ancho = document.getElementById("ancho").value;
    const alto = document.getElementById("alto").value;

    if (ancho && alto && ancho > 0 && alto > 0) {
        const resultado = arearectangulo(ancho, alto);
        document.getElementById("resultado").innerText = resultado;
    } else {
        document.getElementById("resultado").innerText = "Por favor, introduce valores válidos para el ancho y el alto.";
    }
});