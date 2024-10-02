// Función para generar el XPath del elemento clicado
function getXPath(element) {
    // Asegurarse de que el elemento no sea nulo
    if (!element) return '';

    if (element.id) {
        return `//*[@id='${element.id}']`;
    }
    if (element === document.body) {
        return '/html/body';
    }

    let index = 0;
    const siblings = element.parentNode ? element.parentNode.childNodes : [];

    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];

        // Solo contamos nodos de tipo Element (tipo 1)
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            index++;
        }

        // Si encontramos el elemento, construimos el XPath
        if (sibling === element) {
            return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${index}]`;
        }
    }

    return ''; // Retornar cadena vacía si no se encuentra el XPath
}

// Escuchar clics en el documento principal
document.addEventListener('click', function(event) {
    const clickedElement = event.target; // Obtener el elemento clicado
    const xpath = getXPath(clickedElement); // Generar el XPath
    if (clickedElement.id === 'mainButton') {
        alert(`XPath del documento principal: ${xpath}`); // Mostrar en una alerta
    }
});

// Acceder al iframe desde el documento principal
const iframe = document.getElementById('myIframe');

// Cuando el iframe esté completamente cargado
iframe.onload = function() {
    const iframeDocument = iframe.contentWindow.document;

    // Crear el script que vamos a insertar en el iframe
    const script = iframeDocument.createElement('script');
    script.textContent = `
        // Función para generar el XPath dentro del iframe
        function getXPath(element) {
            // Asegurarse de que el elemento no sea nulo
            if (!element) return '';

            if (element.id) {
                return \`//*[@id='\${element.id}']\`;
            }
            if (element === document.body) {
                return '/html/body';
            }

            let index = 0;
            const siblings = element.parentNode ? element.parentNode.childNodes : [];

            for (let i = 0; i < siblings.length; i++) {
                const sibling = siblings[i];

                // Solo contamos nodos de tipo Element (tipo 1)
                if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                    index++;
                }

                // Si encontramos el elemento, construimos el XPath
                if (sibling === element) {
                    return \`\${getXPath(element.parentNode)}/\${element.tagName.toLowerCase()}[\${index}]\`;
                }
            }

            return ''; // Retornar cadena vacía si no se encuentra el XPath
        }

        // Detectar clics dentro del iframe
        document.addEventListener('click', function(event) {
            const clickedElement = event.target; // Obtener el elemento clicado
            const xpath = getXPath(clickedElement); // Generar el XPath
            if (clickedElement.id === 'iframeButton') {
                window.parent.postMessage(xpath, '*'); // Enviar el XPath al documento principal
            }
        });
    `;

    // Insertar el script en el iframe
    iframeDocument.body.appendChild(script);
};

// Escuchar los mensajes del iframe en el documento principal
window.addEventListener('message', function(event) {
    alert(`XPath del elemento clicado en el iframe: ${event.data}`); // Mostrar en una alerta
});
