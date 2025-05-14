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

    const sujet = encodeURIComponent("Demande de contact depuis le site www.vainerac.fr");
    const corps = encodeURIComponent(
        `Nom : ${nom}\nPrénom : ${prenom}\nEmail : ${email}\n\n\n${message}`
    );

    window.open(`mailto:erwan.combourieu@gmail.com?subject=${sujet}&body=${corps}`); 
    
    // Afficher un message de succès ou rediriger l'utilisateur
    alert("Votre message a été envoyé avec succès !");
    window.location.href = './pages/merci.html';
}
    
      