let currentInput = '';

function checkScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    document.getElementById('my_modal_1').showModal();
    document.getElementById('errorMessage').style.display = 'none';
  }
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    // Remplace le dernier opérateur s’il y en a déjà un à la fin
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    alert("Erreur dans l'expression");
  }
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').value = currentInput;
}
