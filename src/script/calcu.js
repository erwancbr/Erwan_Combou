    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    // Vérifier la taille de l'écran
    function checkScreenSize() {
      const screenWidth = window.innerWidth;

      // Log de la largeur de l'écran
      console.log("Largeur de l'écran:", screenWidth);

      // Si l'écran est trop petit, afficher un message d'erreur
      if (screenWidth < 900) {
        console.log("Écran trop petit, afficher un message d'erreur.");
        document.getElementById('errorMessage').style.display = 'block'; // Affiche le message d'erreur
      } else {
        // Sinon, afficher la modale
        const modal = document.getElementById('my_modal_1');
        modal.showModal();  // Ouvre la modale
        document.getElementById('errorMessage').style.display = 'none'; // Masque le message d'erreur
      }
    }

    // Fonction d'ajout d'un chiffre
    function appendNumber(number) {
      currentInput += number;
      updateDisplay();
    }

    // Fonction de sélection d'un opérateur
    function chooseOperator(op) {
      if (currentInput === '') return; // Si aucune valeur n'a été entrée, on ne fait rien
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator) {
        calculateResult();
        firstOperand = parseFloat(currentInput);
      }
      operator = op;
      currentInput = '';
    }

    // Fonction pour calculer le résultat
    function calculateResult() {
      if (firstOperand === null || currentInput === '') return;
      let result;
      const secondOperand = parseFloat(currentInput);

      switch (operator) {
        case '+':
          result = firstOperand + secondOperand;
          break;
        case '-':
          result = firstOperand - secondOperand;
          break;
        case '*':
          result = firstOperand * secondOperand;
          break;
        case '/':
          if (secondOperand === 0) {
            alert("Erreur: division par zéro");
            return;
          }
          result = firstOperand / secondOperand;
          break;
        default:
          return;
      }

      currentInput = result.toString();
      operator = '';
      firstOperand = null;
      updateDisplay();
    }

    // Fonction pour vider l'affichage
    function clearDisplay() {
      currentInput = '';
      operator = '';
      firstOperand = null;
      updateDisplay();
    }

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
      document.getElementById('display').value = currentInput;
    }