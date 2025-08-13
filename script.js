window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

var swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1200,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            let firstSlide = document.querySelector('.swiper-slide-active');
            gsap.set(firstSlide, { scale: 1, opacity: 1 }); // set immediately to avoid flicker
            animateText(firstSlide.querySelector('.slide-content'), true); // show instantly
        },
        slideChangeTransitionStart: function () {
            let activeSlide = document.querySelector('.swiper-slide-active');
            gsap.fromTo(activeSlide,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
            );

            // Show text automatically after slide change for 2s
            animateText(activeSlide.querySelector('.slide-content'), false);
        }
    }
});

function animateText(el, instant) {
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: instant ? 0.5 : 0.8, ease: "power2.out" }
    );
    // Hide after 2s if not hover
    gsap.to(el, { opacity: 0, y: 30, delay: 2, duration: 0.8, ease: "power2.in" });
}

// Keep text visible on hover
document.querySelectorAll('.swiper-slide').forEach(slide => {
    const text = slide.querySelector('.slide-content');
    if (!text) return;
    slide.addEventListener('mouseenter', () => {
        gsap.killTweensOf(text);
        gsap.to(text, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    });
    slide.addEventListener('mouseleave', () => {
        gsap.to(text, { opacity: 0, y: 30, duration: 0.4, ease: "power2.in" });
    });
});

const sidenav = document.querySelector(".side-navbar");

function showSidenav() {
    sidenav.classList.add("active");
}
function closeSidenav() {
    sidenav.classList.remove("active");
}

const aboutSection = document.querySelector('.about-content');
function revealAbout() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;
    if (sectionTop < triggerPoint) {
        aboutSection.classList.add('show');
        aboutSection.classList.remove('hidden');
    }
}
window.addEventListener('scroll', revealAbout);
window.addEventListener('load', revealAbout);

document.addEventListener("scroll", function () {
    document.querySelectorAll(".service-box").forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < window.innerHeight - 100) {
            box.classList.add("show");
        }
    });
});

const filterButtons = document.querySelectorAll('.filter-menu button');
const items = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        items.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});



const testimonials = [
    {
        title: "Camera Man !",
        name:"Ronniee",
        text: `"From the golden glow of sunrise to the quiet charm of midnight streets, Ronnie captures moments the eye might miss. Every click of his camera freezes emotions into timeless frames !"`,
        img: "Screenshot_10-8-2025_155229_www.instagram.com.jpeg"
    },
    {
        title: "Editor !",
        name:"Thiru",
        text: `"With patience, precision, and a love for storytelling, Thiru turns raw shots into cinematic magic. He believes every frame has a soul—and his edits make that soul shine !"`,
        img: "Screenshot_11-8-2025_195939_www.instagram.com.jpeg"
    },
    {
        title: "Designer !",
        name:"Dharmesh",
        text: `"Dharmesh paints with pixels. From elegant posters to bold brand visuals, his designs don’t just look good—they speak, inspire, and stay in your mind long after you’ve seen them !"`,
        img: "Screenshot_11-8-2025_20017_www.instagram.com.jpeg"
    }
];

let currentIndex = 0;
let autoplayInterval;

function showSlide(index) {
    const title = document.getElementById('testimonial-title');
    const text = document.getElementById('testimonial-text');
    const name = document.getElementById('testimonial-name');
    const thumbs = document.querySelectorAll('.thumbnails img');

    title.style.opacity = 0;
    text.style.opacity = 0;

    setTimeout(() => {
        title.textContent = testimonials[index].title;
        text.textContent = testimonials[index].text;
        name.textContent = testimonials[index].name;

        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        title.style.opacity = 1;
        text.style.opacity = 1;
        name.style.opacity = 1;
    }, 200);

    currentIndex = index;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showSlide(currentIndex);
}

function goToSlide(index) {
    showSlide(index);
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

document.querySelector('.testimonial-section').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.testimonial-section').addEventListener('mouseleave', startAutoplay);

startAutoplay();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("subscribeForm");
    const emailInput = form.querySelector("input[type='email']");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email === "") {
            alert("Please enter your email address.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Animation
        form.style.opacity = "0";
        setTimeout(() => {
            form.style.display = "none";
            successMessage.style.display = "block";
        }, 400);

        // Bring form back after 3s
        setTimeout(() => {
            successMessage.style.display = "none";
            form.style.display = "flex";
            setTimeout(() => form.style.opacity = "1", 50);
        }, 3000);

        emailInput.value = "";
    });
});