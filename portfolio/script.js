document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typewriter Effect --- */
    const roles = [
        "Ethical Hacking.",
        "Web Development.",
        "Network Security.",
        "Vulnerability Analysis."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Dynamic typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end of the word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typewriter effect
    setTimeout(typeEffect, 1000);


    /* --- 2. Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: Stop observing after reveal if you only want it to happen once
                // observer.unobserve(entry.target); 
            } else {
                // Remove class when out of view to animate again when scrolling back up
                entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 3. Custom Navbar Scroll Behavior & Active Links --- */
    const nav = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) { // Offset for navbar
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });


    /* --- 4. Mobile Menu Toggle --- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});
