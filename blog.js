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

            // ---- READING PROGRESS BAR ----
            const progressBar = document.getElementById('progressBar');

            function updateProgress() {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = scrollPercent + '%';
            }

            window.addEventListener('scroll', updateProgress);
            window.addEventListener('resize', updateProgress);
            updateProgress();

            // ---- BLOG FILTERING ----
            const filterButtons = document.querySelectorAll('.filter-btn');
            const blogCards = document.querySelectorAll('.blog-card');

            filterButtons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    blogCards.forEach(function(card) {
                        if (filterValue === 'all') {
                            card.style.display = 'flex';
                        } else {
                            const category = card.getAttribute('data-category');
                            if (category === filterValue) {
                                card.style.display = 'flex';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });

            // ---- ARTICLE DATA (for modal) ----
            const articles = {
                featured: {
                    image: 'https://picsum.photos/id/44/800/500',
                    badge: 'Crime Prevention Intel',
                    title: 'The Psychology of Deterrence: How Physical Signage Stops Intrusion Before It Begins',
                    date: 'March 12, 2026',
                    readTime: '5 min read',
                    author: 'Operations Command',
                    body: `
                        <p>An analytical breakdown of how tactical placement of Vomwe Limited yard signs and high-visibility perimeter stickers alters burglar behavior metrics and actively diverts external threats.</p>
                        <p>Research consistently shows that visible security signage is one of the most cost-effective deterrents available. When potential intruders see professional signage, they infer the presence of active monitoring, alarm systems, and rapid response protocols.</p>
                        <p>At Vomwe Group, we deploy yard signs and perimeter stickers not merely as marketing tools, but as <strong>psychological barriers</strong> that signal to would-be offenders that the property is professionally protected and not a viable target.</p>
                        <p><strong>Key behavioral insights:</strong></p>
                        <ul>
                            <li>Burglars typically avoid properties with visible security branding.</li>
                            <li>Signage paired with cameras and alarm sensors amplifies deterrent effect.</li>
                            <li>Professional branding conveys operational competence and rapid response capability.</li>
                        </ul>
                        <p>For new enterprise clients, we recommend a comprehensive perimeter assessment that includes signage placement, camera coverage, and access control hardening.</p>
                    `
                },
                card1: {
                    image: 'https://picsum.photos/id/20/800/500',
                    badge: 'SecurTech &amp; CCTV',
                    title: 'Optimizing CCTV Networks: Why Remote Control Room Subsidies Matter for New Accounts',
                    date: 'March 10, 2026',
                    readTime: '4 min read',
                    author: 'Technical Command',
                    body: `
                        <p>How subsidized control room oversight reduces deployment friction and delivers immediate visibility for new enterprise clients.</p>
                        <p>When a new client signs with Vomwe Group, they receive one month of subsidized control room oversight as part of our introductory offer. This is not a simple discount — it's a strategic deployment advantage.</p>
                        <p>During the first 30 days, our command center actively monitors your CCTV network, identifies blind spots, and fine-tunes motion detection thresholds. This rapid optimization phase ensures that your surveillance system operates at peak efficiency from day one.</p>
                        <p><strong>Benefits of the subsidized control room period:</strong></p>
                        <ul>
                            <li>Immediate threat detection without additional setup costs.</li>
                            <li>Expert calibration of camera angles and recording schedules.</li>
                            <li>Seamless integration with existing security infrastructure.</li>
                        </ul>
                    `
                },
                card2: {
                    image: 'https://picsum.photos/id/123/800/500',
                    badge: 'K9 Operations',
                    title: 'Deploying K9 Assets: Short-Term Event Management vs. Long-Term Corporate Leasing',
                    date: 'March 8, 2026',
                    readTime: '6 min read',
                    author: 'Canine Operations',
                    body: `
                        <p>A tactical comparison of canine deployment models — from festival crowd control to permanent warehouse perimeter protection.</p>
                        <p>Vomwe Group offers flexible K9 deployment options tailored to the specific needs of each client. Whether you require a canine unit for a high-profile event or a permanent perimeter security solution, our trained dogs and handlers deliver elite performance.</p>
                        <p><strong>Short-term event deployment:</strong> Ideal for concerts, corporate galas, and political functions. Our dogs are trained for crowd management, explosive detection, and threat containment in dynamic environments.</p>
                        <p><strong>Long-term corporate leasing:</strong> Perfect for warehouses, industrial facilities, and gated communities. Dogs become familiar with the site and personnel, providing consistent, reliable protection.</p>
                    `
                },
                card3: {
                    image: 'https://picsum.photos/id/51/800/500',
                    badge: 'SecurTech &amp; CCTV',
                    title: 'Real-Time Fleet Oversight: Leveraging Asynchronous GPS Telemetry for Logistics Security',
                    date: 'March 5, 2026',
                    readTime: '5 min read',
                    author: 'Tracking Division',
                    body: `
                        <p>How Vomwe's asynchronous GPS tracking architecture provides real-time visibility and anomaly detection for commercial fleets.</p>
                        <p>Our GPS tracking system operates on an asynchronous data collection model, meaning that once a tracker is installed, it continuously gathers location and telemetry data. This data is then accessible through a web portal, a mobile application, or even via SMS.</p>
                        <p>For logistics managers, this translates to:</p>
                        <ul>
                            <li>Real-time asset visibility across the entire supply chain.</li>
                            <li>Geofencing alerts for route deviations and unauthorized stops.</li>
                            <li>Historical route analysis for operational efficiency improvements.</li>
                        </ul>
                        <p>Vomwe's tracking solutions are scalable from a single vehicle to an entire national fleet.</p>
                    `
                },
                card4: {
                    image: 'https://picsum.photos/id/75/800/500',
                    badge: 'Tactical Guarding',
                    title: 'Mobile Patrol Protocols: How Automated Threat Indicators Drive Response Times',
                    date: 'March 3, 2026',
                    readTime: '4 min read',
                    author: 'Patrol Command',
                    body: `
                        <p>An in-depth look at how Vomwe's automated sensor network and mobile patrol units coordinate for rapid threat neutralization.</p>
                        <p>Our mobile patrol teams utilize an automated system of receiving and analyzing indicators of potential security threats. Sensors, door/window contacts, motion detectors, and high-decibel alarms feed into a central intelligence hub that alerts patrol units instantly.</p>
                        <p>When an alarm is triggered, the nearest patrol vehicle is dispatched with precise coordinates and a situational brief. This minimizes response times and maximizes the likelihood of intercepting threats in progress.</p>
                        <p>Additionally, our patrol units conduct random site visits at set intervals, ensuring that no predictable patterns emerge that could be exploited by potential intruders.</p>
                    `
                },
                card5: {
                    image: 'https://picsum.photos/id/64/800/500',
                    badge: 'Risk Advisory',
                    title: 'Enterprise Risk Assessment Frameworks: What Procurement Managers Look For',
                    date: 'February 28, 2026',
                    readTime: '7 min read',
                    author: 'Risk Management',
                    body: `
                        <p>A guide for corporate buyers on evaluating security partners — compliance, insurance, response protocols, and operational transparency.</p>
                        <p>When enterprise procurement managers evaluate security providers, they look beyond the glossy marketing materials. They want to see regulatory alignment, operational transparency, and a proven track record.</p>
                        <p>Vomwe Group meets and exceeds these expectations through:</p>
                        <ul>
                            <li>Full compliance with the Companies Act 2015 and PSRA regulations.</li>
                            <li>Comprehensive insurance coverage for all operations.</li>
                            <li>Clear, documented response protocols for any security incident.</li>
                            <li>Transparent reporting and real-time client dashboards.</li>
                        </ul>
                        <p>Our risk consultancy team works with clients to develop custom security frameworks that align with their industry standards and regulatory obligations.</p>
                    `
                },
                card6: {
                    image: 'https://picsum.photos/id/124/800/500',
                    badge: 'K9 Operations',
                    title: 'Breeding for Temperament: How Vomwe Selects and Trains Elite Security Dogs',
                    date: 'February 25, 2026',
                    readTime: '5 min read',
                    author: 'Canine Operations',
                    body: `
                        <p>Behind the scenes of our breeding program — temperament testing, obedience training, and matching dogs to specific security environments.</p>
                        <p>At Vomwe Group, we pride ourselves on breeding top-quality dogs with excellent temperaments, perfect for security purposes. Our breeding program emphasizes health, intelligence, and disposition over aesthetics.</p>
                        <p>We also offer mating services: clients can bring their female dogs for mating with our healthy, temperament-tested males. This ensures the next generation of security dogs inherits the traits necessary for effective protection work.</p>
                        <p>Our training protocols use proven, positive-reinforcement techniques to ensure that each dog is not only obedient but also alert and responsive to potential threats.</p>
                    `
                },
                card7: {
                    image: 'https://picsum.photos/id/55/800/500',
                    badge: 'Tactical Guarding',
                    title: 'Residential Security Trends: What High-Net-Worth Clients Expect in 2026',
                    date: 'February 22, 2026',
                    readTime: '4 min read',
                    author: 'Residential Division',
                    body: `
                        <p>Evolving expectations in gated communities — from smart access control to discreet, highly trained residential security teams.</p>
                        <p>High-net-worth individuals in Kenya are increasingly demanding residential security that is both unobtrusive and uncompromising. Gated communities and luxury estates require a sophisticated blend of technology and human presence.</p>
                        <p>Vomwe Group delivers residential security solutions that include:</p>
                        <ul>
                            <li>24/7 access control with visitor verification and logging.</li>
                            <li>Discreet, uniformed patrols that maintain a visible but non-intrusive presence.</li>
                            <li>Integrated CCTV, alarm, and intercom systems for comprehensive coverage.</li>
                            <li>Rapid response protocols for any security breach or emergency.</li>
                        </ul>
                        <p>Our guards are trained to handle the unique sensitivities of residential environments, balancing firm security with respect for residents' privacy and comfort.</p>
                    `
                },
                card8: {
                    image: 'https://picsum.photos/id/39/800/500',
                    badge: 'Risk Advisory',
                    title: 'The Psychology of Alarm Response: Why Visible Deterrents and Yard Signs Work',
                    date: 'February 20, 2026',
                    readTime: '6 min read',
                    author: 'Risk Management',
                    body: `
                        <p>Behavioral science insights into how alarm signage, visible cameras, and professional patrol presence actively deter intrusion.</p>
                        <p>Intrusion prevention is as much about psychology as it is about technology. Criminals are opportunistic — they look for targets that appear vulnerable, unmonitored, and easy to enter.</p>
                        <p>Vomwe Group leverages this behavioral insight by deploying visible deterrents at client sites:</p>
                        <ul>
                            <li>High-visibility yard signs and window decals that signal professional protection.</li>
                            <li>Visible camera housings and motion sensor lights that indicate active surveillance.</li>
                            <li>Regular patrol presence that disrupts the "opportunity window" for potential intruders.</li>
                        </ul>
                        <p>Studies show that properties with visible security branding are significantly less likely to be targeted than those without. The mere perception of professional protection is a powerful deterrent.</p>
                    `
                },
                card9: {
                    image: 'https://picsum.photos/id/57/800/500',
                    badge: 'SecurTech &amp; CCTV',
                    title: 'Under-Vehicle Surveillance: The Overlooked Perimeter Security Layer',
                    date: 'February 18, 2026',
                    readTime: '5 min read',
                    author: 'Technical Command',
                    body: `
                        <p>Why UVSS systems are becoming standard for high-security facilities and how Vomwe integrates them into comprehensive site protection.</p>
                        <p>Under-vehicle surveillance systems (UVSS) are one of the most effective yet overlooked perimeter security technologies. These systems provide high-resolution imagery of the undercarriage of any vehicle entering a secure facility.</p>
                        <p>Vomwe Group offers UVSS installation as part of our comprehensive security systems portfolio. These systems integrate seamlessly with access control gates, CCTV networks, and our central monitoring platform.</p>
                        <p>Key applications include:</p>
                        <ul>
                            <li>Government buildings and diplomatic missions.</li>
                            <li>High-value logistics hubs and cargo centers.</li>
                            <li>Corporate headquarters with secure parking facilities.</li>
                            <li>Event venues requiring enhanced perimeter security.</li>
                        </ul>
                    `
                }
            };

            // ---- ARTICLE MODAL ----
            const modal = document.getElementById('articleModal');
            const modalImage = document.getElementById('modalImage');
            const modalBadge = document.getElementById('modalBadge');
            const modalTitle = document.getElementById('modalTitle');
            const modalMeta = document.getElementById('modalMeta');
            const modalBody = document.getElementById('modalBody');
            const modalCloseBtn = document.getElementById('modalCloseBtn');

            function openArticle(articleKey) {
                const data = articles[articleKey];
                if (!data) return;

                modalImage.src = data.image;
                modalImage.alt = data.title;
                modalBadge.textContent = data.badge;
                modalTitle.textContent = data.title;
                modalMeta.innerHTML = `
                        <span><i class="fa-regular fa-calendar"></i> ${data.date}</span>
                        <span><i class="fa-regular fa-clock"></i> ${data.readTime}</span>
                        <span><i class="fa-regular fa-pen"></i> ${data.author}</span>
                    `;
                modalBody.innerHTML = data.body;

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }

            // Open on featured article link
            document.querySelector('.featured-content .btn-text-link')?.addEventListener('click', function(e) {
                e.preventDefault();
                openArticle('featured');
            });

            // Open on card read links
            document.querySelectorAll('.read-link').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const key = this.getAttribute('data-article');
                    if (key && articles[key]) {
                        openArticle(key);
                    }
                });
            });

            // Close modal
            modalCloseBtn.addEventListener('click', closeModal);

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('open')) {
                    closeModal();
                }
            });

            // ---- NEWSLETTER FORM (simple submission) ----
            const nlForm = document.getElementById('newsletterForm');
            nlForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email && email.includes('@')) {
                    // Submit via fetch
                    const formData = new FormData(this);
                    fetch(this.action, {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        })
                        .then(function(response) {
                            if (response.ok) {
                                alert('Thank you for subscribing. You will receive our latest intelligence briefings.');
                                nlForm.querySelector('input[type="email"]').value = '';
                            } else {
                                alert('Something went wrong. Please try again.');
                            }
                        })
                        .catch(function() {
                            alert('Network error. Please check your connection.');
                        });
                } else {
                    alert('Please enter a valid email address.');
                }
            });

        })();