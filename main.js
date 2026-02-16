// Mobile menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Active link on click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        // Close mobile menu after clicking
        navbar.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// Active link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
        
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
            
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Image cursor tracking with 3D effect
const homeImg = document.querySelector('.home-img img');

if (homeImg) {
    homeImg.addEventListener('mousemove', (e) => {
        const rect = homeImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles (in degrees)
        const rotateY = ((x - centerX) / centerX) * 20; // Tilt left/right
        const rotateX = ((centerY - y) / centerY) * 20; // Tilt up/down
        
        homeImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    homeImg.addEventListener('mouseleave', () => {
        homeImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// About Section Cursor Tracking
const aboutImg = document.querySelector('.about-img img');

if (aboutImg) {
    aboutImg.addEventListener('mousemove', (e) => {
        const rect = aboutImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((centerY - y) / centerY) * 15;
        
        aboutImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    aboutImg.addEventListener('mouseleave', () => {
        aboutImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// Project box tilt effect based on cursor position
const projectBoxes = document.querySelectorAll('.projects-box');

projectBoxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
            
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
            
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
            
        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
        
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Typing Effect
const typingTexts = [
    "Full Stack Development",
    "Web Development",
    "Mobile Development",
    "Game Development"
];
    
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function type() {
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
        
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing, wait before deleting
        setTimeout(() => {
            isDeleting = true;
            type();
        }, delayBetweenTexts);
        return;
    }

    if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

// Scroll Animation for About Section
function handleScrollAnimation() {
    const aboutHeading = document.querySelector('.about .heading');
    const aboutImg = document.querySelector('.about-img');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutImg && aboutContent) {
        const aboutSection = document.querySelector('.about');
        const sectionTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Trigger animation when section is in view
        if (scrollPosition > sectionTop + 200) {
            // Animate heading first (if it exists)
            if (aboutHeading) {
                aboutHeading.classList.add('animate');
            }
            
            // Animate image
            aboutImg.classList.add('animate');
            
            // Animate content with delay
            setTimeout(() => {
                aboutContent.classList.add('animate');
            }, 300);
        }
        // Remove animation when scrolling back up (optional)
        else if (window.scrollY < sectionTop - 100) {
            if (aboutHeading) {
                aboutHeading.classList.remove('animate');
            }
            aboutImg.classList.remove('animate');
            aboutContent.classList.remove('animate');
        }
    }
}

// Scroll Animation for Skills Section
function handleSkillsAnimation() {
    const skillsHeading = document.querySelector('.skills .heading');
    const skillsBoxes = document.querySelectorAll('.skills-box');
    
    if (skillsHeading && skillsBoxes.length > 0) {
        const skillsSection = document.querySelector('.skills');
        const sectionTop = skillsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Trigger animation when section is in view
        if (scrollPosition > sectionTop + 200) {
            // Animate heading first
            skillsHeading.classList.add('animate');
            
            // Animate each skill box with staggered delay
            skillsBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('animate');
                }, index * 100); 
            });
        }
        // Remove animation when scrolling back up (optional)
        else if (window.scrollY < sectionTop - 100) {
            skillsHeading.classList.remove('animate');
            skillsBoxes.forEach(box => {
                box.classList.remove('animate');
            });
        }
    }
}

function handleAchievementsAnimation() {
    const achievementsHeading = document.querySelector('.achievements .heading');
    const achievementsBoxes = document.querySelectorAll('.achievements-box');
    
    if (achievementsHeading && achievementsBoxes.length > 0) {
        const achievementsSection = document.querySelector('.achievements');
        const sectionTop = achievementsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Trigger animation when section is in view
        if (scrollPosition > sectionTop + 200) {
            // Animate heading first
            achievementsHeading.classList.add('animate');
            
            // Animate each achievement box with staggered delay
            achievementsBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('animate');
                }, index * 150); // 150ms delay between each box
            });
        }
        // Remove animation when scrolling back up (optional)
        else if (window.scrollY < sectionTop - 100) {
            achievementsHeading.classList.remove('animate');
            achievementsBoxes.forEach(box => {
                box.classList.remove('animate');
            });
        }
    }
}

// Scroll Animation for Projects Section
function handleProjectsAnimation() {
    const projectsHeading = document.querySelector('.projects .heading');
    const projectsBoxes = document.querySelectorAll('.projects-box');
    
    if (projectsHeading && projectsBoxes.length > 0) {
        const projectsSection = document.querySelector('.projects');
        const sectionTop = projectsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Trigger animation when section is in view
        if (scrollPosition > sectionTop + 200) {
            // Animate heading first
            projectsHeading.classList.add('animate');
            
            // Animate each project box with staggered delay
            projectsBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('animate');
                }, index * 200); // 200ms delay between each box
            });
        }
        // Remove animation when scrolling back up (optional)
        else if (window.scrollY < sectionTop - 100) {
            projectsHeading.classList.remove('animate');
            projectsBoxes.forEach(box => {
                box.classList.remove('animate');
            });
        }
    }
}

// Scroll Animation for Contact Section
function handleContactAnimation() {
    const contactHeading = document.querySelector('.contact .heading');
    const contactImg = document.querySelector('.contact-img');
    const contactBoxes = document.querySelectorAll('.contact-box');
    
    if (contactHeading && contactImg && contactBoxes.length > 0) {
        const contactSection = document.querySelector('.contact');
        const sectionTop = contactSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Trigger animation when section is in view
        if (scrollPosition > sectionTop + 200) {
            // Animate heading first
            contactHeading.classList.add('animate');
            
            // Animate image
            setTimeout(() => {
                contactImg.classList.add('animate');
            }, 300);
            
            // Animate each contact box with staggered delay
            contactBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('animate');
                }, 600 + (index * 150));
            });
        }
        // Remove animation when scrolling back up (optional)
        else if (window.scrollY < sectionTop - 100) {
            contactHeading.classList.remove('animate');
            contactImg.classList.remove('animate');
            contactBoxes.forEach(box => {
                box.classList.remove('animate');
            });
        }
    }
}

// Combined scroll event listener
window.addEventListener('scroll', () => {
    handleScrollAnimation(); 
    handleSkillsAnimation(); 
    handleAchievementsAnimation();
    handleProjectsAnimation();
    handleContactAnimation()
});

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(type, 500);
    
    // Check animations
    handleScrollAnimation();
    handleSkillsAnimation();
    handleAchievementsAnimation();
    handleProjectsAnimation();
    handleContactAnimation()
});

// Interactive Particle Background
function createParticleBackground(sectionId, canvasClass) {
    const section = document.querySelector(`#${sectionId}`);
    const canvas = section.querySelector(`.${canvasClass}`);
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    // Set canvas size
    function setCanvasSize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    setCanvasSize();

    // Track mouse position relative to section
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    section.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.fillStyle = 'rgba(9, 34, 53, 0.4)'; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Check mouse position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            // Move particles
            this.x += this.speedX;
            this.y += this.speedY;

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY = -this.speedY;
            }
        }
    }

    // Initialize particles
    function init() {
        particlesArray = [];
        let numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Connect particles with lines
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(89, 178, 244, ${1 - distance / 100})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animate particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw();
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        init();
    });

    init();
    animate();
}

// Initialize for your section (call this in DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // Add this line for whichever section you want
    createParticleBackground('home', 'particle-canvas'); 
});