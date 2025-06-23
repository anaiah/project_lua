
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

       


        const util ={
           	scrollsTo:(cTarget)=>{
            //asn.collapz()
            const elem = document.getElementById(cTarget)
            elem.scrollIntoView(true,{ behavior: 'smooth', block:'start', inline:'nearest' });

            },

            // Improved Parallax effect
            parallax: ()=> {
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
            },

            // Function to check screen size and apply the 'to-close' class
            checkScreenSize:()=>{
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
            },

            
        }; //end obj


        const scrollingContent = document.getElementById('scrolling-content');
        const scrollingText = document.getElementById('scrolling-text');
        const container = document.getElementById('scrolling-container');
        const header = document.querySelector('.hero-content h1');

        function setupText(newText) {
            // Set new text
            scrollingText.textContent = newText;
            
            // Reset styles
            scrollingContent.style.transition = 'none';
            scrollingContent.style.opacity = '1';

            // Start position: off-screen to the left
            scrollingContent.style.left = `-100%`;

            // Force reflow
            scrollingContent.offsetWidth;

            // Calculate target position:
            // Let's say we want the text to end at the same x-position as the header
            // This depends on layout; for simplicity, move to 0 or adjust as needed.
            // Here, we'll animate to `left: 0` so it stops aligned with the container.
            // You can fine-tune this value based on your layout.
            const containerWidth = container.offsetWidth;
            const textWidth = scrollingText.offsetWidth;

            // Animate to position so the text ends aligned
            // For example, move from -100% to 0
            scrollingContent.style.transition = 'left 7s linear'; // Slower
            scrollingContent.style.left = '0';

            // Schedule fade out after the animation + pause
            setTimeout(() => {
                scrollingContent.classList.add('fade-out');
            }, 10000); // 10 seconds

            // Remove fade-out class after transition for next cycle
            setTimeout(() => {
                scrollingContent.classList.remove('fade-out');
            }, 12000); // 10s + 2s fade
        }

        let imageChange = 0;
        const textArray = [
            "Not yet Registered? Membership is Easy!",
            "Upcoming Events you want to check out!",
            "You can check your Membership Status here.."
        ];

        function changeImage() {
            imageChange = (imageChange + 1) % textArray.length;
            return imageChange;
        }

        function updateScrollingContent() {
            // Reset opacity
            scrollingContent.style.opacity = '1';

            imageChange = changeImage();
            scrollingText.textContent = textArray[imageChange];

            // Start scrolling
            setupText(textArray[imageChange]);

            // Schedule next update (after current scroll + pause + fade)
            setTimeout(updateScrollingContent, 20000); // total cycle
        }

    document.addEventListener('DOMContentLoaded', function() {
        updateScrollingContent();
    
        const scrollingContent = document.getElementById("scrolling-content");
        
        console.log ("This should show this"+scrollingContent)
   
        // Call the function on window resize
        window.addEventListener('load', util.checkScreenSize);
        window.addEventListener('resize', util.checkScreenSize);    

        window.addEventListener('scroll', util.parallax);
    });

