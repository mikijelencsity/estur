/* ══════════════════════════════════════════
   ESTUR ÉPKER KFT. — Közös JavaScript
   ══════════════════════════════════════════ */

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));
}

// ── Hamburger / mobil menü ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobile() {
  if (!hamburger || !mobileMenu) return;
  // Reset item states hogy az animáció újra lefusson
  mobileMenu.querySelectorAll('.mobile-nav-item').forEach(el => {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-22px)';
  });
  mobileMenu.classList.add('active');
  hamburger.classList.add('active');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  // Egy frame után engedjük az animációt
  requestAnimationFrame(() => {
    mobileMenu.querySelectorAll('.mobile-nav-item').forEach(el => {
      el.style.transition = '';
      el.style.opacity = '';
      el.style.transform = '';
    });
  });
}

function closeMobile() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('active') ? closeMobile() : openMobile();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });
}

// ── Reveal on scroll ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 80);
      revealObs.unobserve(en.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Cookie banner ──
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
  if (!localStorage.getItem('estur_cookies')) {
    setTimeout(() => cookieBanner.classList.add('show'), 1500);
  }
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    localStorage.setItem('estur_cookies', 'accepted');
    cookieBanner.classList.remove('show');
  });
  if (declineBtn) declineBtn.addEventListener('click', () => {
    localStorage.setItem('estur_cookies', 'declined');
    cookieBanner.classList.remove('show');
  });
}

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
if (lightbox && lightboxImg) {
  document.querySelectorAll('.ref-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  const lbClose = document.getElementById('lightboxClose');
  if (lbClose) lbClose.addEventListener('click', e => {
    e.stopPropagation();
    lightbox.classList.remove('active');
  });
}

// ── Kapcsolat / ajánlatkérés form küldés gomb ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function () {
    const btn = this.querySelector('.form-submit');
    if (btn) { btn.textContent = 'Küldés...'; btn.disabled = true; }
  });
}

// ── Nyelvi váltó (multilang) ──
function setLang(lang) {
  localStorage.setItem('estur_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === lang);
  });
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.innerHTML = val;
  });
  document.documentElement.lang = lang === 'hu' ? 'hu' : lang === 'en' ? 'en' : 'de';
}

// ── Nyelv visszaállítása betöltéskor ──
(function () {
  const saved = localStorage.getItem('estur_lang') || 'hu';
  setLang(saved);
})();
