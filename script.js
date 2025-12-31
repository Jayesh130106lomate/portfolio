// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

// Create backdrop for mobile menu
const backdrop = document.createElement('div');
backdrop.className = 'menu-backdrop';
document.body.appendChild(backdrop);

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    backdrop.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking backdrop
backdrop.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Profile Image Toggle
const imageFrame = document.getElementById('imageFrame');
const profileIcon = document.getElementById('profileIcon');
const profilePhoto = document.getElementById('profilePhoto');

if (imageFrame && profileIcon && profilePhoto) {
    imageFrame.addEventListener('click', () => {
        profileIcon.classList.toggle('hide');
        profilePhoto.classList.toggle('show');
    });
}

// Matrix Rain Effect
const matrixBg = document.getElementById('matrixBg');

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    matrixBg.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createMatrixRain();

// Typing Effect
const typedTextElement = document.getElementById('typedText');
const texts = [
    'Ethical Hacker',
    'Web Pentester',
    'Security Researcher',
    'Bug Hunter',
    'CTF Player'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

typeText();

// Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-box')) {
                const statNumber = entry.target.querySelector('.stat-number');
                animateCounter(statNumber);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card, .project-card, .stat-box, .achievement-card').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Smooth Scroll
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

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create a simple alert for demonstration
    // In production, you would send this to a backend
    alert(`Message sent!\n\nName: ${data.name}\nEmail: ${data.email}\n\nThank you for contacting me. I'll get back to you soon!`);
    
    contactForm.reset();
    
    // Optional: Add your email service integration here
    // Example using EmailJS or similar service
    /*
    emailjs.send('service_id', 'template_id', data)
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        });
    */
});

// Cursor Trail Effect (Optional)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '5px';
    cursor.style.height = '5px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'var(--primary-color)';
    cursor.style.pointerEvents = 'none';
    cursor.style.opacity = '0.5';
    cursor.style.zIndex = '9999';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.transition = 'opacity 0.5s';
        cursor.style.opacity = '0';
        setTimeout(() => cursor.remove(), 500);
    }, 100);
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.padding = '2rem';
    message.style.background = 'var(--card-bg)';
    message.style.border = '2px solid var(--primary-color)';
    message.style.borderRadius = '10px';
    message.style.zIndex = '10000';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 0 50px var(--primary-color)';
    message.innerHTML = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🎉 Easter Egg Found! 🎉</h2>
        <p>You've discovered the secret! Stay curious, stay hacking!</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 10px 20px; background: var(--primary-color); border: none; color: var(--dark-bg); cursor: pointer; border-radius: 5px; font-family: var(--font-mono);">Awesome!</button>
    `;
    
    document.body.appendChild(message);
    
    // Add sparkle effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.width = '5px';
            sparkle.style.height = '5px';
            sparkle.style.background = 'var(--primary-color)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'pulse 1s ease-out';
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

// Performance: Lazy load images if added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console Easter Egg
console.log('%c🔐 Welcome, Hacker! 🔐', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cLooking for secrets? Try the Konami Code! ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00ff41; font-size: 14px;');
console.log('%cStay curious, stay ethical! - Jayesh', 'color: #00ff41; font-size: 12px;');

// 3D Badge Carousel
const carousel = document.getElementById('badgeCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicator = document.getElementById('carouselIndicator');

if (carousel && prevBtn && nextBtn) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    const angleStep = 360 / totalItems;
    
    // Position items in 3D circle
    function updateCarousel() {
        items.forEach((item, index) => {
            const angle = angleStep * (index - currentIndex);
            const radians = angle * (Math.PI / 180);
            const x = Math.sin(radians) * 300;
            const z = Math.cos(radians) * 300;
            const scale = Math.cos(radians) * 0.5 + 0.5;
            const opacity = Math.cos(radians) * 0.5 + 0.5;
            
            item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = Math.round(z);
        });
        
        indicator.textContent = `${currentIndex + 1} / ${totalItems}`;
    }
    
    // Navigation
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Auto-rotate
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 3000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 3000);
    });
    
    // Initialize
    updateCarousel();
}
