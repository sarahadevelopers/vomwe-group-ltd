 (function() {
            'use strict';

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

        })();