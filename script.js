/*=============== PORTFOLIO WEBSITE JAVASCRIPT ===============*/

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Mobile Navigation Menu Toggle
 * Handles opening and closing of the mobile navigation menu
 */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu when toggle button is clicked
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Hide menu when close button is clicked
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/**
 * Close mobile menu when clicking on nav links
 * Provides better UX by auto-closing menu after selection
 */
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

// ===== SMOOTH SCROLLING NAVIGATION =====

/**
 * Smooth scroll to sections when navigation links are clicked
 * Enhanced smooth scrolling with offset for fixed header
 */
function smoothScrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  const headerHeight = document.querySelector('.header').offsetHeight;
  
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Add smooth scroll to all navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    
    if (targetId.startsWith('#')) {
      smoothScrollToSection(targetId);
    }
  });
});

// ===== HEADER SCROLL EFFECTS =====

/**
 * Add blur effect to header when scrolling
 * Creates a modern glassmorphism effect
 */
function handleHeaderScroll() {
  const header = document.getElementById('header');
  const scrollY = window.pageYOffset;
  
  if (scrollY >= 50) {
    header.classList.add('blur-header');
  } else {
    header.classList.remove('blur-header');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

// ===== ACTIVE NAVIGATION HIGHLIGHT =====

/**
 * Highlight active navigation link based on scroll position
 * Updates navigation to show current section
 */
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active-link');
    } else {
      navLink?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', highlightActiveNavLink);

// ===== PROJECT FILTERING SYSTEM =====

/**
 * Advanced project filtering with smooth animations
 * Allows users to filter projects by technology category
 */
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter__btn');
    this.projectCards = document.querySelectorAll('.project__card');
    this.init();
  }
  
  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleFilter(btn));
    });
  }
  
  handleFilter(clickedBtn) {
    const filter = clickedBtn.getAttribute('data-filter');
    
    // Update active filter button
    this.updateActiveButton(clickedBtn);
    
    // Filter projects with animation
    this.filterProjects(filter);
  }
  
  updateActiveButton(activeBtn) {
    this.filterButtons.forEach(btn => {
      btn.classList.remove('filter__btn--active');
    });
    activeBtn.classList.add('filter__btn--active');
  }
  
  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        card.classList.remove('hide');
        // Add entrance animation
        setTimeout(() => {
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
        }, 100);
      } else {
        card.classList.add('hide');
      }
    });
  }
}

// Initialize project filtering
document.addEventListener('DOMContentLoaded', () => {
  new ProjectFilter();
});

// ===== SCROLL ANIMATION SYSTEM =====

/**
 * Intersection Observer for scroll-triggered animations
 * Animates elements as they come into view
 */
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }
  
  init() {
    // Create observers for different animation types
    this.createFadeInObserver();
    this.createSkillBarObserver();
    this.createCountUpObserver();
  }
  
  createFadeInObserver() {
    const fadeElements = document.querySelectorAll('.section__header, .about__info, .contact__info, .project__card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll', 'animated');
        }
      });
    }, this.observerOptions);
    
    fadeElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      fadeObserver.observe(el);
    });
  }
  
  createSkillBarObserver() {
    const skillSection = document.querySelector('.about__skills');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skills = entry.target.querySelectorAll('.skill');
          skills.forEach((skill, index) => {
            setTimeout(() => {
              skill.classList.add('animate');
            }, index * 200);
          });
        }
      });
    }, this.observerOptions);
    
    if (skillSection) {
      skillObserver.observe(skillSection);
    }
  }
  
  createCountUpObserver() {
    // Add count-up animation for any numerical stats if needed
    // This can be extended for portfolio metrics
  }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
});

// ===== CONTACT FORM HANDLING =====

/**
 * Contact form submission with validation and user feedback
 * Includes form validation and success/error handling
 */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.addInputValidation();
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()) {
      this.submitForm();
    }
  }
  
  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
        this.showFieldError(field, 'Please enter a valid email address');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });
    
    return isValid;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form__error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
  }
  
  clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.form__error');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '';
  }
  
  addInputValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          this.showFieldError(input, 'This field is required');
        } else if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
          this.showFieldError(input, 'Please enter a valid email address');
        } else {
          this.clearFieldError(input);
        }
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }
  
  async submitForm() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.showSuccessMessage();
      this.form.reset();
      
    } catch (error) {
      this.showErrorMessage();
      console.error('Form submission error:', error);
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
  
  showSuccessMessage() {
    this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
  }
  
  showErrorMessage() {
    this.showNotification('Something went wrong. Please try again later.', 'error');
  }
  
  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Debounce function for scroll events
 * Improves performance by limiting how often scroll handlers run
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
  handleHeaderScroll();
  highlightActiveNavLink();
}, 16)); // ~60fps

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Keyboard navigation support
 * Enhances accessibility for keyboard users
 */
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
  
  // Enter key activates buttons
  if (e.key === 'Enter' && e.target.classList.contains('filter__btn')) {
    e.target.click();
  }
});

/**
 * Focus management for better accessibility
 * Ensures proper focus handling throughout the site
 */
function manageFocus() {
  // Skip to main content functionality
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', manageFocus);

// ===== LAZY LOADING FOR IMAGES =====

/**
 * Intersection Observer for lazy loading images
 * Improves page load performance
 */
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ===== THEME PREFERENCES =====

/**
 * Respect user's motion preferences
 * Reduces animations for users who prefer reduced motion
 */
function respectMotionPreferences() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
  }
}

// Initialize motion preferences
document.addEventListener('DOMContentLoaded', respectMotionPreferences);

// ===== ERROR HANDLING =====

/**
 * Global error handler for better user experience
 * Catches and handles JavaScript errors gracefully
 */
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  
  // You can add user-friendly error notifications here
  // For production, consider sending error reports to a logging service
});

// ===== PROGRESSIVE ENHANCEMENT =====

/**
 * Feature detection and progressive enhancement
 * Ensures the site works even if JavaScript fails
 */
function checkFeatureSupport() {
  // Check for Intersection Observer support
  if (!('IntersectionObserver' in window)) {
    // Fallback: Show all animations immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animated');
    });
  }
  
  // Check for CSS Grid support
  if (!CSS.supports('display', 'grid')) {
    document.body.classList.add('no-grid');
  }
}

// Initialize feature detection
document.addEventListener('DOMContentLoaded', checkFeatureSupport);

// ===== INITIALIZATION =====

/**
 * Main initialization function
 * Runs when the DOM is fully loaded
 */
function initializePortfolio() {
  console.log('Portfolio website initialized successfully! 🚀');
  
  // Add any final initialization code here
  // All other functionality is already initialized through event listeners above
}

// Final initialization
document.addEventListener('DOMContentLoaded', initializePortfolio);