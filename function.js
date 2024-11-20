function enviar(){
    console.log("Su mensaje ha sido enviado a Julian Miranda")
    alert("Su mensaje ha sido enviado a Julian Miranda")
}

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href'); // Obtiene el id del destino
      const targetSection = document.querySelector(targetId);
  
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop, // Calcula la posición del destino
          behavior: 'smooth' // Desplazamiento suave
        });
      }
    });
  });