/**
 * ============================================================
 * FIX SOCIAL LINKS – Vomwe Group
 * ============================================================
 */
(function() {
    'use strict';
    const socialLinks = {
        facebook: { selector: 'a[aria-label="Facebook"]', url: 'https://www.facebook.com/VomweLtd' },
        instagram: { selector: 'a[aria-label="Instagram"]', url: 'https://www.instagram.com/vomwelimited/' },
        tiktok: { selector: 'a[aria-label="TikTok"]', url: 'https://www.tiktok.com/@vomwe_security' },
        youtube: { selector: 'a[aria-label="YouTube"]', url: '#' },
        x: { selector: 'a[aria-label="X"]', url: '#' }
    };
    Object.values(socialLinks).forEach(function(link) {
        document.querySelectorAll(link.selector).forEach(function(el) {
            el.href = link.url;
        });
    });
})();