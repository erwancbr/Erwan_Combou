let currentInput = '';
let operator = '';
let firstOperand = null;

function checkScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 900) {
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
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    calculateResult();
    firstOperand = parseFloat(currentInput);
  }
  operator = op;
  currentInput = '';
}

function calculateResult() {
  if (firstOperand === null || currentInput === '') return;
  const secondOperand = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+': result = firstOperand + secondOperand; break;
    case '-': result = firstOperand - secondOperand; break;
    case '*': result = firstOperand * secondOperand; break;
    case '/':
      if (secondOperand === 0) {
        alert("Erreur: division par zéro");
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default: return;
  }

  currentInput = result.toString();
  operator = '';
  firstOperand = null;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').value = currentInput;
}
