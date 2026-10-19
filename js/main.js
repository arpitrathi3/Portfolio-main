/**
 * Arpit Rathi — Premium Personal Portfolio JavaScript
 * Interactive functionality: active navigation, clipboard copy, mobile menu,
 * scroll reveal, contact form handling, and live photo preview.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. NAVBAR SCROLL EFFECT
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar blur and shadow
    if (scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. ACTIVE NAVIGATION TRACKING
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop nav
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update mobile nav
        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => navObserver.observe(section));

  // 4. MOBILE HAMBURGER MENU
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) {
      mobileDrawer?.classList.remove('open');
      mobileToggle?.classList.remove('active');
      mobileBackdrop?.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileDrawer?.classList.add('open');
      mobileToggle?.classList.add('active');
      mobileBackdrop?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    mobileDrawer?.classList.remove('open');
    mobileToggle?.classList.remove('active');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', toggleMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 5. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  const showToast = (message, duration = 3000) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // 6. COPY EMAIL FUNCTIONALITY
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email, [data-copy-email]');
  const userEmail = 'rathiarpit877@gmail.com';

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(userEmail);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = userEmail;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast('Email copied to clipboard: ' + userEmail);
      } catch (err) {
        showToast('Failed to copy. Email: ' + userEmail);
      }
    });
  });

  // 7. PHOTO PLACEHOLDER & LIVE PREVIEW FEATURE
  // By default, this area is 100% blank placeholder with no images, as requested.
  // The file input allows the owner to test their photo live in the browser!
  const photoFrame = document.getElementById('photo-frame');
  const photoInput = document.getElementById('photo-upload-input');
  const previewImg = document.getElementById('user-custom-photo');
  const previewControls = document.getElementById('photo-preview-controls');
  const resetBtn = document.getElementById('btn-reset-photo');
  const placeholderContent = document.getElementById('photo-placeholder-content');

  if (photoFrame && photoInput && previewImg) {
    // Clicking placeholder opens file picker
    photoFrame.addEventListener('click', (e) => {
      // Don't re-trigger if clicking reset button
      if (e.target.closest('#btn-reset-photo')) return;
      photoInput.click();
    });

    // Handle drag and drop
    photoFrame.addEventListener('dragover', (e) => {
      e.preventDefault();
      photoFrame.style.borderColor = 'var(--accent-primary)';
      photoFrame.style.boxShadow = '0 0 30px rgba(163, 230, 53, 0.4)';
    });

    photoFrame.addEventListener('dragleave', () => {
      photoFrame.style.borderColor = '';
      photoFrame.style.boxShadow = '';
    });

    photoFrame.addEventListener('drop', (e) => {
      e.preventDefault();
      photoFrame.style.borderColor = '';
      photoFrame.style.boxShadow = '';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        loadPhotoPreview(e.dataTransfer.files[0]);
      }
    });

    // File selected
    photoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadPhotoPreview(e.target.files[0]);
      }
    });

    // Reset button
    resetBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      previewImg.src = '';
      previewImg.style.display = 'none';
      if (placeholderContent) placeholderContent.style.display = 'flex';
      if (previewControls) previewControls.style.display = 'none';
      photoInput.value = '';
      showToast('Restored blank placeholder.');
    });
  }

  function loadPhotoPreview(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewImg && placeholderContent && previewControls) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
        placeholderContent.style.display = 'none';
        previewControls.style.display = 'flex';
        showToast('Photo preview loaded! (Tip: Set src in HTML for permanent display)');
      }
    };
    reader.readAsDataURL(file);
  }

  // 8. SKILLS CATEGORY FILTER
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 9. CONTACT FORM HANDLING
  // Transparent, non-misleading handling: Validates fields and generates direct mailto
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const subject = subjectInput?.value.trim() || 'Portfolio Inquiry for Arpit Rathi';
    const message = messageInput?.value.trim() || '';

    // Validation
    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.className = 'form-status-message error';
        formStatus.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        formStatus.style.display = 'flex';
      }
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (formStatus) {
        formStatus.className = 'form-status-message error';
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.display = 'flex';
      }
      return;
    }

    // Prepare direct mailto URL
    const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
    const emailBody = encodeURIComponent(
      `Hi Arpit,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Arpit Rathi Portfolio Contact Form`
    );

    const mailtoUrl = `mailto:${userEmail}?subject=${emailSubject}&body=${emailBody}`;

    if (formStatus) {
      formStatus.className = 'form-status-message info';
      formStatus.innerHTML = `<span>Opening your email client to send to <strong>${userEmail}</strong>...</span>`;
      formStatus.style.display = 'flex';
    }

    // Trigger email client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);

    // Provide helpful status note
    setTimeout(() => {
      if (formStatus) {
        formStatus.className = 'form-status-message success';
        formStatus.innerHTML = `<span>Email client launched! You can also email directly to <strong>${userEmail}</strong>.</span>`;
      }
    }, 2000);
  });

  // 10. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  // Activate scroll-reveal transitions safely after DOM ready
  document.body.classList.add('js-loaded');

  revealElements.forEach((el) => {
    // If element is already in viewport, reveal it immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });
});
