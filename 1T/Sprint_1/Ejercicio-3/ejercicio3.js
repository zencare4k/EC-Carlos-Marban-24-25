 const addButton = document.getElementById('addButton');
 const inputItem = document.getElementById('inputItem');
 const itemList = document.getElementById('itemList');

 addButton.addEventListener('click', function() {
     const newItemText = inputItem.value;

     if (newItemText.trim() !== '') {
         const newItem = document.createElement('li');
         newItem.textContent = newItemText;
         itemList.appendChild(newItem);

         inputItem.value = '';
     } else {
         alert('Por favor, introduce un valor válido.');
     }

     inputItem.focus();
 });