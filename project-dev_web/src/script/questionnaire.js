let questions = [];
let currentQuestionIndex = 0;
let userResponses = {};
var sounderr = new Audio('./src/res/buzzer-error.mp3');  
var soundgood = new Audio('./src/res/correct-answer.mp3');

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
        const response = await fetch('./src/script/rep.json');
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier');
        }

        questions = await response.json();
        afficherQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Erreur lors du chargement :', error);
    }
}

// Fonction brute-force pour tester les réponses
async function bruteForce() {
    while (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        let foundAnswer = false;

        // Mélanger les réponses avant de les tester
        shuffleArray(question.reponses);

        // Tester chaque réponse jusqu'à trouver la bonne
        for (let reponse of question.reponses) {
            userResponses[question.qid] = reponse.rid;

            // Vérifier si la réponse est correcte
            if (reponse.correct) {
                soundgood.play();  // Son de bonne réponse
                console.log(`Question ${currentQuestionIndex + 1}: Correct réponse trouvée!`);
                foundAnswer = true;
                break;
            } else {
                sounderr.play();  // Son de mauvaise réponse
                console.log(`Question ${currentQuestionIndex + 1}: Mauvaise réponse: ${reponse.rlabel}`);
            }
        }

        // Si une bonne réponse est trouvée, passer à la question suivante
        if (foundAnswer) {
            currentQuestionIndex++;
            if (currentQuestionIndex === questions.length) {
                generateAnswersFile(); // Crée un fichier avec toutes les réponses à la fin
                window.location.href = './src/pages/A1_1_A2_1_A3_1_A4_1_A5_1_A6_1_A7_1.html'; // Rediriger à la fin du questionnaire
            } else {
                console.log(`Passage à la question suivante: ${currentQuestionIndex + 1}`);
            }
        }
    }
}

// Fonction pour générer et télécharger le fichier avec toutes les réponses
function generateAnswersFile() {
    const answers = [];

    // Rassembler toutes les réponses données par l'IA
    for (let question of questions) {
        const userResponse = userResponses[question.qid];
        const reponse = question.reponses.find(r => r.rid === userResponse);
        answers.push({
            questionLabel: question.qlabel,
            responseLabel: reponse.rlabel,
        });
    }

    // Créer le fichier JSON avec les réponses
    const blob = new Blob([JSON.stringify(answers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_responses.json';  // Nom du fichier à télécharger
    a.click();
    URL.revokeObjectURL(url);
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

    // Créer un message d'erreur global qui sera affiché en cas de mauvaise réponse
    const err = document.createElement('div');
    err.style.display = 'none'; // Cacher par défaut
    err.className = 'text-red-500 text-center font-bold mt-4'; // Ajouter un style d'erreur

    // Parcourir les réponses
    question.reponses.forEach((reponse, i) => {
        const card = document.createElement('div');
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

            // Si la réponse est incorrecte, on affiche l'erreur et on colore la carte
            if (!reponse.correct) {
                err.style.display = 'block';
                err.textContent = 'Réponse Incorrecte, essayez encore.';

                card.style.backgroundColor = '#f87171'; // Couleur rouge pour la mauvaise réponse
                card.style.border = '2px solid #9b2c2c'; // Bordure rouge pour la mauvaise réponse
                container.style.borderRadius = '12px';
                container.style.padding = '1rem';
                container.style.border = '2px dashed #ff0000'; // Bordure verte

                sounderr.play();  // Joue le son d'erreur

                // Afficher le message d'erreur global
                container.appendChild(err);
            } else {
                // Si la réponse est correcte, passer à la question suivante
                soundgood.play();  // Joue le son de succès

                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    afficherQuestion(currentQuestionIndex);
                    container.style.borderRadius = '12px';
                    container.style.padding = '1rem';
                    container.style.border = '2px dashed #059669'; // Bordure verte
                } else {
                    window.location.href = './src/pages/A1_1_A2_1_A3_1_A4_1_A5_1_A6_1_A7_1.html'; // Rediriger à la fin du questionnaire
                }
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

// Ajout du bouton pour démarrer le brute force
// Fonction pour ajouter un bouton Brute Force discret
// Fonction pour ajouter un bouton Brute Force discret
function addBruteForceButton() {
    const button = document.createElement('button');
    button.textContent = 'Brute Force';
    
    // Style CSS du bouton
    button.className = 'bg-blue-500 text-white py-3 px-6 rounded-lg opacity-10 hover:cursor-not-allowed';  // Opacité réduite pour le cacher légèrement
    button.style.opacity = '0.3';  // Rendre plus discret à la sortie du survol
    button.style.position = 'fixed';
    button.style.bottom = '20px';  // Positionner en bas à droite
    button.style.right = '20px';
    button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';  // Transition fluide pour opacité et effet de survol

    // Ajouter un léger effet de zoom au survol
    button.addEventListener('mouseover', () => {
        button.style.opacity = '1';  // Rendre plus visible au survol
        button.style.transform = 'scale(1.1)';  // Légère augmentation de taille au survol
    });

    button.addEventListener('mouseout', () => {
        button.style.opacity = '0.3';  // Rendre plus discret à la sortie du survol
        button.style.transform = 'scale(1)';  // Revenir à la taille normale
    });

    // Lancer la fonction brute force lorsqu'on clique sur le bouton
    button.addEventListener('click', bruteForce);

    // Ajouter le bouton à la page
    document.body.appendChild(button);
}

function clearQuestionnaire() {
    userResponses = {};
    currentQuestionIndex = 0;
}

// Charger le questionnaire au chargement de la page
loadQuestionnaire();

// Ajouter le bouton brute force après avoir chargé le questionnaire
addBruteForceButton();

