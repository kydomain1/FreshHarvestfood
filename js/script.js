// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate toggle button
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (nav.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
}

// Get articles for filtering
const articlesGrid = document.getElementById('articlesGrid');
let allArticles = [];

if (articlesGrid) {
    allArticles = Array.from(document.querySelectorAll('.article-card'));
}

// Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
let activeCategory = 'all';

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get selected category
        activeCategory = button.dataset.category;
        
        // Filter articles
        filterArticles();
    });
});

// Filter Articles Function (by category only, search redirects to search page)
function filterArticles() {
    allArticles.forEach(article => {
        const category = article.dataset.category;
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        
        if (matchesCategory) {
            article.style.display = 'block';
            article.style.animation = 'fadeIn 0.6s ease-out';
        } else {
            article.style.display = 'none';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        }
        
        lastScroll = currentScroll;
    });
}

// Form submission handling (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        successMessage.style.cssText = `
            background: #B8D9C5;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 30px;
            margin-top: 1rem;
            text-align: center;
            animation: fadeInUp 0.6s ease-out;
        `;
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.6s ease-out';
            setTimeout(() => successMessage.remove(), 600);
        }, 5000);
    });
}

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

