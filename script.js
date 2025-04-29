// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add particle background effect
    createParticleBackground();
    
    // Add reveal animations on scroll
    const elementsToAnimate = document.querySelectorAll('.chapter-card, .section-title, .symposium-description, .footer-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to chapter cards
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerYearElement = document.querySelector('.copyright p');
    if (footerYearElement) {
        footerYearElement.innerHTML = footerYearElement.innerHTML.replace('2025', currentYear);
    }
    
    // Create a countdown to the event (using Chapter 1 date: May 3, 2025)
    const eventDate = new Date('May 3, 2025 00:00:00').getTime();
    
    // Add countdown element to the page if it exists
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    const symposiumSection = document.querySelector('.symposium-section .container');
    if (symposiumSection) {
        symposiumSection.appendChild(countdownElement);
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result with animation
        countdownElement.innerHTML = `
            <h3>Event Countdown</h3>
            <div class="countdown-timer">
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            </div>
        `;
        
        // Add pulse animation to the seconds value
        const secondsValue = countdownElement.querySelector('.countdown-item:last-child .countdown-value');
        if (secondsValue) {
            secondsValue.classList.add('pulse-animation');
            setTimeout(() => {
                secondsValue.classList.remove('pulse-animation');
            }, 900);
        }
        
        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "<h3>The Event Has Started!</h3>";
        }
    }, 1000);
    
    // Add typing effect to the symposium title
    const symposiumTitle = document.querySelector('.section-title');
    if (symposiumTitle) {
        const originalText = symposiumTitle.textContent;
        symposiumTitle.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                symposiumTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                symposiumTitle.classList.add('title-glow');
            }
        }, 100);
    }
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.chapter-card').forEach(card => {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

// Function to create particle background
function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.prepend(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, #6200ea, #00e5ff);
            opacity: 0.3;
            pointer-events: none;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
        
        .pulse-animation {
            animation: pulse 1s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .title-glow {
            animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes glow {
            0% { text-shadow: 0 0 5px rgba(98, 0, 234, 0.5); }
            50% { text-shadow: 0 0 20px rgba(98, 0, 234, 0.8), 0 0 30px rgba(0, 229, 255, 0.6); }
            100% { text-shadow: 0 0 5px rgba(98, 0, 234, 0.5); }
        }
        
        .chapter-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .chapter-card.hovered {
            transform: translateY(-15px) scale(1.03);
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
}

// Function to create a single particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position, size and animation duration
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight + window.innerHeight;
    const duration = Math.random() * 60 + 30;
    const delay = Math.random() * 20;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animation = `float-particle ${duration}s linear infinite ${delay}s`;
    
    container.appendChild(particle);
}
