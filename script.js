// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Contact form — envía a Formspree y muestra éxito sin recargar la página
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !email || !mensaje) {
    shakeInvalid();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviando...';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      formSuccess.classList.add('visible');
    } else {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Enviar mensaje';
      alert('Hubo un error al enviar. Escribime directamente a creamostuwebalgusto@gmail.com');
    }
  } catch {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar mensaje';
    alert('Sin conexión. Escribime a creamostuwebalgusto@gmail.com');
  }
});

function shakeInvalid() {
  ['nombre', 'email', 'mensaje'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#EF4444';
      el.style.animation = 'shake 0.4s ease';
      setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 400);
    }
  });
}

const style = document.createElement('style');
style.textContent = `@keyframes shake {
  0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)}
}`;
document.head.appendChild(style);
