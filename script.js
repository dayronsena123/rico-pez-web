/**
 * RICO PEZ - MAIN SCRIPT
 * Handles navigation, animations, and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initFAQ();
  initMenuPage(); // Initialize menu specific logic if present
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.bars');
  const navBar = document.querySelector('.nav-bar');
  const navLinks = document.querySelectorAll('.nav-bar ul li a');

  if (menuBtn && navBar) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
      navBar.classList.toggle('active');
      menuBtn.classList.toggle('active'); // Optional: animate burger to X
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navBar.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navBar.contains(e.target) && !menuBtn.contains(e.target) && navBar.classList.contains('active')) {
        navBar.classList.remove('active');
        menuBtn.classList.remove('active');
      }
    });
  }
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * FAQ Accordion Logic
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', () => {
        // Close other open items (Accordion behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

/**
 * Menu Page Logic (Filtering & Modal)
 */
function initMenuPage() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const platos = document.querySelectorAll('.plato');

  // Filtering
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        platos.forEach(p => {
          if (filter === 'all') {
            p.style.display = '';
            // Add animation for re-appearing items
            p.style.animation = 'none';
            p.offsetHeight; /* trigger reflow */
            p.style.animation = 'fadeIn 0.5s ease-out forwards';
          } else {
            if (p.getAttribute('data-category') === filter) {
              p.style.display = '';
              p.style.animation = 'none';
              p.offsetHeight; /* trigger reflow */
              p.style.animation = 'fadeIn 0.5s ease-out forwards';
            } else {
              p.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Modal Logic
  const modal = document.getElementById('modalViewer');
  if (modal) {
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalWhatsapp = document.getElementById('modalWhatsapp');
    const closeBtn = document.getElementById('modalClose');

    // Open Modal (Button & Image Click)
    const openModal = (img, title, desc) => {
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Update WhatsApp link in modal
      const numero = '51988093255';
      const mensaje = encodeURIComponent(`Hola, quiero pedir: ${title}`);
      modalWhatsapp.href = `https://wa.me/${numero}?text=${mensaje}`;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    };

    // Attach to Buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.getAttribute('data-img');
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        openModal(img, title, desc);
      });
    });

    // Attach to Images (New Feature)
    document.querySelectorAll('.plato').forEach(card => {
      const imgContainer = card.querySelector('.plato-img-container');
      const btn = card.querySelector('.btn-view');

      if (imgContainer && btn) {
        imgContainer.addEventListener('click', () => {
          const img = btn.getAttribute('data-img');
          const title = btn.getAttribute('data-title');
          const desc = btn.getAttribute('data-desc');
          openModal(img, title, desc);
        });
      }
    });

    // Close Modal
    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

/**
 * WhatsApp Order Helper
 * Called directly from HTML buttons if needed, or attached via event listeners.
 */
function pedirPorWhatsapp(plato) {
  const numero = '51988093255';
  const mensaje = encodeURIComponent(`Hola, quiero pedir: ${plato}`);
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, '_blank');
}
