(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Main offer carousel
  const slides = $$('.hero-slide');
  const dots = $$('.hero-dot');
  let currentSlide = 0;
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.go))));
  $('.hero-arrow.next')?.addEventListener('click', () => showSlide(currentSlide + 1));
  $('.hero-arrow.prev')?.addEventListener('click', () => showSlide(currentSlide - 1));

  // Responsive navigation
  const menuButton = $('.menu-toggle');
  const mobileNav = $('.mobile-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
    menuButton.textContent = open ? '×' : '☰';
  });
  $$('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  }));

  // Booking tabs
  $$('.booking-tab').forEach(tab => tab.addEventListener('click', () => {
    const name = tab.dataset.tab;
    $$('.booking-tab').forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    $$('.booking-panel').forEach(panel => {
      const active = panel.id === `panel-${name}`;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  }));

  // Trip type and route switch
  const returnField = $('.return-field');
  $$('input[name="tripType"]').forEach(radio => radio.addEventListener('change', () => {
    const oneWay = radio.checked && radio.value === 'one';
    if (oneWay) {
      returnField.classList.add('disabled');
      $('input[name="return"]').required = false;
      $('input[name="return"]').disabled = true;
    } else if (radio.checked) {
      returnField.classList.remove('disabled');
      $('input[name="return"]').required = true;
      $('input[name="return"]').disabled = false;
    }
  }));
  $('#swap-route')?.addEventListener('click', () => {
    const from = $('select[name="origin"]');
    const to = $('select[name="destination"]');
    const old = from.value;
    from.value = to.value;
    to.value = old;
  });

  const today = new Date();
  const isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(input => { input.min = isoToday; });

  // The original page relies on Aer Lingus' private booking systems. These
  // forms are working front-end demonstrations until the Roblox flight API is connected.
  function showFormMessage(form, message) {
    const target = $('.form-message', form);
    if (target) target.textContent = message;
  }
  $('#flight-search')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('origin') === data.get('destination')) {
      showFormMessage(form, 'Please choose two different airports.');
      return;
    }
    if (data.get('tripType') !== 'one' && data.get('return') < data.get('departure')) {
      showFormMessage(form, 'Return date must be on or after the departure date.');
      return;
    }
    showFormMessage(form, 'Your search details are ready. Connect your Roblox flight schedule/API to display available virtual flights.');
  });
  ['manage-form', 'checkin-form', 'status-form'].forEach(id => {
    $('#' + id)?.addEventListener('submit', event => {
      event.preventDefault();
      showFormMessage(event.currentTarget, 'This section is ready for your Roblox flight database integration. No real Aer Lingus booking has been accessed.');
    });
  });
  $('#newsletter-form')?.addEventListener('submit', event => {
    event.preventDefault();
    showFormMessage(event.currentTarget, 'Thanks. Newsletter sign-up will be enabled when an email service is connected.');
    event.currentTarget.reset();
  });
})();