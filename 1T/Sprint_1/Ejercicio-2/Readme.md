# Ejercicio 2 

## Análisis del problema 

- Diseña una página web con dos campos de entrada (input) para introducir el ancho y el alto de un rectángulo.

- Agrega un botón etiquetado "Calcular Área".

- Al hacer clic en el botón, calcula el área del rectángulo y muestra el resultado en un elemento `<p>` en la página.

## Diseño de la propuesta de solución del problema 

function arearectangulo(ancho, alto) {
   
    const area = ancho * alto
    
    const resultado = "El área del rectángulo es: " + area
    
    return resultado 
} 

Usando esto en un archivo js aparte, haz una pagina web con dos entradas para escribir el ancho y el alto, ademas de un botón que tiene que tener de id "Calcular Área".

## Prueba de la resolución del problema

![imagen2](ejercicio2.gif)