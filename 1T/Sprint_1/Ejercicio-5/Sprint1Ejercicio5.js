// Función para generar el XPath de un elemento
function getXPath(element) {
    if (element.id) {
        return `//*[@id='${element.id}']`;
    }

    let xpath = '';
    for (; element && element.nodeType === Node.ELEMENT_NODE; element = element.parentNode) {
        let index = 1;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            // Contar solo elementos (nodos de tipo ELEMENT_NODE)
            if (sibling.nodeType === Node.ELEMENT_NODE) {
                if (sibling === element) {
                    xpath = `/${element.tagName.toLowerCase()}[${index}]` + xpath;
                } else {
                    index++;
                }
            }
        }
    }
    return xpath;
}

// Evento de clic en el documento
document.addEventListener('click', function(event) {
    const targetElement = event.target; // Elemento clicado
    
    // Verificar si el clic fue en un botón
    if (targetElement.tagName === 'BUTTON') {
        const xpath = getXPath(targetElement); // Generar XPath
        // Mostrar XPath en el elemento <p>
        document.getElementById('xpathDisplay').innerText = `XPath: ${xpath}`;
    } else {
        // Si se hace clic en cualquier parte fuera de los botones
        alert('¡Clic detectado fuera de los botones!');
    }
});
