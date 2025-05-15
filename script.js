// navbar 

document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
        
        // Smooth scroll
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });

  // Update active nav link on scroll
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Initialize
  updateActiveNavLink();
});


// Initialize AOS with refined settings
AOS.init({
  duration: 800,
  once: true,
  mirror: false,
  easing: 'ease-in-out-quad',
  anchorPlacement: 'top-bottom'
});

// Configure and initialize particles.js with optimized settings
function initParticles() {
  if (!window.particlesJS) return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ["#ff6b35", "#ffa43a", "#ffdd67"]
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#ff6b35",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}


// Enhanced Typewriter Effect
class TypeWriter {
  constructor(element, phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
    this.element = element;
    this.phrases = phrases;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.pauseTime = pauseTime;
    this.currentPhrase = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.timeout = null;
  }

  type() {
    const fullTxt = this.phrases[this.currentPhrase];

    if (this.isDeleting) {
      this.element.textContent = fullTxt.substring(0, this.currentChar - 1);
      this.currentChar--;
    } else {
      this.element.textContent = fullTxt.substring(0, this.currentChar + 1);
      this.currentChar++;
    }

    let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.currentChar === fullTxt.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false;
      this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      typeSpeed = 500;
    }

    this.timeout = setTimeout(() => this.type(), typeSpeed);
  }

  start() {
    clearTimeout(this.timeout);
    this.type();
  }
}

// Smooth Scroll Navigation
function initSmoothScroll() {
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 800, 'easeInOutQuad');
      $('.navbar-collapse').collapse('hide');
    }
  });
}

// Dynamic Navbar Effects
function initNavbarEffects() {
  const navbar = $('.navbar');
  const heroSection = $('.hero-section');
  const heroHeight = heroSection.outerHeight();

  $(window).scroll(function () {
    const scrollPos = $(this).scrollTop();

    if (scrollPos > heroHeight * 0.7) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }

    const aboutSection = $('.about-section');
    const aboutPosition = aboutSection.offset().top;
    const aboutHeight = aboutSection.outerHeight();

    if (scrollPos > aboutPosition - window.innerHeight * 0.7) {
      aboutSection.addClass('section-active');
    }

    $('section').each(function () {
      const sectionTop = $(this).offset().top - 100;
      const sectionBottom = sectionTop + $(this).outerHeight();

      if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
        const id = $(this).attr('id');
        $('nav a').removeClass('active');
        $('nav a[href="#' + id + '"]').addClass('active');
      }
    });
  });
}

// Enhanced Timeline Scroll Animation
function initTimelineScroll() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const isEven = item.classList.contains('timeline-item') &&
          Array.from(item.parentNode.children).indexOf(item) % 2 !== 0;

        item.classList.remove('aos-init', 'aos-animate');
        item.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';

        if (isEven) {
          item.style.transform = 'translateX(20px)';
        } else {
          item.style.transform = 'translateX(-20px)';
        }
        item.style.opacity = '0';

        setTimeout(() => {
          item.style.transform = 'translateX(0)';
          item.style.opacity = '1';
        }, 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  timelineItems.forEach(item => observer.observe(item));
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initParticles();

  const typewriter = new TypeWriter(
    document.querySelector('.typewriter-wrapper h3'),
    ["Java Full Stack Developer"],
    100,
    50,
    1500
  );

  setTimeout(() => typewriter.start(), 1500);

  initSmoothScroll();
  initNavbarEffects();
  initTimelineScroll(); // ✅ Timeline animation init
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      initParticles();
    }
  }, 250);
});

// Skills Animation
// Skills Progress Animation
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillProgress = entry.target.querySelector('.skill-progress');
        const level = skillProgress.getAttribute('data-level');
        
        // Remove any existing transition
        skillProgress.style.transition = 'none';
        skillProgress.style.width = '0';
        
        // Force reflow
        void skillProgress.offsetWidth;
        
        // Animate to the actual level
        skillProgress.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
        skillProgress.style.width = level;
        
        // Unobserve after animation
        setTimeout(() => {
          observer.unobserve(entry.target);
        }, 1500);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });

  skillItems.forEach(item => {
    observer.observe(item);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateSkills();
  
  // Add hover effect for icons
  const skillIcons = document.querySelectorAll('.skill-icon');
  skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style
      .transform = 'rotate(15deg) scale(1.1)';
    });
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'rotate(0) scale(1)';
    });
  });
});

// Projects Section Animation
// Initialize AOS animations for projects
AOS.init({
  duration: 800,
  easing: 'ease-out-quad',
  once: true
});

// Smooth hover transitions
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
});

// contact section
document.addEventListener('DOMContentLoaded', function() {
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  const btnSend = contactForm.querySelector('.btn-send');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Show loading state
      btnSend.innerHTML = 'Sending...';
      btnSend.disabled = true;
      
      // You can add additional form validation here if needed
      
      // FormSubmit will handle the actual submission
      // The redirect will happen via the _next parameter
    });
  }
  
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true
  });
  
  // Add hover effect to contact items
  const contactItems = document.querySelectorAll('.contact-info-item');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.contact-icon').style.transform = 'rotate(15deg)';
    });
    item.addEventListener('mouseleave', function() {
      this.querySelector('.contact-icon').style.transform = 'rotate(0)';
    });
  });
});