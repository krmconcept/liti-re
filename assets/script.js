/* ============================================================
   PETCARE SMART — Main JavaScript v2.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  /* ===== 1. STICKY HEADER ===== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
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
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== 3. FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const hdr = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    if (!hdr || !body) return;

    hdr.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-body')?.classList.remove('open');
        other.querySelector('.faq-header')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        body.classList.add('open');
        hdr.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===== 4. SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '80'
        );
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 20, behavior: 'smooth' });
      }
    });
  });

  /* ===== 5. SCROLL REVEAL (.reveal class) ===== */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  /* ===== 6. STAGGER CHILDREN (cards, grid items) ===== */
  if (prefersMotion && 'IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('[class*="card"], .benefit-card, .feature-card, .testimonial-card, .problem-card');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
            child.classList.add('reveal', 'visible');
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.benefits-grid, .features-grid, .testimonials-grid, .problems-grid').forEach(grid => {
      staggerObserver.observe(grid);
    });
  }

  /* ===== 7. COUNTER ANIMATION ===== */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOutQuart(progress);
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && prefersMotion) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  } else {
    // No motion: just show final values
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const suffix = el.dataset.suffix || '';
      el.textContent = target.toFixed(decimals) + suffix;
    });
  }

  /* ===== 8. FLOATING ADD-TO-CART BAR ===== */
  const floatingAtc = document.querySelector('.floating-atc');
  const heroSection = document.querySelector('.hero-section');

  if (floatingAtc && heroSection && 'IntersectionObserver' in window) {
    const atcObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatingAtc.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    atcObserver.observe(heroSection);
  }

  /* ===== 9. PRODUCT GALLERY ===== */
  const galleryMain = document.querySelector('.gallery-main img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (galleryMain && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        const imgSrc = this.querySelector('img')?.src;
        if (imgSrc) {
          if (prefersMotion) {
            galleryMain.style.opacity = '0';
            galleryMain.style.scale = '0.97';
            setTimeout(() => {
              galleryMain.src = imgSrc;
              galleryMain.style.opacity = '';
              galleryMain.style.scale = '';
            }, 180);
          } else {
            galleryMain.src = imgSrc;
          }
          thumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
  }

  /* ===== 10. QUANTITY SELECTOR ===== */
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
      input.value = Math.max(1, Math.min(val, parseInt(input.max) || 99));
    });
  });

  /* ===== 11. CART COUNT ===== */
  function updateCartCount() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
        document.querySelectorAll('.cart-count').forEach(el => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'inline-flex' : 'none';
        });
      })
      .catch(() => {});
  }

  updateCartCount();

  /* ===== 12. ADD TO CART AJAX ===== */
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const variantId = this.dataset.variantId || this.closest('form')?.querySelector('[name="id"]')?.value;
      if (!variantId) return;

      const qty = document.querySelector('.qty-input')?.value || 1;
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Ajout en cours…';

      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', qty);

      fetch('/cart/add.js', { method: 'POST', body: formData })
        .then(r => {
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then(() => {
          btn.textContent = '✓ Ajouté au panier';
          btn.style.setProperty('--btn-bg', 'var(--green-dark, #6b7a52)');
          updateCartCount();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.removeProperty('--btn-bg');
            btn.disabled = false;
          }, 2200);
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

  /* ===== 13. HERO PARALLAX ===== */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && prefersMotion) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.03)`;
      }
    }, { passive: true });
  }

  /* ===== 14. LAZY IMAGES ===== */
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '120px' });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  /* ===== 15. COMPARISON TABLE HIGHLIGHT ===== */
  document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.classList.add('row-hover');
    });
    row.addEventListener('mouseleave', function () {
      this.classList.remove('row-hover');
    });
  });

});
