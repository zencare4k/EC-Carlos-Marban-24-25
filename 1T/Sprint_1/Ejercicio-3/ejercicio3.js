
function addItem() {
    const inputField = document.getElementById('inputItem');
    const inputValue = inputField.value;

    if (inputValue.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = inputValue;

        const itemList = document.getElementById('itemList');
        itemList.appendChild(li);

        inputField.value = '';
    } else {
        alert("Por favor, escribe algo antes de añadir.");
    }
}

document.getElementById('addButton').addEventListener('click', addItem);
