// INIT SWIPER
if (document.querySelector('.mySwiper')) {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      740: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    mousewheel: true,
  });
}

// SELECTORES
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const sections = $$("section");
const navLinks = $$("nav a");
const btnTop = $("#btn-top");
const form = $("form");

// BOTÓN VOLVER ARRIBA
const toggleBtnTop = () => {
  btnTop.style.display = window.scrollY > 300 ? "block" : "none";
};

btnTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// HOVER PROYECTOS
const proyectos = $$(".detalles-proyecto");

proyectos.forEach(proyecto => {
  proyecto.addEventListener("mouseenter", () => {
    proyecto.style.transform = "scale(1.05)";
    proyecto.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)";
  });

  proyecto.addEventListener("mouseleave", () => {
    proyecto.style.transform = "scale(1)";
    proyecto.style.boxShadow = "none";
  });
});

// MENSAJE ENVÍO FORMULARIO
const enviar = () => {
  const mensaje = $("#mensaje-enviado");
  if (!mensaje) return;

  mensaje.textContent = "✅ Mensaje enviado correctamente. ¡Gracias!";
  mensaje.style.cssText = "color: green; margin-top: 10px";
  console.log("Mensaje enviado a Julian Miranda");
};

// ANIMACIONES CON INTERSECTION OBSERVER
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

const initScrollAnimations = () => {
  const elementosAAnimar = $$('.servicio-card, .certificado-card, .timeline-item, .skills-grid i, .swiper, #contacto dl, #contacto form, .texto');
  elementosAAnimar.forEach((el, index) => {
    el.classList.add('reveal');
    // Generar un delay en cascada sútil
    el.style.transitionDelay = `${(index % 6) * 0.1}s`;
    observer.observe(el);
  });
};

// LINK ACTIVO NAV
const setActiveLink = () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link =>
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    )
  );
};

// SCROLL SUAVE NAV
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = $(link.getAttribute("href"));
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  });
});

// VALIDACIÓN FORMULARIO
form?.addEventListener("submit", e => {
  const nombre = $("#nombre")?.value.trim();
  const email = $("#email")?.value.trim();

  if (!nombre || !email) {
    e.preventDefault();
    alert("Por favor completá los campos obligatorios.");
  }
});

// TYPEWRITER EFFECT
const typeWriterElement = $("#typewriter");
const phrases = ["Desarrollador Front-End", "Soporte Técnico", "Estudiante de Programación"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  if (!typeWriterElement) return;
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
};

// SCROLL GLOBAL
window.addEventListener("scroll", () => {
  toggleBtnTop();
  setActiveLink();
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  setActiveLink();
  typeEffect();
});
