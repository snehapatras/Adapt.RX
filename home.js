// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Announcement Bar Slider
    const announcements = document.querySelectorAll('.announcement-slider p');
    let currentAnnouncement = 0;

    function rotateAnnouncements() {
        announcements.forEach(a => a.style.display = 'none');
        currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
        announcements[currentAnnouncement].style.display = 'block';
    }

    if(announcements.length > 1) {
        setInterval(rotateAnnouncements, 5000);
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                removeError(input);
            }

            if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            form.reset();
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message') || 
                        document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorDiv);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }

    // Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
            showCartNotification();
        });
    });

    function showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Item added to cart!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Language Selector
    const languageSelector = document.querySelector('.language-selector');
    if(languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            // Here you would typically handle language change
            console.log('Language changed to:', e.target.value);
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltipDiv = document.createElement('div');
            tooltipDiv.className = 'tooltip';
            tooltipDiv.textContent = tooltipText;
            document.body.appendChild(tooltipDiv);

            const rect = e.target.getBoundingClientRect();
            tooltipDiv.style.top = `${rect.top - tooltipDiv.offsetHeight - 10}px`;
            tooltipDiv.style.left = `${rect.left + (rect.width/2) - (tooltipDiv.offsetWidth/2)}px`;
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Add these styles to your CSS
const styles = `
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .error {
        border-color: #dc3545 !important;
    }

    .cart-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .tooltip {
        position: fixed;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        pointer-events: none;
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 