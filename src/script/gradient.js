const gradients = [
  ["#bfbfbf", "#e0e0e0"],   // Fer (Iron) - gris métallique
  ["#1ba1f2", "#3cdfff"],   // Diamant (Diamond) - bleu cyan
  ["#34c924", "#6df15d"],   // Émeraude (Emerald) - vert vif
  ["#f05010", "#b87333"],   // Cuivre (Copper) - brun cuivré
  ["#555555", "#7d7d7d"],   // Charbon (Coal) - noir/gris
  ["#ff3c3c", "#ff7575"],   // Redstone - rouge électrique
  ["#8b00ff", "#c080ff"],   // Améthyste - violet intense
  ["#ffd700", "#ffec8b"],   // Or (Gold) - jaune doré
  ["#00c5ff", "#3cf9ff"],   // Lapis-lazuli - bleu vif
];


let index = 0;

function updateTextGradient() {
  const textEl = document.getElementById("gradient-text");
  if (!textEl) return;

  const [start, end] = gradients[index];
  textEl.style.background = `linear-gradient(90deg, ${start}, ${end})`;

  index = (index + 1) % gradients.length;
}

document.addEventListener("DOMContentLoaded", () => {
  updateTextGradient();
  setInterval(updateTextGradient, 3000);
});
