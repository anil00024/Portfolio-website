 const projectData = {
            portfolio: {
                title: 'Portfolio Website',
                description: 'Personal responsive portfolio website with animations, dark mode, smooth scrolling and modern UI.',
                tech: 'HTML • CSS • JavaScript',
                liveLink: 'https://www.youtube.com/@project_lab_07',
                githubLink: 'https://github.com/anil00024?tab=repositories'
            },
            ecommerce: {
                title: 'Plant E-Commerce Website',
                description:  "Full-stack plant e-commerce website with product listing, cart, checkout and order confirmation.",
                tech: 'React • Node • MongoDB',
                liveLink: 'https://anil00024.github.io/Plant-E-Commerce-Website-frontend-/',
                githubLink: 'https://youtu.be/a3of02rc83o?si=ib3u0YdCSybVZI6O'
            },
            netflix: {
                title: 'Netflix Clone',
                description:  "Netflix UI clone with movie rows, banners, hover effects and responsive layout.",
                tech: 'HTML • CSS • JavaScript • API',
                liveLink: 'https://spectacular-mermaid-70ed49.netlify.app/',
                githubLink: 'https://youtu.be/YK2DxQ1yrX4?si=if4UxE5nUSr_DGUs'
            }
        };

        // Scroll to section function
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        }

        // Initialize when DOM loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Portfolio website loaded!');
            
            // Setup project cards
            const projectCards = document.querySelectorAll('.project-card');
            console.log('Found ' + projectCards.length + ' project cards');
            
            projectCards.forEach(card => {
                card.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project');
                    console.log('Clicked project:', projectId);
                    const project = projectData[projectId];
                    
                    if (project) {
                        openProjectModal(project);
                    }
                });
            });

            // Setup FAQ toggles
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    toggleFaq(this);
                });
            });

            // Setup form submission
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', handleSubmit);
            }

            // Setup smooth scroll for nav links
            document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                });
            });
        });

        // Open project modal
        function openProjectModal(project) {
            console.log('Opening modal for:', project.title);
            const modal = document.getElementById('projectModal');
            
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalTech').textContent = project.tech;
            
            const liveLink = document.getElementById('modalLiveLink');
            const githubLink = document.getElementById('modalGithubLink');
            
            liveLink.href = project.liveLink;
            githubLink.href = project.githubLink;
            
            console.log('Live link:', project.liveLink);
            console.log('GitHub link:', project.githubLink);
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('projectModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Resume functions
        function openResume() {
            const resumeLink = 'https://drive.google.com/file/d/1lJ9zAx81YrdpmEh5DusCQKfQWPUvaOTI/view?usp=sharing';
            window.open(resumeLink, '_blank', 'noopener,noreferrer');
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const projectModal = document.getElementById('projectModal');
            if (event.target === projectModal) {
                closeModal();
            }
        }

        // FAQ Toggle
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const allQuestions = document.querySelectorAll('.faq-question');
            const allAnswers = document.querySelectorAll('.faq-answer');
            
            allQuestions.forEach(q => {
                if (q !== element) {
                    q.classList.remove('active');
                }
            });
            allAnswers.forEach(a => {
                if (a !== answer) {
                    a.classList.remove('active');
                }
            });
            
            element.classList.toggle('active');
            answer.classList.toggle('active');
        }

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const subject = document.getElementById('subjectInput').value;
            const message = document.getElementById('messageInput').value;
            
            if (name && email && subject && message) {
                alert('Thank you ' + name + '! Your message has been sent successfully. I\'ll get back to you soon at ' + email + '.');
                event.target.reset();
            }
        }

        // Theme toggle
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const btn = document.querySelector('.theme-toggle');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Update button icon
            btn.textContent = isDarkMode ? '☀️' : '🌙';
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
            
            console.log('Theme toggled:', isDarkMode ? 'Dark Mode' : 'Light Mode');
        }

        // Load saved theme preference on page load
        function loadThemePreference() {
            const darkMode = localStorage.getItem('darkMode');
            const btn = document.querySelector('.theme-toggle');
            
            if (darkMode === 'enabled') {
                document.body.classList.add('dark-mode');
                if (btn) btn.textContent = '☀️';
            } else {
                document.body.classList.remove('dark-mode');
                if (btn) btn.textContent = '🌙';
            }
        }

        // Call loadThemePreference when page loads
        loadThemePreference();

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--white)';
            }
            
            // Highlight active section
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });