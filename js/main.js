/* ENVARTA SURGICAL — shared site behaviour */
(function () {
  'use strict';

  /* Gmail web-compose link — opens Gmail itself rather than whatever
     the OS has set as the default mail client (e.g. Outlook). */
  function gmailLink(subject, body, to) {
    to = to || 'envartasurgical@gmail.com';
    var url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to);
    if (subject) url += '&su=' + encodeURIComponent(subject);
    if (body) url += '&body=' + encodeURIComponent(body);
    return url;
  }

  /* ---------------- sticky nav ---------------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- mobile menu ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------- active nav link ---------------- */
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link, .mobile-menu a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop();
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* ---------------- scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- image placeholder fallback ---------------- */
  /* Any <img> that fails to load (because real product photography has
     not been added yet) gracefully turns into a labeled placeholder
     showing the exact path to drop the real file into. */
  document.querySelectorAll('.media img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      var wrap = img.closest('.media');
      if (wrap) wrap.classList.add('ph');
    }, { once: true });
  });

  /* ==================================================================
     PRODUCTS PAGE — category filter + detail modal
     ================================================================== */
  var grid = document.querySelector('[data-product-grid]');
  if (grid) {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.product-card');
    var categoryBlocks = document.querySelectorAll('[data-category-block]');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var target = btn.getAttribute('data-filter');

        if (target === 'all') {
          categoryBlocks.forEach(function (block) { block.style.display = ''; });
          cards.forEach(function (c) { c.classList.remove('is-hidden'); });
        } else {
          categoryBlocks.forEach(function (block) {
            block.style.display = (block.getAttribute('data-category-block') === target) ? '' : 'none';
          });
        }
      });
    });

    /* ---- modal ---- */
    var overlay = document.querySelector('.modal-overlay');
    var modalMediaImg = document.querySelector('[data-modal-img]');
    var modalMediaPh = document.querySelector('[data-modal-ph]');
    var modalCat = document.querySelector('[data-modal-cat]');
    var modalTitle = document.querySelector('[data-modal-title]');
    var modalEnquire = document.querySelector('[data-modal-enquire]');
    var lastFocused = null;

    function openModal(card) {
      var name = card.getAttribute('data-name');
      var cat = card.getAttribute('data-cat');
      var img = card.getAttribute('data-img');

      modalCat.textContent = cat;
      modalTitle.textContent = name;

      modalMediaImg.src = img;
      modalMediaImg.alt = name;
      modalMediaImg.closest('.media').classList.remove('ph');

      var subject = 'Inquiry – ' + name;
      var body = 'Hello Envarta Surgical,\n\nI am interested in learning more about:\n' + name +
        '\n\nPlease provide further information.\n\nThank you.';
      modalEnquire.href = gmailLink(subject, body);

      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.modal-close').focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () { openModal(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
      });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    });
  }

  /* ==================================================================
     CONTACT PAGE — open Gmail in a new tab with filled contact details
     ================================================================== */
  var form = document.querySelector('[data-contact-form]');
  var successModal = document.querySelector('#inquiry-success-modal');

  // Modal close function
  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(function () {
      successModal.setAttribute('hidden', '');
    }, 350);
  }

  // Setup modal close triggers
  if (successModal) {
    var closeBtn = successModal.querySelector('#inquiry-modal-close');
    var doneBtn = successModal.querySelector('#inquiry-modal-done-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeSuccessModal);
    if (doneBtn) {
      doneBtn.addEventListener('click', function () {
        if (form) form.reset();
        closeSuccessModal();
      });
    }

    successModal.addEventListener('click', function (e) {
      if (e.target === successModal) closeSuccessModal();
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && successModal.classList.contains('is-active')) {
        closeSuccessModal();
      }
    });
  }

  if (form) {
    var nameInput = form.querySelector('#name');
    var orgInput = form.querySelector('#organization');
    var phoneInput = form.querySelector('#phone');
    var emailInput = form.querySelector('#email');
    var messageInput = form.querySelector('#message');
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('#submit-inquiry-btn') || form.querySelector('button[type="submit"]');

    // Clear validation styling when user types
    [nameInput, emailInput, messageInput, orgInput, phoneInput].forEach(function (inp) {
      if (!inp) return;
      inp.addEventListener('input', function () {
        inp.classList.remove('is-invalid');
        if (statusEl && statusEl.classList.contains('error')) {
          statusEl.classList.remove('is-visible', 'error');
          statusEl.textContent = '';
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameVal = (nameInput ? nameInput.value.trim() : '');
      var orgVal = (orgInput ? orgInput.value.trim() : '');
      var phoneVal = (phoneInput ? phoneInput.value.trim() : '');
      var emailVal = (emailInput ? emailInput.value.trim() : '');
      var messageVal = (messageInput ? messageInput.value.trim() : '');

      // Validation
      var isValid = true;
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal) {
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
      }
      if (!emailVal || !emailPattern.test(emailVal)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      }
      if (!messageVal) {
        if (messageInput) messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        if (statusEl) {
          statusEl.textContent = 'Please fill in your name, a valid email address, and your message.';
          statusEl.className = 'form-status is-visible error';
        }
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Format subject line
      var subject = 'Product Inquiry from ' + nameVal + (orgVal ? ' (' + orgVal + ')' : '') + ' – Envarta Surgical';

      var body = 'Hello Envarta Surgical Team,\n\n' + 
  'I would like to inquire about your surgical implant products and services.\n\n' + 
  'Contact Details\n' +
  'Name: ' + nameVal + '\n' + 
  'Organization / Hospital: ' + (orgVal || 'Not specified') + '\n' + 
  'Phone: ' + (phoneVal || 'Not specified') + '\n' + 
  'Email: ' + emailVal + '\n\n' + 
  'Message and Requirentments\n' +
  messageVal + '\n\n' + 
  'Thank you,\n' + 
  nameVal;

var gmailUrl = gmailLink(subject, body, 'envartasurgical@gmail.com');

      // Open Gmail composer in a new tab immediately in response to user click
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      // Populate details into the confirmation modal
      if (successModal) {
        var modalUser = successModal.querySelector('#modal-user-name');
        var modalUserVal = successModal.querySelector('#modal-user-name-val');
        var modalMail = successModal.querySelector('#modal-user-email');
        var modalPhone = successModal.querySelector('#modal-user-phone');
        var modalOrg = successModal.querySelector('#modal-user-org');
        var modalPhoneRow = successModal.querySelector('#modal-phone-row');
        var modalOrgRow = successModal.querySelector('#modal-org-row');
        var modalGmailBtn = successModal.querySelector('#modal-open-gmail-btn');

        if (modalUser) modalUser.textContent = nameVal;
        if (modalUserVal) modalUserVal.textContent = nameVal;
        if (modalMail) {
          modalMail.textContent = emailVal;
          modalMail.href = 'mailto:' + encodeURIComponent(emailVal);
        }

        if (modalPhone && modalPhoneRow) {
          if (phoneVal) {
            modalPhone.textContent = phoneVal;
            // Clean phone number for tel: protocol (keeps digits and leading +)
            var cleanPhone = phoneVal.replace(/[^\d+]/g, '');
            modalPhone.href = 'tel:' + cleanPhone;
            modalPhoneRow.style.display = '';
          } else {
            modalPhoneRow.style.display = 'none';
          }
        }
        if (modalOrg && modalOrgRow) {
          if (orgVal) {
            modalOrg.textContent = orgVal;
            modalOrgRow.style.display = '';
          } else {
            modalOrgRow.style.display = 'none';
          }
        }

        if (modalGmailBtn) {
          modalGmailBtn.href = gmailUrl;
        }

        successModal.removeAttribute('hidden');
        void successModal.offsetWidth;
        successModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';

        var doneBtnEl = successModal.querySelector('#inquiry-modal-done-btn');
        if (doneBtnEl) doneBtnEl.focus();
      }

      if (statusEl) {
        statusEl.className = 'form-status is-visible';
        statusEl.textContent = 'Gmail composer opened in a new tab with your pre-filled inquiry.';
      }
    });
  }

})();
