function clickdetector() {
    document.addEventListener('click', function(event) {
        const elementoClickeado = event.target;
        alert('Has clickeado en el elemento: ' + elementoClickeado.tagName + ' con id: ' + elementoClickeado.id);
    });
    const iframe = document.getElementById('myIframe');
    
    iframe.addEventListener('load', function() {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.addEventListener('click', function(event) {
            const elementoClickeado = event.target;
            alert('Has clickeado en el elemento dentro de iframe ')
        })
    })
}

function genxpath(element){
return 'id ("' + element.id + '")'

let xpath = ''
}
clickdetector();