/* ─── NAVBAR: scroll effect + mobile menu ─── */
const navbar  = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── SMOOTH ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` &&
      !link.classList.contains('nav-cta') ? 'var(--teal)' : '';
  });
}
window.addEventListener('scroll', updateActiveLink);

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll(
  '.timeline-card, .skill-card, .cert-card, .about-stats, .stat, .contact-inner > *'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger sibling reveals
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')]
        .filter(el => !el.classList.contains('visible'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── SKILL BARS ANIMATION ─── */
const skillFills = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => barObserver.observe(fill));

/* ─── CONTACT FORM (demo handler) ─── */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send — replace with actual fetch/EmailJS in production
  setTimeout(() => {
    formNote.textContent = '✓ Message sent! I\'ll be in touch soon.';
    formNote.style.color = 'var(--teal-mid)';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    form.reset();
  }, 1400);
});

/* ─── COUNTER ANIMATION for stats ─── */
function animateCounter(el) {
  const target = parseFloat(el.textContent.replace('%', ''));
  const hasPct = el.textContent.includes('%');
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;

    el.textContent = (target % 1 !== 0 ? value.toFixed(2) : Math.floor(value)) + (hasPct ? '%' : '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (target % 1 !== 0 ? target.toFixed(2) : target) + (hasPct ? '%' : '');
  }

  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));
