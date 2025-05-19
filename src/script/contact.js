// Charger et initialiser EmailJS
(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.emailjs.com/dist/email.min.js";
    script.onload = function() {
        emailjs.init("pn25-xNyYIJp9SP99"); // 🔁 Remplacez par votre PUBLIC KEY EmailJS
    };
    document.head.appendChild(script);
})();

// Fonction d'envoi du message
function sendmessage(event) {
    event.preventDefault();

    var nom = document.getElementById("nom").value.trim();
    var prenom = document.getElementById("prenom").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    if (!nom || !prenom || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const templateParams = {
        nom: nom,
        prenom: prenom,
        email: email,
        message: message
    };

    emailjs.send("service_gtszw32", "template_ykoerxl", templateParams) 
        .then(function(response) {
            alert("Votre message a été envoyé avec succès !");
            window.location.href = './pages/merci.html';
        }, function(error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard.");
        });
}
