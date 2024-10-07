const startButton = document.getElementById('startButton');
const timeRemainingDiv = document.getElementById('time-remaining');
const secondsInput = document.getElementById('secondsInput');

let timerInterval; 

function startTimer() {
  let seconds = parseInt(secondsInput.value);

  if (isNaN(seconds) || seconds <= 0) {
    alert("Por favor, introduce un número válido de segundos.");
    return;
  }

  timeRemainingDiv.textContent = `${seconds} segundos restantes`;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds--;

    if (seconds > 0) {
      timeRemainingDiv.textContent = `${seconds} segundos restantes`;
    } else {
      timeRemainingDiv.textContent = "¡Tiempo finalizado!";
      clearInterval(timerInterval); 
    }
  }, 1000); 
}

startButton.addEventListener('click', startTimer);
