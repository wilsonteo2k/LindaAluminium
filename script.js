
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Contact form — redirect to WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullname = this.querySelector('[name="fullname"]').value.trim();
    const phone    = this.querySelector('[name="phone"]').value.trim();
    const email    = this.querySelector('[name="email"]').value.trim();
    const message  = this.querySelector('[name="message"]').value.trim();

    const lines = [
        'Halo Linda Aluminium',
        '',
        `Nama: ${fullname}`,
        `Telepon: ${phone}`,
        ...(email ? [`Email: ${email}`] : []),
        '',
        'Pesan:',
        message
    ];
    const waNumber = '6282283318999';
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(lines.join('\n'))}`, '_blank');

    // Visual feedback
    const btn = this.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '✓ Opening WhatsApp...';
    btn.style.backgroundColor = '#25D366';
    btn.disabled = true;

    setTimeout(() => {
        this.reset();
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = '';
        btn.disabled = false;
    }, 3000);
});

// Add scroll-based navbar styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections with staggered delays
document.querySelectorAll('.service-card-new, .value-card, .team-card, .timeline-item, .advantage-item, .stat-box').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Add hover effect to buttons with ripple
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// Form input focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Product card expand/collapse
document.querySelectorAll('.product-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const dropdown = btn.nextElementSibling;

        btn.setAttribute('aria-expanded', !isOpen);
        dropdown.classList.toggle('open', !isOpen);

        const label = btn.querySelector('span');
        label.textContent = isOpen ? 'View types' : 'Hide types';
    });
});

// Product filter tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category').split(' ');
            const visible = filter === 'all' || categories.includes(filter);

            if (visible) {
                card.classList.remove('hidden');
                card.style.animationDelay = `${index * 0.05}s`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
