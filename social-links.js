/**
 * ============================================================
 * SOCIAL LINKS INJECTOR – Vomwe Group
 * Automatically adds social media links to the footer
 * ============================================================
 */

(function() {
    'use strict';

    // ----- SOCIAL MEDIA CONFIGURATION -----
    const SOCIAL_LINKS = [
        {
            name: 'Facebook',
            icon: 'fa-brands fa-facebook-f',
            url: 'https://www.facebook.com/VomweLtd',
            ariaLabel: 'Follow us on Facebook'
        },
        {
            name: 'Instagram',
            icon: 'fa-brands fa-instagram',
            url: 'https://www.instagram.com/vomwelimited/',
            ariaLabel: 'Follow us on Instagram'
        },
        {
            name: 'TikTok',
            icon: 'fa-brands fa-tiktok',
            url: 'https://www.tiktok.com/@vomwe_security',
            ariaLabel: 'Follow us on TikTok'
        },
        {
            name: 'YouTube',
            icon: 'fa-brands fa-youtube',
            url: '#', // Replace with your YouTube URL
            ariaLabel: 'Subscribe to our YouTube channel'
        },
        {
            name: 'X (Twitter)',
            icon: 'fa-brands fa-x-twitter',
            url: '#', // Replace with your X/Twitter URL
            ariaLabel: 'Follow us on X'
        }
    ];

    // ----- FIND THE SOCIAL CONTAINER -----
    // Try to find the existing footer-social container
    let socialContainer = document.querySelector('.footer-social');

    // If it doesn't exist, create it
    if (!socialContainer) {
        // Find the footer contact column
        const footerCol = document.querySelector('.footer-contact-col');
        if (!footerCol) {
            console.warn('Social Links: Footer contact column not found.');
            return;
        }

        // Create social container
        socialContainer = document.createElement('div');
        socialContainer.className = 'footer-social';
        footerCol.appendChild(socialContainer);
    }

    // ----- CLEAR EXISTING SOCIAL LINKS -----
    socialContainer.innerHTML = '';

    // ----- CREATE SOCIAL LINK ELEMENTS -----
    SOCIAL_LINKS.forEach(function(link) {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.className = 'social-link';
        anchor.setAttribute('aria-label', link.ariaLabel);
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';

        const icon = document.createElement('i');
        icon.className = link.icon;
        icon.setAttribute('aria-hidden', 'true');

        anchor.appendChild(icon);
        socialContainer.appendChild(anchor); 
    });

})();