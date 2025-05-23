# 🌐 Projet Web - Erwan C. 🎮

Ce projet est avant tout un **CV interactif** en ligne pour présenter mon profil Minecraft, en l'occurrence mon compte **erwan.cbr**. L'objectif est de créer une page Web qui affiche mes compétences, expériences, et réalisations dans l'univers de Minecraft, tout en intégrant un **questionnaire CAPTCHA** interactif pour valider l'utilisateur. 📝

Le projet utilise un questionnaire dynamique avec une logique de validation, des animations interactives, et un bouton caché permettant de tester le questionnaire via un mode brute force. Ce système permet de garantir que le projet est à la fois fonctionnel et interactif. ⚙️

## Fonctionnalités principales ✨

- **🎮 CV interactif Minecraft** : La page présente un résumé détaillé de mon parcours en tant que joueur Minecraft, de mes compétences techniques et organisationnelles, ainsi que mes expériences en tant que développeur de serveurs et builder.
- **🧩 Questionnaire CAPTCHA** : Un questionnaire interactif est intégré pour vérifier que l'utilisateur est un humain. Chaque question est aléatoire, avec des réponses mélangées à chaque fois.
- **✅ Validation des réponses** : L'utilisateur doit répondre correctement aux questions. Une réponse incorrecte est signalée par un message d'erreur.
- **🔒 Bouton de bruteforce caché** : Un bouton permettant de brute forcer le questionnaire (enregistrer et envoyer toutes les réponses possibles) est inclus, mais il est discret et seulement visible si activé manuellement.
- **🧮 Calculatrice intégrée** : Un modal de calculatrice est inclus, permettant à l'utilisateur de faire des calculs sans quitter la page.

## Technologies utilisées 💻

- **HTML5** : Structure de base de la page et gestion des éléments multimédia.
- **CSS** : Mise en forme du site avec un design responsive et des animations CSS.
- **JavaScript** : Logique du questionnaire, gestion des événements et de la validation des réponses.
- **TailwindCSS** : Framework CSS pour des styles rapides et modernes.
- **JSON** : Stockage des questions et des réponses dans un fichier JSON externe.

## Installation 🚀

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/votre-repository.git

2. Assurez-vous d'avoir installé toutes les dépendances nécessaires. Si vous utilisez un gestionnaire de paquets comme npm, vous pouvez installer TailwindCSS et d'autres dépendances :

   ```bash
   npm install
   ```

3. Ouvrez `index.html` dans votre navigateur pour voir le projet en action.

## Structure du projet 🗂️

```
📁 projet-root/
│
├── .gitignore              # Fichiers à ignorer par Git
├── LICENSE                 # Licence du projet (ex: MIT)
├── package.json            # Dépendances et scripts NPM
├── package-lock.json       # Verrouillage des versions de dépendances
├── README.md               # Présentation complète du projet
│
├── node_modules/           # Modules Node installés via npm (auto-généré)
│
└── src/                    # Répertoire principal du code source
    │
    ├── index.html          # Page principale : CV interactif Minecraft
    │
    ├── pages/              # Pages secondaires du site
    │   ├── contact.html    # Page de contact (redirigée après succès)
    │   └── test.html       # Page de test (optionnelle ou debug)
    │
    ├── res/                # Ressources (sons, images, etc.)
    │   ├── buzzer-error.mp3      # Son erreur réponse
    │   └── correct-answer.mp3    # Son bonne réponse
    │
    ├── script/             # Scripts JavaScript
    │   ├── calcu.js        # Logique de la calculatrice
    │   ├── contact.js      # Script pour la page contact
    │   ├── questionnaire.js# Script principal du quiz (CAPTCHA)
    │   └── rep.json        # Questions et réponses du CAPTCHA
    │
    └── style/              # Feuilles de style
        ├── input.css       # Fichier source Tailwind
        └── output.css      # Fichier généré avec Tailwind (compilé)

```

## Fichiers principaux 📂

* **`index.html`** : Le fichier HTML principal qui contient l'interface utilisateur et qui charge les autres fichiers nécessaires (CSS et JS).
* **`questionnaire.js`** : Contient la logique principale pour gérer l'affichage du questionnaire, le contrôle des réponses et l'activation du bouton bruteforce.
* **`calcu.js`** : Gère la logique de la calculatrice qui est affichée dans un modal.
* **`rep.json`** : Un fichier JSON contenant les questions du questionnaire et les réponses possibles, ainsi que la réponse correcte.

## Fonctionnalités supplémentaires 🛠️

* **🧮 Modal de calculatrice** : Un modal interactif permettant à l'utilisateur de faire des calculs sans quitter la page.
* **🔓 Bouton Bruteforce** : Discret et non visible par défaut, il est destiné à tester rapidement toutes les réponses en un seul clic. Vous pouvez activer ce bouton en modifiant la fonction `addBruteForceButton()` dans le fichier `questionnaire.js`.

### Exemple d'utilisation du bouton Bruteforce ⚡

Le bouton "Bruteforce" est caché par défaut et uniquement affiché lorsque l'on active sa fonction manuellement via la ligne `addBruteForceButton()` dans le fichier `questionnaire.js`. Une fois affiché, il permet de sauter le questionnaire en un seul clic, générant automatiquement toutes les réponses et les envoyant.

## Capture d'écran 📸

![Exemple du questionnaire CAPTCHA avec le bouton Bruteforce caché](./screenshots/captcha_example.png)

## Objectif du projet 🎯

Ce projet a été conçu pour mettre en valeur mon expérience et mes compétences dans Minecraft tout en créant une interface interactive qui peut également servir de méthode de validation (via le CAPTCHA). Le but est de fournir un CV moderne et original tout en offrant une expérience utilisateur interactive. 🚀

## Contributions 🤝

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet, vous pouvez ouvrir une **Pull Request** pour proposer des modifications.

### Comment contribuer :

1. Fork ce dépôt.
2. Créez une nouvelle branche (`git checkout -b ma-nouvelle-fonctionnalite`).
3. Faites vos changements et ajoutez des commits (`git commit -am 'Ajout de ma nouvelle fonctionnalité'`).
4. Poussez vos modifications (`git push origin ma-nouvelle-fonctionnalite`).
5. Créez une **Pull Request**.

## Auteurs 👨‍💻

* **Erwan Combourieu** - Développeur principal.

## License 📝

Ce projet est sous **licence MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir un **issue** ou à envoyer une **pull request**. Profitez du projet ! 🎉

