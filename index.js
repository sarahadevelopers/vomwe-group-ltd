(function() {
    'use strict';

    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        menuToggle.classList.add('open');
        // 🔥 NEW: Update ARIA attribute for accessibility
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        menuToggle.classList.remove('open');
        // 🔥 NEW: Update ARIA attribute for accessibility
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileDrawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when a link inside it is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('.drawer-links a');
    drawerLinks.forEach(function(link) {
        link.addEventListener('click', closeDrawer);
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    // Optional: close if window resizes to desktop width
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992 && mobileDrawer.classList.contains('open')) {
                closeDrawer();
            }
        }, 200);
    });

})();
// ============================================================
// TESTIMONIALS SWIPER – Google-Style Slider
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
        },
    });
});