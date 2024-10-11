const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffle-btn');

// Función para inicializar el tablero
function initBoard() {
    // Limpia el tablero antes de empezar
    gameBoard.innerHTML = '';
    messageElement.innerText = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    
    const shuffledCards = shuffle(cardsArray);
    
    shuffledCards.forEach((cardValue) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.innerHTML = '?';  // Inicialmente oculta el valor
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para mezclar las cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para voltear una carta
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.value;

    if (!firstCard) {
        // Primer clic
        firstCard = this;
    } else {
        // Segundo clic
        secondCard = this;
        checkForMatch();
    }
}

// Función para comprobar si las cartas coinciden
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Las cartas coinciden
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                messageElement.innerText = "¡Has encontrado todas las parejas!";
            }, 500);
        }
    } else {
        // Las cartas no coinciden
        unflipCards();
    }
}

// Función para deshabilitar las cartas si coinciden
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Función para voltear nuevamente las cartas si no coinciden
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.innerHTML = '?';
        secondCard.classList.remove('flipped');
        secondCard.innerHTML = '?';
        resetBoard();
    }, 1000);
}

// Función para reiniciar el estado de las cartas seleccionadas
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Añadir el evento de clic al botón para barajar las cartas
shuffleBtn.addEventListener('click', initBoard);

// Inicializar el juego al cargar la página
initBoard();
