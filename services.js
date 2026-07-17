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

            // ---- SIDEBAR SCROLL SPY ----
            const sidebarLinks = document.querySelectorAll('.services-sidebar ul li a');
            const sections = [
                document.getElementById('pillar1'),
                document.getElementById('pillar2'),
                document.getElementById('pillar3'),
                document.getElementById('pillar4')
            ];

            function updateActiveLink() {
                let currentId = 'pillar1';
                const scrollY = window.scrollY + 120; // offset for fixed header

                sections.forEach(function(section) {
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const top = rect.top + window.scrollY;
                        const bottom = top + rect.height;
                        if (scrollY >= top && scrollY < bottom - 100) {
                            currentId = section.id;
                        }
                    }
                });

                sidebarLinks.forEach(function(link) {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active-link');
                    }
                });
            }

            // Run on scroll and on load
            window.addEventListener('scroll', updateActiveLink);
            window.addEventListener('load', updateActiveLink);

        })();