// Hero Carousel
const heroSlides = [
    {
        title: 'Safe & Comfortable Travel',
        subtitle: 'Welcome to PAVITHRA TRAVELS'
    },
    {
        title: 'Your Trusted Travel Partner',
        subtitle: 'Welcome to PAVITHRA TRAVELS'
    },
    {
        title: 'Explore with Confidence',
        subtitle: 'Welcome to PAVITHRA TRAVELS'
    }
];

let currentHeroSlide = 0;
let heroInterval;

function updateHeroSlide(index) {
    currentHeroSlide = index;
    document.getElementById('heroTitle').textContent = heroSlides[index].title;
    document.getElementById('heroSubtitle').textContent = heroSlides[index].subtitle;
    
    // Update indicators
    const indicators = document.querySelectorAll('#heroIndicators button');
    indicators.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    updateHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide(currentHeroSlide);
}

function startHeroCarousel() {
    heroInterval = setInterval(nextHeroSlide, 5000);
}

function stopHeroCarousel() {
    clearInterval(heroInterval);
}

// Hero carousel controls
document.getElementById('heroNext').addEventListener('click', () => {
    stopHeroCarousel();
    nextHeroSlide();
    startHeroCarousel();
});

document.getElementById('heroPrev').addEventListener('click', () => {
    stopHeroCarousel();
    prevHeroSlide();
    startHeroCarousel();
});

// Hero indicators
document.querySelectorAll('#heroIndicators button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        stopHeroCarousel();
        updateHeroSlide(index);
        startHeroCarousel();
    });
});

// Start hero carousel
startHeroCarousel();

// Services Carousel
let currentServiceIndex = 0;
let slidesToShow = 3;

function updateSlidesToShow() {
    if (window.innerWidth < 768) {
        slidesToShow = 1;
    } else if (window.innerWidth < 992) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
    updateServicesCarousel();
}

function updateServicesCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const slideWidth = 100 / slidesToShow;
    carousel.style.transform = `translateX(-${currentServiceIndex * slideWidth}%)`;
}

function nextService() {
    const totalSlides = document.querySelectorAll('.service-slide').length;
    if (currentServiceIndex + slidesToShow >= totalSlides) {
        currentServiceIndex = 0;
    } else {
        currentServiceIndex++;
    }
    updateServicesCarousel();
}

function prevService() {
    const totalSlides = document.querySelectorAll('.service-slide').length;
    if (currentServiceIndex === 0) {
        currentServiceIndex = totalSlides - slidesToShow;
    } else {
        currentServiceIndex--;
    }
    updateServicesCarousel();
}

document.getElementById('servicesNext').addEventListener('click', nextService);
document.getElementById('servicesPrev').addEventListener('click', prevService);

// Update on window resize
window.addEventListener('resize', updateSlidesToShow);
updateSlidesToShow();

// Smooth scroll for navigation links
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
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Add animation on scroll - only on desktop
if (window.innerWidth > 768) {
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

    // Observe all cards and sections
    document.querySelectorAll('.card, section > .container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
} else {
    // On mobile, show everything immediately
    document.querySelectorAll('.card, section > .container').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Floating buttons animation
const whatsappBtn = document.getElementById('whatsappBtn');
const callBtn = document.getElementById('callBtn');
let isVisible = true;

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Hide buttons near footer
    if (scrollPosition + windowHeight >= documentHeight - 100) {
        if (isVisible) {
            whatsappBtn.style.opacity = '0';
            whatsappBtn.style.pointerEvents = 'none';
            callBtn.style.opacity = '0';
            callBtn.style.pointerEvents = 'none';
            isVisible = false;
        }
    } else {
        if (!isVisible) {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.pointerEvents = 'auto';
            callBtn.style.opacity = '1';
            callBtn.style.pointerEvents = 'auto';
            isVisible = true;
        }
    }
});

// Add transition to floating buttons
whatsappBtn.style.transition = 'opacity 0.3s ease';
callBtn.style.transition = 'opacity 0.3s ease';

// Preload images for better performance
const imageUrls = [
    'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/931881/pexels-photo-931881.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800'
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Ensure packages section is visible on mobile
document.addEventListener('DOMContentLoaded', () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
        packagesSection.style.display = 'block';
        packagesSection.style.visibility = 'visible';
        packagesSection.style.opacity = '1';
        
        // Make all cards visible
        const allCards = packagesSection.querySelectorAll('.card');
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.display = 'block';
        });
        
        // Make all columns visible
        const allCols = packagesSection.querySelectorAll('.col-lg-4, .col-md-6');
        allCols.forEach(col => {
            col.style.display = 'block';
            col.style.visibility = 'visible';
            col.style.opacity = '1';
        });
    }
});

console.log('Pavithra Travels Website Loaded Successfully!');
