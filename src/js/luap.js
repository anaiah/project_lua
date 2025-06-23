
        // Fade-in effect
        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Dynamic testimonial cards
        const testimonials = [
            { name: "John Doe", content: "Great service!" },
            { name: "Jane Smith", content: "Excellent work!" },
            { name: "Bob Johnson", content: "Highly recommended!" },
            // Add more testimonials as needed
        ];

        const testimonialContainer = document.getElementById('testimonial-container');

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'col fade-in';
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${testimonial.name}</h5>
                        <p class="card-text">${testimonial.content}</p>
                    </div>
                </div>
            `;
           
           
            //testimonialContainer.appendChild(card);
            //observer.observe(card);
        });

        // ... (keep the fade-in effect and testimonial code as is)

        // Improved Parallax effect
        function parallax() {
            const heroSection = document.getElementById('hero');
            const heroVideo = heroSection.querySelector('video');
            const scrollPosition = window.pageYOffset;
            
            // Parallax for hero video
            if (heroVideo) {
                heroVideo.style.transform = `translate(-50%, ${-50 + scrollPosition * 0.1}%)`;
            }
            
            // Parallax for other sections
            const parallaxElements = document.querySelectorAll('.parallax:not(#hero)');
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const elementPosition = element.offsetTop;
                const distance = scrollPosition - elementPosition;
                element.style.backgroundPositionY = distance * speed + 'px';
            });
        }

        window.addEventListener('scroll', parallax);

        const util ={
           	scrollsTo:(cTarget)=>{
            //asn.collapz()
            const elem = document.getElementById(cTarget)
            elem.scrollIntoView(true,{ behavior: 'smooth', block:'start', inline:'nearest' });

            },
        };

        // Function to check screen size and apply the 'to-close' class
    function checkScreenSize() {
        console.log("checkScreenSize() called"); // Debugging: Check if function is called

        const navbarTogglerIcon = document.querySelector('.navbar-toggler-icon.initial-hamburger');

        if (!navbarTogglerIcon) {
            console.error("Navbar toggler icon not found!"); // Debugging: Check if element is found
            return; // Exit if element is not found
        }

        if (window.innerWidth <= 767.98) {
            console.log("Screen size is small"); // Debugging
            navbarTogglerIcon.classList.add('to-close');
        } else {
            console.log("Screen size is large"); // Debugging
            navbarTogglerIcon.classList.remove('to-close');
        }

        // Force a re-evaluation (trigger reflow)
        void navbarTogglerIcon.offsetWidth;
    }

    // Delay the execution of checkScreenSize() until after the page has loaded AND the DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(checkScreenSize, 100); // Delay by 100 milliseconds
    });

    // Call the function on window resize
    window.addEventListener('resize', checkScreenSize);
