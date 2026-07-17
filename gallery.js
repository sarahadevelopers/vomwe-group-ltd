 (function() {
            'use strict';

            // ---- MOBILE DRAWER ----
            const menuToggle = document.getElementById('menuToggle');
            const mobileDrawer = document.getElementById('mobileDrawer');
            const drawerOverlay = document.getElementById('drawerOverlay');

            function openDrawer() {
                mobileDrawer.classList.add('open');
                drawerOverlay.classList.add('open');
                menuToggle.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeDrawer() {
                mobileDrawer.classList.remove('open');
                drawerOverlay.classList.remove('open');
                menuToggle.classList.remove('open');
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

            const drawerLinks = mobileDrawer.querySelectorAll('.drawer-links a');
            drawerLinks.forEach(function(link) {
                link.addEventListener('click', closeDrawer);
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                    closeDrawer();
                }
            });

            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    if (window.innerWidth > 992 && mobileDrawer.classList.contains('open')) {
                        closeDrawer();
                    }
                }, 200);
            });

            // ---- GALLERY FILTERING ----
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryCards = document.querySelectorAll('.gallery-card');

            filterButtons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    // Update active button
                    filterButtons.forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    galleryCards.forEach(function(card) {
                        if (filterValue === 'all') {
                            card.classList.remove('hidden');
                        } else {
                            const category = card.getAttribute('data-category');
                            if (category === filterValue) {
                                card.classList.remove('hidden');
                            } else {
                                card.classList.add('hidden');
                            }
                        }
                    });
                });
            });

            // ---- LIGHTBOX ----
            const lightboxOverlay = document.getElementById('lightboxOverlay');
            const lightboxImage = document.getElementById('lightboxImage');
            const lightboxTitle = document.getElementById('lightboxTitle');
            const lightboxDesc = document.getElementById('lightboxDesc');
            const lightboxLocation = document.getElementById('lightboxLocation');
            const lightboxCategory = document.getElementById('lightboxCategory');
            const lightboxBadge = document.getElementById('lightboxBadge');
            const lightboxClose = document.getElementById('lightboxClose');

            // Open lightbox on card click
            galleryCards.forEach(function(card) {
                card.addEventListener('click', function() {
                    const img = card.querySelector('img');
                    const location = card.getAttribute('data-location') || 'Unknown';
                    const title = card.getAttribute('data-title') || 'Operation';
                    const desc = card.getAttribute('data-desc') || 'No description available.';
                    const category = card.getAttribute('data-category') || '';

                    // Map category to display label
                    let categoryLabel = '';
                    switch (category) {
                        case 'guarding':
                            categoryLabel = 'Manned Guarding';
                            break;
                        case 'canine':
                            categoryLabel = 'Canine Units';
                            break;
                        case 'tech':
                            categoryLabel = 'Tech & Installations';
                            break;
                        case 'events':
                            categoryLabel = 'Event Operations';
                            break;
                        default:
                            categoryLabel = 'Security Operation';
                    }

                    // Populate lightbox
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt || title;
                    lightboxTitle.textContent = title;
                    lightboxDesc.textContent = desc;
                    lightboxLocation.textContent = location;
                    lightboxCategory.textContent = categoryLabel;
                    lightboxBadge.textContent = '📍 ' + location.toUpperCase();

                    // Open
                    lightboxOverlay.classList.add('open');
                    document.body.style.overflow = 'hidden';
                });
            });

            // Close lightbox
            function closeLightbox() {
                lightboxOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }

            lightboxClose.addEventListener('click', closeLightbox);

            // Close on overlay click (outside the inner box)
            lightboxOverlay.addEventListener('click', function(e) {
                if (e.target === lightboxOverlay) {
                    closeLightbox();
                }
            });

            // Close on Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightboxOverlay.classList.contains('open')) {
                    closeLightbox();
                }
            });

        })();