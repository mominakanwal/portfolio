// Default configuration
const defaultConfig = {
    main_headline: "Hi, I'm Muhammad Waqar",
    sub_headline: "Creative Designer & Business Strategist",
    hero_description: "Empowering startups, businesses, and professionals to grow through smart strategy, design, and management.",
    cta_button: "Let's Work Together",
    about_title: "Crafting Designs that Drive Business Growth",
    contact_title: "Let's Work Together",
    contact_subtitle: "Ready to elevate your business? Let's discuss how we can bring your vision to life.",
    background_color: "#F5F7FA",
    primary_color: "#1A73E8",
    text_color: "#0E1D3A",
    accent_color: "#0059C9",
    surface_color: "#ffffff",
    font_family: "Inter",
    font_size: 16
};

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced counter animation for statistics with suffixes
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const suffix = element.getAttribute('data-suffix') || '';
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            element.textContent = currentValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
            // Add a subtle bounce effect when animation completes
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Add initial animation delay for staggered effect
    const delay = Array.from(element.parentElement.parentElement.children).indexOf(element.parentElement) * 200;
    setTimeout(() => {
        updateCounter();
    }, delay);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                // Reset counter to 0 before animation
                counter.textContent = '0';
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Element SDK Configuration
async function onConfigChange(config) {
    // Update text content
    const mainHeadline = document.getElementById('main-headline');
    if (mainHeadline) {
        mainHeadline.textContent = config.main_headline || defaultConfig.main_headline;
    }

    const subHeadline = document.getElementById('sub-headline');
    if (subHeadline) {
        subHeadline.textContent = config.sub_headline || defaultConfig.sub_headline;
    }

    const heroDescription = document.getElementById('hero-description');
    if (heroDescription) {
        heroDescription.textContent = config.hero_description || defaultConfig.hero_description;
    }

    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.textContent = config.cta_button || defaultConfig.cta_button;
    }

    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) {
        aboutTitle.textContent = config.about_title || defaultConfig.about_title;
    }

    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) {
        contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
    }

    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactSubtitle) {
        contactSubtitle.textContent = config.contact_subtitle || defaultConfig.contact_subtitle;
    }

    // Update colors
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;

    document.documentElement.style.setProperty('--light-bg', backgroundColor);
    document.documentElement.style.setProperty('--primary-blue', primaryColor);
    document.documentElement.style.setProperty('--primary-dark', textColor);
    document.documentElement.style.setProperty('--accent-blue', accentColor);
    document.documentElement.style.setProperty('--white', surfaceColor);

    // Update font
    const customFont = config.font_family || defaultConfig.font_family;
    const baseFontStack = 'Arial, sans-serif';
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

    // Update font size
    const baseSize = config.font_size || defaultConfig.font_size;
    document.documentElement.style.fontSize = `${baseSize}px`;
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ surface_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                }
            },
            {
                get: () => config.accent_color || defaultConfig.accent_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ accent_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_family: value });
                }
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["main_headline", config.main_headline || defaultConfig.main_headline],
        ["sub_headline", config.sub_headline || defaultConfig.sub_headline],
        ["hero_description", config.hero_description || defaultConfig.hero_description],
        ["cta_button", config.cta_button || defaultConfig.cta_button],
        ["about_title", config.about_title || defaultConfig.about_title],
        ["contact_title", config.contact_title || defaultConfig.contact_title],
        ["contact_subtitle", config.contact_subtitle || defaultConfig.contact_subtitle]
    ]);
}

// Profile Image Click Handler
document.getElementById('profile-image').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';

    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileImage = document.getElementById('profile-image');
                profileImage.innerHTML = `<img src="${e.target.result}" alt="Muhammad Waqar Profile Photo">`;
            };
            reader.readAsDataURL(file);
        }
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
});

// Contact Form Functionality
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('form-message');

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    formMessage.style.display = 'none';

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';

        // Show success message
        formMessage.style.display = 'block';
        formMessage.className = 'form-message success';
        formMessage.innerHTML = `
            <strong>Message sent successfully!</strong><br>
            Thank you ${name}, I'll get back to you within 24 hours.
        `;

        // Reset form
        this.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

    }, 2000);
});

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}
