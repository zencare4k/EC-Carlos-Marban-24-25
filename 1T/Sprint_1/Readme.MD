# Ejercicio 1


## Análisis del problema

- Crear una página web que contenga un botón etiquetado "Cambiar color".

- Al hacer clic en el botón, el color de fondo de la página debe cambiar a un color aleatorio.

- Pista: Utiliza `Math.random()` para generar valores RGB aleatorios.


## Pruebas de la resolución del prblema

![imagen](https://github.com/zencare4k/EC-Carlos-Marban-24-25/blob/main/1T/Sprint_1/Ejercicio-1/ejercicio1.gif)

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