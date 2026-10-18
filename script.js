(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.topbar nav');
  menu.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // Slide/fade text into view as the visitor scrolls through each section.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.choice-grid > *, .three-cards article, .service-copy, .faq article, .contact-grid > *').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Gentle zoom/pan on large photographic panels.
  const movingImages = document.querySelectorAll('.service-main,.three-cards img,.choice-grid>img,.contact-grid img');
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('image-visible');
    });
  }, { threshold: 0.1 });
  movingImages.forEach(img => {
    img.style.transition = 'transform 1.4s cubic-bezier(.2,.7,.2,1)';
    img.style.transform = 'scale(1.015)';
    imageObserver.observe(img);
  });
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 760) return;
    movingImages.forEach(img => {
      const r = img.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const offset = Math.max(-5, Math.min(5, (window.innerHeight / 2 - (r.top + r.height / 2)) / 55));
        img.style.transform = `scale(1.04) translateY(${offset}px)`;
      }
    });
  }, { passive: true });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.status');
      if (status) status.textContent = 'Thank you. This demo form is ready to connect to your email service.';
      else {
        const p = document.createElement('p');
        p.className = 'status';
        p.textContent = 'Thank you. This demo form is ready to connect to your email service.';
        form.appendChild(p);
      }
      form.reset();
    });
  });
})();