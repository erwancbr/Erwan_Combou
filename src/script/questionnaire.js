let questions = [];
let currentQuestionIndex = 0;
let userResponses = {};

// Mélanger les éléments d'un tableau (Fisher-Yates)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Échange les éléments
    }
}

// Fonction pour charger le questionnaire
async function loadQuestionnaire() {
    try {
        const response = await fetch('./script/rep.json');
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier');
        }

        questions = await response.json();
        afficherQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Erreur lors du chargement :', error);
    }
}

// Fonction pour afficher une question
function afficherQuestion(index) {
    const container = document.getElementById('questionnaire');
    container.innerHTML = ''; // Réinitialiser le contenu du conteneur

    const question = questions[index];

    const titre = document.createElement('h3');
    titre.className = 'text-lg font-bold';
    titre.textContent = question.qlabel;
    container.appendChild(titre);

    // Conteneur pour les réponses
    const reponsesWrapper = document.createElement('div');
    reponsesWrapper.style.marginTop = '1.5rem'; // Tailwind: mt-6

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex w-full items-center justify-between gap-4';

    // Mélanger les réponses avant de les afficher
    shuffleArray(question.reponses);

    question.reponses.forEach((reponse, i) => {
        const card = document.createElement('div');
        const err = document.createElement('div'); // Erreur visuelle
        err.style.display = 'none'; // Cacher par défaut

        card.className = `
            grow h-24 p-4 text-center flex items-center justify-center
            cursor-pointer transition duration-200 shadow-md
        `.trim();

        card.style.backgroundColor = '#e5e7eb';
        card.style.borderRadius = '12px';
        card.style.border = '2px solid transparent';
        card.style.fontWeight = 'bold';
        card.style.color = 'black';

        card.textContent = reponse.rlabel;

        // Effets au survol
        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = '#4f46e5';
            card.style.color = 'white';
        });

        card.addEventListener('mouseout', () => {
            card.style.backgroundColor = '#e5e7eb';
            card.style.color = 'black';
        });

        // Lorsque l'utilisateur clique sur une réponse
        card.addEventListener('click', () => {
            userResponses[question.qid] = reponse.rid;

            // Afficher une erreur si la réponse est incorrecte
            if (!reponse.correct) {
                err.style.display = 'block';
                err.className = 'text-red-500 text-center font-bold'; // Ajouter un message d'erreur
                err.textContent = 'Réponse Incorrecte, essayez encore.';
                container.appendChild(err); // Ajouter l'alerte à l'écran
                currentQuestionIndex = 0;
                userResponses = {}; // Réinitialiser les réponses
                afficherQuestion(currentQuestionIndex);
                return;
            }

            // Passer à la question suivante
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            } else {
                window.location.href = './pages/contact.html'; // Rediriger à la fin du questionnaire
            }
        });

        flexContainer.appendChild(card);

        // Espacer les réponses
        if (i === 0 && question.reponses.length > 1) {
            const spacer = document.createElement('div');
            spacer.textContent = 'OU';
            spacer.style.padding = '0 20px';
            spacer.style.fontWeight = 'bold';
            spacer.style.color = '#6b7280';
            flexContainer.appendChild(spacer);
        }
    });

    reponsesWrapper.appendChild(flexContainer);
    container.appendChild(reponsesWrapper);
}

// Fonction brute force pour tester les réponses
function bruteForce() {
    window.location.href = "./contact/A1_2A2_2.html";
}

// Charger le questionnaire au chargement de la page
loadQuestionnaire();
