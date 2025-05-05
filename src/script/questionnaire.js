let questions = [];
let currentQuestionIndex = 0;
let userResponses = {};

async function loadQuestionnaire() {
    try {
        const response = await fetch('../script/rep.json');
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier');
        }

        questions = await response.json();
        afficherQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Erreur lors du chargement :', error);
    }
}

function afficherQuestion(index) {
    const container = document.getElementById('questionnaire');
    container.innerHTML = '';

    const question = questions[index];

    const titre = document.createElement('h3');
    titre.textContent = question.qlabel;
    container.appendChild(titre);

    question.reponses.forEach((reponse) => {
        const label = document.createElement('label');
        label.style.display = 'block';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${question.qid}`;
        input.value = reponse.rid;

        if (userResponses[question.qid] == reponse.rid) {
            input.checked = true;
        }

        input.addEventListener('change', () => {
            userResponses[question.qid] = reponse.rid;
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${reponse.rlabel}`));
        container.appendChild(label);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = index < questions.length - 1 ? 'Suivant' : 'Corriger';
    nextButton.onclick = () => {
        if (userResponses[question.qid]) {
            if (index < questions.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            } else {
                corriger();
            }
        } else {
            alert("Veuillez sélectionner une réponse avant de continuer.");
        }
    };
    container.appendChild(document.createElement('br'));
    container.appendChild(nextButton);
}

function corriger() {
    const container = document.getElementById('questionnaire');
    container.innerHTML = '<h2>Résultats</h2>';

    questions.forEach((question) => {
        const bloc = document.createElement('div');
        const titre = document.createElement('h3');
        titre.textContent = question.qlabel;
        bloc.appendChild(titre);

        question.reponses.forEach((reponse) => {
            const label = document.createElement('label');
            label.style.display = 'block';

            const input = document.createElement('input');
            input.type = 'radio';
            input.disabled = true;
            input.name = `q-${question.qid}`;
            input.value = reponse.rid;

            const userAnswer = userResponses[question.qid];

            if (reponse.rid == userAnswer) {
                input.checked = true;
                if (reponse.correct) {
                    label.style.color = 'green';
                } else {
                    label.style.color = 'red';
                }
            }

            // Affiche aussi la bonne réponse même si mal cochée
            if (reponse.correct && reponse.rid != userAnswer) {
                label.style.color = 'green';
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${reponse.rlabel}`));
            bloc.appendChild(label);
        });

        container.appendChild(bloc);
        container.appendChild(document.createElement('hr'));
    });
}

loadQuestionnaire();
