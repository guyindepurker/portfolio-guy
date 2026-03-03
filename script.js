const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (!icon) return;
  icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealTextElements = document.querySelectorAll(".reveal-text");
revealTextElements.forEach((el) => {
  const words = el.textContent.trim().split(" ");
  el.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    el.appendChild(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero .word", {
    y: 60,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-media img", {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.from(".hero-stats .stat", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.4,
  });


  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section.querySelectorAll(".about-card, .skill-card, .service-card, .project-card, .timeline-step, .contact-form, .contact-info"), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}

const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:guy235@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});
