/* -----------------------------------
   SMOOTH SCROLL FOR NAVIGATION
----------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // nav links that point to anchors
  document.querySelectorAll('nav a[href^="#"], .main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;
      // allow regular external links
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // hero CTA -> scroll to products/bestsellers
  const productsBtn = document.querySelector('.btn-primary');
  if (productsBtn) {
    productsBtn.addEventListener('click', (e) => {
      // if there are multiple .btn-primary, make sure we are the hero button:
      const inHero = e.currentTarget.closest('.hero');
      if (inHero) {
        const el = document.getElementById('bestsellers');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // "Check all" button if present
  const checkAllBtn = document.querySelector('#checkAllBtn, .center-btn');
  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      // placeholder action
      alert('Showing all products (placeholder)');
    });
  }

  /* -----------------------------------
     FADE-IN ANIMATION ON SCROLL
  ----------------------------------- */
  const animatedElements = document.querySelectorAll('.why-item, .product, .review-card, .history-section, .hero-content');

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) el.classList.add('show');
    });
  }

  // run on load and scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);

  /* -----------------------------------
     SIMPLE FORM VALIDATION (used by login/signup)
     Usage: window.validateFormSimple(formElement)
     Returns: true if all required inputs have values
  ----------------------------------- */
  function validateFormSimple(formEl) {
    if (!formEl) return false;
    const inputs = Array.from(formEl.querySelectorAll('input[required], textarea[required]'));
    let ok = true;
    inputs.forEach(i => {
      // trim value for text-like inputs
      const val = (i.value || '').toString().trim();
      if (!val) {
        ok = false;
        i.classList.add('input-error');
        // subtle red outline for user feedback
        i.style.borderColor = '#ff4f4f';
      } else {
        i.classList.remove('input-error');
        i.style.borderColor = '';
      }
    });
    return ok;
  }

  // expose globally for login/signup pages
  window.validateFormSimple = validateFormSimple;

  /* -----------------------------------
     LOGIN / SIGNUP FORM HOOKS (if forms exist on page)
  ----------------------------------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateFormSimple(this)) {
        // placeholder: normally you'd call your backend here
        alert('Login successful (placeholder)');
        // optionally redirect:
        // window.location.href = 'index.html';
      } else {
        alert('Please fill all required fields.');
      }
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateFormSimple(this)) {
        alert('Account created (placeholder)');
        // after signup you might redirect to login:
        // window.location.href = 'login.html';
      } else {
        alert('Please complete all required fields.');
      }
    });
  }

  /* -----------------------------------
     OPTIONAL: Mobile menu placeholder (if you add a .menu-btn)
  ----------------------------------- */
  const menuBtn = document.querySelector('.menu-btn');
  const navEl = document.querySelector('.main-nav, .navbar nav');
  if (menuBtn && navEl) {
    menuBtn.addEventListener('click', () => {
      navEl.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
  }

}); // DOMContentLoaded
