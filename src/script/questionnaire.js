let questions = [];
let currentQuestionIndex = 0;
let userResponses = {};

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

function afficherQuestion(index) {
    const container = document.getElementById('questionnaire');
    container.innerHTML = '';

    const question = questions[index];

    const titre = document.createElement('h3');
    titre.className = 'text-lg font-bold';
    titre.textContent = question.qlabel;
    container.appendChild(titre);

    // Conteneur pour l'espacement
    const reponsesWrapper = document.createElement('div');
    reponsesWrapper.style.marginTop = '1.5rem'; // équivalent Tailwind: mt-6

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex w-full items-center justify-between gap-4';

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

        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = '#4f46e5';
            card.style.color = 'white';
        });

        card.addEventListener('mouseout', () => {
            card.style.backgroundColor = '#e5e7eb';
            card.style.color = 'black';
        });

        card.addEventListener('click', () => {
            userResponses[question.qid] = reponse.rid;

            if (!reponse.correct) {
                alert("Mauvaise réponse ! Le questionnaire recommence.");
                currentQuestionIndex = 0;
                userResponses = {};
                afficherQuestion(currentQuestionIndex);
                return;
            }

            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            } else {
                window.location.href = './pages/contact.html';
            }
        });

        flexContainer.appendChild(card);

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


loadQuestionnaire();
