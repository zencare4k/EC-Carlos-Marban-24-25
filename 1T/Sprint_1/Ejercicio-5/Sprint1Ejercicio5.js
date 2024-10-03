// Función para generar el XPath
function generateXPath(element) {
    if (element.id) {
        return '//*[@id="' + element.id + '"]';
    }
    if (element === document.body) {
        return '/html/body';
    }

    let index = 0;
    const siblings = element.parentNode.children;
    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling.tagName === element.tagName) {
            index++;
        }
        if (sibling === element) {
            return `${generateXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${index}]`;
        }
    }
    return null;
}

// Detectar clics en el documento principal
document.addEventListener('click', function(event) {
    const clickedElement = event.target;

    // Solo procesar clics en botones
    if (clickedElement.tagName.toLowerCase() === 'button') {
        const xpath = generateXPath(clickedElement);
        alert(`XPath del botón en el documento principal: ${xpath}`);
    }
});

// Acceder al iframe y agregar evento de clic
const iframe = document.getElementById('myIframe');
iframe.onload = function() {
    const iframeWindow = iframe.contentWindow;

    // Detectar clics dentro del iframe
    iframeWindow.document.addEventListener('click', function(event) {
        const clickedElement = event.target;

        // Solo procesar clics en botones
        if (clickedElement.tagName.toLowerCase() === 'button') {
            const xpath = generateXPath(clickedElement);
            // Enviar el XPath al documento principal
            window.parent.postMessage(xpath, window.location.origin);
        }
    });
};

// Escuchar los mensajes provenientes del iframe
window.addEventListener('message', function(event) {
    // Asegurar que el mensaje venga del mismo origen
    if (event.origin === window.location.origin) {
        const xpath = event.data;
        alert(`XPath del botón en el iframe: ${xpath}`);
    } else {
        console.warn("Origen no autorizado:", event.origin);
    }
});
