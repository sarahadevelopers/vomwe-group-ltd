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

        // ---- SERVICE TOGGLE BUTTONS ----
        const toggleBtns = document.querySelectorAll('.service-toggle');
        const serviceInput = document.getElementById('serviceInterest');

        toggleBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                toggleBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                serviceInput.value = btn.getAttribute('data-value');
            });
        });

        // ---- KENYAN PHONE VALIDATION ----
        const phoneInput = document.getElementById('phoneNumber');
        const phoneValidation = document.getElementById('phoneValidation');

        phoneInput.addEventListener('input', function() {
            const val = this.value.replace(/\s/g, '');
            // Basic Kenyan format: 07XX XXX XXX or 01XX XXX XXX
            const kenyanRegex = /^(07|01)\d{8}$/;
            const isValid = kenyanRegex.test(val);

            if (val.length > 0 && !isValid) {
                this.classList.add('error');
                this.classList.remove('success');
                phoneValidation.classList.add('show');
            } else if (val.length > 0 && isValid) {
                this.classList.remove('error');
                this.classList.add('success');
                phoneValidation.classList.remove('show');
            } else {
                this.classList.remove('error');
                this.classList.remove('success');
                phoneValidation.classList.remove('show');
            }
        });

        // ---- FORM SUBMISSION (with loading state & success modal) ----
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successModal = document.getElementById('successModal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        form.addEventListener('submit', function(e) {
            // Validate phone before submission
            const phoneVal = phoneInput.value.replace(/\s/g, '');
            const kenyanRegex = /^(07|01)\d{8}$/;
            if (!kenyanRegex.test(phoneVal) && phoneVal.length > 0) {
                e.preventDefault();
                phoneInput.classList.add('error');
                phoneValidation.classList.add('show');
                phoneInput.focus();
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // The form will submit normally to FormSubmit
            // We'll handle the success modal after a delay (assuming success)
            // Since FormSubmit redirects, we need to handle it differently
            // We'll use fetch to intercept and prevent redirect

            e.preventDefault();

            const formData = new FormData(form);

            // Use fetch to submit to FormSubmit
            fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(function(response) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;

                    if (response.ok) {
                        // Show success modal
                        successModal.classList.add('open');
                        document.body.style.overflow = 'hidden';
                        form.reset();
                        // Reset phone validation state
                        phoneInput.classList.remove('error', 'success');
                        phoneValidation.classList.remove('show');
                        // Reset toggles to first
                        toggleBtns.forEach(function(b) { b.classList.remove('active'); });
                        if (toggleBtns.length > 0) {
                            toggleBtns[0].classList.add('active');
                            serviceInput.value = toggleBtns[0].getAttribute('data-value');
                        }
                    } else {
                        alert('Something went wrong. Please try again or call us directly.');
                    }
                })
                .catch(function() {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    alert('Network error. Please check your connection and try again.');
                });
        });

        // Close modal
        modalCloseBtn.addEventListener('click', function() {
            successModal.classList.remove('open');
            document.body.style.overflow = '';
        });

        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('open')) {
                successModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // ---- FLOATING LABEL EFFECT (placeholder handling) ----
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(function(input) {
            // On focus, add a class to label if needed
            input.addEventListener('focus', function() {
                const label = this.parentElement.querySelector('.form-label');
                if (label) {
                    label.style.color = 'var(--primary-blue)';
                }
            });
            input.addEventListener('blur', function() {
                const label = this.parentElement.querySelector('.form-label');
                if (label) {
                    label.style.color = '';
                }
            });
        });

    })();