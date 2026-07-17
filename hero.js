/**
 * ============================================================
 * HERO SECTION – Vomwe Group Premium Hero JavaScript
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* ===============================
       SCROLL DOWN ARROW
    =============================== */
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    /* ===============================
       HERO VIDEO – Ensure it plays on mobile
    =============================== */
    const heroVideo = document.querySelector('.hero-bg-video');
    if (heroVideo) {
        // Force play on mobile (some browsers block autoplay)
        heroVideo.play().catch(function() {
            // If autoplay fails, show fallback
            const fallback = document.querySelector('.hero-bg-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });

        // If video can't load, show fallback
        heroVideo.addEventListener('error', function() {
            const fallback = document.querySelector('.hero-bg-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
    }

    /* ===============================
       TYPEWRITER EFFECT (Optional Enhancement)
    =============================== */
    const typewriterElement = document.getElementById('heroTypewriter');
    if (typewriterElement) {
        const words = [
            'Guarding What Matters',
            'Protecting Your Assets',
            'Securing Your Future',
            'Elite Security Solutions'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const word = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = word.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = word.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === word.length) {
                isDeleting = true;
                speed = 1500; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(typeWriter, speed);
        }

        // Start typewriter after a delay
        setTimeout(typeWriter, 800);
    }

    /* ===============================
       HERO TEXT ANIMATION – Trigger on load
    =============================== */
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        // Ensure the animation plays
        heroText.style.opacity = '0';
        setTimeout(function() {
            heroText.style.opacity = '1';
        }, 100);
    }

    /* ===============================
       PARALLAX EFFECT ON OVERLAY (Optional)
    =============================== */
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const opacity = 1 - (scrollPosition / window.innerHeight) * 0.3;
                heroOverlay.style.opacity = Math.max(0.7, opacity);
            }
        }, { passive: true });
    }
});