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
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

//SELECTORES

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const sections = $$("section");
const navLinks = $$("nav a");
const btnTop = $("#btn-top");
const form = $("form");

//BOTÓN VOLVER ARRIBA

const toggleBtnTop = () => {
  btnTop.style.display = window.scrollY > 300 ? "block" : "none";
};

btnTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

//HOVER PROYECTOS

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


//MENSAJE ENVÍO FORMULARIO

const enviar = () => {
  const mensaje = $("#mensaje-enviado");
  if (!mensaje) return;

  mensaje.textContent = "✅ Mensaje enviado correctamente. ¡Gracias!";
  mensaje.style.cssText = "color: green; margin-top: 10px";

  console.log("Mensaje enviado a Julian Miranda");
};

//ANIMACIONES AL SCROLL

const revealOnScroll = () => {
  sections.forEach(section => {
    const { top } = section.getBoundingClientRect();
    if (top < window.innerHeight - 100) {
      section.classList.add("reveal", "active");
    }
  });
};

//LINK ACTIVO NAV

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

//SCROLL SUAVE NAV

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

//VALIDACIÓN FORMULARIO

form?.addEventListener("submit", e => {
  const nombre = $("#nombre")?.value.trim();
  const email = $("#email")?.value.trim();

  if (!nombre || !email) {
    e.preventDefault();
    alert("Por favor completá los campos obligatorios.");
  }
});

//SCROLL GLOBAL

window.addEventListener("scroll", () => {
  toggleBtnTop();
  revealOnScroll();
  setActiveLink();
});

//INIT
revealOnScroll();
setActiveLink();
