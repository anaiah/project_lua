
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

        ///globa var
        scrollingContent : document.getElementById('scrolling-content'),
        scrollingText : document.getElementById('scrolling-text'),
        container : document.getElementById('scrolling-container'),
        header : document.querySelector('.hero-content h1'),
        
        setupText: (newText) => {
            // Set new text
            util.scrollingText.textContent = newText;
            
            // Reset styles
            util.scrollingContent.style.transition = 'none';
            util.scrollingContent.style.opacity = '1';

            // Start position: off-screen to the left
            util.scrollingContent.style.left = `-100%`;

            // Force reflow
            util.scrollingContent.offsetWidth;

            // Calculate target position:
            // Let's say we want the text to end at the same x-position as the header
            // This depends on layout; for simplicity, move to 0 or adjust as needed.
            // Here, we'll animate to `left: 0` so it stops aligned with the container.
            // You can fine-tune this value based on your layout.
            const containerWidth = util.container.offsetWidth;
            const textWidth = util.scrollingText.offsetWidth;

            // Animate to position so the text ends aligned
            // For example, move from -100% to 0
            util.scrollingContent.style.transition = 'left 7s linear'; // Slower
            util.scrollingContent.style.left = '0';

            // Schedule fade out after the animation + pause
            setTimeout(() => {
                util.scrollingContent.classList.add('fade-out');
            }, 10000); // 10 seconds

            // Remove fade-out class after transition for next cycle
            setTimeout(() => {
                util.scrollingContent.classList.remove('fade-out');
            }, 12000); // 10s + 2s fade
        },
    
        imageChange: 0,
        textArray : [
        "Not yet Registered? Membership is Easy!",
        "Upcoming Events you want to check out!",
        "You can check your Membership Status here.."
        ],

        changeImage: () => {
            util.imageChange = ( util.imageChange + 1) % util.textArray.length;
            return util.imageChange;
        },

        updateScrollingContent: () => {
            // Reset opacity
            util.scrollingContent.style.opacity = '1';

            util.imageChange = util.changeImage();

            util.scrollingText.textContent = util.textArray[ util.imageChange];
            
            console.log('***ads*** ',util.scrollingText.textContent)
            
            // Start scrolling
            util.setupText( util.textArray[util.imageChange]);

            // Schedule next update (after current scroll + pause + fade)
            setTimeout(util.updateScrollingContent, 20000); // total cycle
        },

        //for localstorage
        db: window.localStorage,

        memberDetect:()=>{
            if( ! util.db.getItem('profile')){
                
                //util.Toasted(`You are NOT yet Registered, pls register!`,4000,false);
                util.speaks("YOU are not yet Registered, kindly register!!!")

                var regModal = new bootstrap.Modal(document.getElementById('registerModal'));
                regModal.show();

            }else{
                var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }

        },
        speaks:null,

        //utility toastify
        Toasted:async(msg,nDuration,lClose)=>{
            Toastify({
                text: msg ,
                duration: nDuration,
                escapeMarkup: false, //to create html
                close: lClose,
                position:'center',
                offset:{
                    x: 0,
                    y:100//window.innerHeight/2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        },
        init:()=>{
            console.log('speaking')
            util.speaks('Welcome to LUAP Web apps!!!')
        },

    }; //end obj

    //dom load        
    document.addEventListener('DOMContentLoaded', function() {
        util.updateScrollingContent();

        util.speaks = (txt) =>{
            let speechsynth = new SpeechSynthesisUtterance();
            speechsynth.text = txt
            speechsynth.lang = "en-US"
            speechSynthesis.speak( speechsynth )
        };

        util.init();

        // const scrollingContent = document.getElementById("scrolling-content");
        
        // console.log ("This should show this"+scrollingContent)
   
        // Call the function on window resize
        window.addEventListener('load', util.checkScreenSize);
        window.addEventListener('resize', util.checkScreenSize);    

        window.addEventListener('scroll', util.parallax);

       
    });

