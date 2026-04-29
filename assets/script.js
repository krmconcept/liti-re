/* ============================================================
   PETCARE SMART — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== 1. STICKY HEADER ===== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ===== 2. MOBILE MENU ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== 3. FAQ ACCORDION ===== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (!header || !body) return;

    header.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.faq-body');
        if (otherBody) otherBody.classList.remove('open');
        other.querySelector('.faq-header')?.setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was closed
      if (!isActive) {
        item.classList.add('active');
        body.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===== 4. SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '80'
        );
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===== 5. LAZY LOADING IMAGES ===== */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /* ===== 6. ANIMATE ON SCROLL ===== */
  if ('IntersectionObserver' in window) {
    const animateEls = document.querySelectorAll('.animate-on-scroll');
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animateEls.forEach(el => animObserver.observe(el));
  }

  /* ===== 7. PRODUCT GALLERY ===== */
  const galleryMain = document.querySelector('.gallery-main img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (galleryMain && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        const imgSrc = this.querySelector('img')?.src;
        if (imgSrc) {
          galleryMain.src = imgSrc;
          thumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
  }

  /* ===== 8. QUANTITY SELECTOR ===== */
  document.querySelectorAll('.quantity-selector').forEach(selector => {
    const input = selector.querySelector('.qty-input');
    const minus = selector.querySelector('.qty-minus');
    const plus = selector.querySelector('.qty-plus');

    if (!input) return;

    minus?.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });

    plus?.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      const max = parseInt(input.max) || 99;
      if (val < max) input.value = val + 1;
    });

    input.addEventListener('change', () => {
      let val = parseInt(input.value) || 1;
      val = Math.max(1, Math.min(val, parseInt(input.max) || 99));
      input.value = val;
    });
  });

  /* ===== 9. CART COUNT UPDATE ===== */
  function updateCartCount() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
        const countEls = document.querySelectorAll('.cart-count');
        countEls.forEach(el => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'inline-flex' : 'none';
        });
      })
      .catch(() => {});
  }

  // Update cart count on page load
  updateCartCount();

  /* ===== 10. ADD TO CART AJAX ===== */
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const variantId = this.dataset.variantId || this.closest('form')?.querySelector('[name="id"]')?.value;
      if (!variantId) return;

      const qty = document.querySelector('.qty-input')?.value || 1;

      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = 'Ajout...';

      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', qty);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
        .then(r => {
          if (!r.ok) throw new Error('Erreur lors de l\'ajout au panier');
          return r.json();
        })
        .then(() => {
          btn.textContent = '✓ Ajouté !';
          btn.style.background = 'var(--green-dark)';
          updateCartCount();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 2000);
        })
        .catch(() => {
          btn.textContent = 'Erreur — Réessayer';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2500);
        });
    });
  });

  /* ===== 11. HERO PARALLAX (Subtle) ===== */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.25}px) scale(1.03)`;
      }
    }, { passive: true });
  }

  /* ===== 12. BEFORE/AFTER HOVER EFFECT ===== */
  const baSection = document.querySelector('.before-after-section');
  if (baSection) {
    baSection.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const bg = this.querySelector('.before-after-bg');
      if (bg) {
        bg.style.backgroundPositionX = `${50 + (x - 50) * 0.05}%`;
      }
    });
  }

  /* ===== 13. SMOOTH REVEAL ON SCROLL ===== */
  if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    sections.forEach(s => sectionObserver.observe(s));
  }

});
