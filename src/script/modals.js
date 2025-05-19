

function openModal(id) {
  const modal = document.getElementById(id);

  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    document.getElementById('errorMessage').style.display = 'block';
  } else {
      if (modal) {
    modal.showModal();
    }
    document.getElementById('errorMessage').style.display = 'none';
  }
}
  


function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.close();
  }
}
