# Erwan\_Combou

Ce repository contient un projet HTML/CSS réalisé dans le cadre du cours de Développement Web. Il met en œuvre les composants de **daisyUI** et inclut plusieurs fonctionnalités interactives à travers HTML, CSS, et JavaScript.

---

## 🎯 Objectif du projet

Créer une page web présentant :

* Un **CV** ou une **passion personnelle** sans afficher de données personnelles (pas de nom, prénom, etc.)
* Des **composants daisyUI** tels que :

  * Navigation
  * Accordéon
  * Image
  * Slideshow
* Une **calculatrice** accessible depuis un menu, réalisée lors du cours
* Un menu **"Me contacter"** comprenant :

  * Une série de **questions-réponses** à valider pour débloquer le formulaire de contact
  * Un formulaire de contact avec `mailto` si toutes les réponses sont correctes

---

## 📦 Contenu du projet

### 1. Structure générale

* `index.html` : Page principale (CV ou passion)
* `calculatrice.html` : Page contenant la calculatrice
* `contact/Ax_x_Ay_y.html` : Page contact générée pour chaque combinaison correcte de réponses
* `script.js` : Contient le **questionnaire** et la logique d'affichage/interaction

### 2. Questionnaire interactif

* Le fichier `script.js` contient une constante `questionnaire` sous la forme :

```js
const questionnaire = [
  {
    qlabel: 'Quelle est la couleur du ciel ?',
    qid: 1,
    reponses: [
      { rlabel: 'Bleu', rid: 1 },
      { rlabel: 'Rouge', rid: 2 }
    ]
  },
  ...
];
```

* Une fonction JavaScript boucle sur cette liste et injecte dynamiquement les questions dans le DOM via **template strings**
* Chaque clic sur une réponse stocke une valeur formatée (`A{qid}_{rid}`) dans une variable `reponses`

### 3. Vérification des réponses

* À la fin du questionnaire :

  * Le script vérifie si un fichier HTML correspondant (`A1_1_A2_2.html` par exemple) existe
  * Si **oui**, redirection automatique vers ce fichier (formulaire de contact)
  * Si **non**, affichage d'un message : *"Suite à vos réponses, vous ne souhaitez pas être contacté."*

### 4. Formulaire de contact (dans la page correcte)

* Champ : Nom, Prénom, Email, Message
* Fonction `mailto` utilisée pour ouvrir le client mail avec les données pré-remplies

### 5. Fonction brute force

* Un bouton spécial sur la page principale permet de **tester toutes les combinaisons possibles**
* Lorsqu'une bonne combinaison est trouvée, l’utilisateur est automatiquement redirigé vers la page contact correspondante

---

## 🛠️ Technologies utilisées

* HTML5 / CSS3
* JavaScript (DOM manipulation)
* [Tailwind CSS](https://tailwindcss.com/)
* [daisyUI](https://daisyui.com/)

---

## 🔧 Installation et usage

1. Clonez le projet :

```bash
git clone https://github.com/<ton-username>/Erwan_Combou.git
```

2. Ouvrez `index.html` dans un navigateur moderne
3. Naviguez dans les menus : CV, Calculatrice, Me contacter

---

## 📄 Licence

Projet réalisé dans un cadre pédagogique — libre d’inspiration.
