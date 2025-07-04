
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
        
        
        //testimonialContainer.appendChild(card); take out muna lagay sa  fetch()
        //observer.observe(card);
    });

    const util = {
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
            
            ////console.log('***ads*** ',util.scrollingText.textContent)
            
            // Start scrolling
            util.setupText( util.textArray[util.imageChange]);

            // Schedule next update (after current scroll + pause + fade)
            setTimeout(util.updateScrollingContent, 20000); // total cycle
        },

        //for localstorage
        db: window.localStorage,
        
        getMemberCode:() =>{

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
            var yyyy = today.getFullYear()
            var hh = String( today.getHours()).padStart(2,'0')
            var mmm = String( today.getMinutes()).padStart(2,'0')
            var ss = String( today.getSeconds()).padStart(2,'0')

            today = `LUAP-${yyyy}${mm}${dd}${hh}${mmm}${ss}`
            return today
        },
        
        regModal:null,
        profile:null,

        memberDetect:()=>{
            //off keyboard cofig
            const configObj = { keyboard: false, backdrop:'static' }
		
            if( ! util.db.getItem('profile')){
                
                //util.Toasted(`You are NOT yet Registered, pls register!`,4000,false);
                util.speaks("YOU are not yet Registered, kindly register!!!")

                util.regModal = new bootstrap.Modal(document.getElementById('registerModal'), configObj);
                util.regModal.show();

                document.getElementById('member_id').value = util.getMemberCode()

            }else{
                util.profile = JSON.parse( util.db.getItem('profile'))
                util.speaks(`Welcome ${util.profile.fullname}`)

                //var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), configObj);
                //loginModal.show();
            }

        },

        //===== SAVE MEMBERSHIP TO DB
        //====rider  save transaction / save remittance
        saveMember:async function(url="",xdata={}){

            util.speaks('Saving Transaction to Database, Please Wait!!!')
                                
            await fetch(url,{
                method:'POST',
                cache:'reload',
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(xdata)
            })
            .then((response) => {  //promise... then 
                return response.json();
            })
            .then( (data) => {
 
                if(data.success=="ok"){
                    util.speaks(('RECORD SUCCESSFULLY SAVED!!!'))
                    util.Toasted('RECORD SUCCESSFULLY SAVED!!!',4000,false)
                    util.regModal.hide()

                    //create profile
                    util.db.setItem('profile', JSON.stringify(xdata) )
                

                }else{
                    util.speaks('DATABASE ERROR! PLEASE CHECK!')
                }

                
            })  
            .catch((error) => {
                util.Toasted(`Error:, ${error}`,2000,false)
                console.error('Error:', error)
            })    
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
                    background: "linear-gradient(to right, #1a0003, #350408)"
                }
            }).showToast();
        },

         //==========FOR ALL THE DATA ENTRY FORM LOAD THIS FIRST TO BE ABLE TO BE VALIDATED ===//
        loadFormValidation:(eHashFrm)=>{

            console.log('===util.loadFormValidation()==', eHashFrm)
            let aForms = [eHashFrm] 
            let aFormx

            //loop all forms
            aForms.forEach( (element) => {
                aFormx = document.querySelectorAll(element)
                //console.log(aFormx[0])
                if(aFormx){
                    let aFormz = aFormx[0]
                    //console.log(aFormz.innerHTML)
                    Array.from(aFormz.elements).forEach((input) => {
                
                        if(!input.classList.contains('p1') &&
                            !input.classList.contains('p2')){//process only non-password field
                                input.addEventListener('keyup',(e)=>{
                                    if(input.checkValidity()===false){
                                        input.classList.remove('is-valid')
                                        input.classList.add('is-invalid')
                                        e.preventDefault()
                                        e.stopPropagation()

                                    } else {
                                        input.classList.remove('is-invalid')
                                        input.classList.add('is-valid')
                                    } //eif
                                },false)

                                input.addEventListener('blur',(e)=>{

                                    if(input.checkValidity()===false){
                                        input.classList.remove('is-valid')
                                        input.classList.add('is-invalid')
                                        e.preventDefault()
                                        e.stopPropagation()

                                    } else {
                                        input.classList.remove('is-invalid')
                                        input.classList.add('is-valid')
                                    } //eif
                                },false)
                        }else{ //=== if input contains pssword field
                            if(input.classList.contains('p1')){
                                if(eModal=="signupModal"){
                                    util.passwordCheck(input,passwordAlert)        
                                }
                            }else{
                                util.passwordFinal(input)
                            }
                            
                        }//else password field

                    }) //end all get input
                }
            })///=====end loop form to get elements	
        },

        
        //==========WHEN SUBMIT BUTTON CLICKED ==================
        validateMe: async (frmModal, frm, classX)=>{
            console.log('validateMe()===', frmModal, frm)
            
            const myIp = "https:/luap-onrender.onrender.com" 
            
            const forms = document.querySelectorAll(frm)
            const form = forms[0]
            let xmsg

            let aValid=[]
            
            Array.from(form.elements).forEach((input) => {
                
                if(input.classList.contains(classX)){
                    aValid.push(input.checkValidity())
                    if(input.checkValidity()===false){
                        console.log('invalid ',input)
                        
                        input.classList.add('is-invalid')
                    }else{
                    input.classList.add('is-valid')
                    }
                }
            })

            if(aValid.includes(false)){
                util.Toasted('Error, Please CHECK Your Entry, ERROR FIELDS MARKED IN RED!',3000,false)
                util.speaks('Error!!! Please CHECK Your Entry, ERROR FIELDS MARKED IN RED!')
                console.log(`====PLEASE DON'T POST!!!!===`)
                return false
            }else{
                
                //getform data for posting
                const mydata = document.getElementById(frm.replace('#',''))
                let formdata = new FormData(mydata)
                let objfrm = {}
                
                //// objfrm.grp_id="1" <-- if u want additional key value
                
                for (var key of formdata.keys()) {
                    if(key=="pw2"){
                        //console.log('dont add',key)
                    }else{
                    objfrm[key] = formdata.get(key);
                    
                    }
                }
                
                //objfrm.date_reg = util.getDate()

                //console.log('post this',frm,objfrm)

                //=== POST NA!!!
                switch(frm){ 
                    case '#loginForm':
                        xmsg = "<div><i class='fa fa-spinner fa-pulse' ></i>  Searching Database please wait...</div>"
                        util.alertMsg( xmsg,'danger','loginPlaceHolder')

                        util.url = `${myIp}/loginpost/${objfrm.uid}/${objfrm.pwd}`
                        
                        util.loginPost(frm ,frmModal,`${util.url}`)

                    break
                    
                   
                    case "#registerForm":
                        util.saveMember(`${myIp}/save/savemember`,objfrm)
                        console.log('SAVING..')
                        console.log('post this',frm,objfrm)

                    break

                }//end switch

                return

            }//endif
        },

        mongoModal : null,
        mongoURL:'',
        mongoRefNo:'',
        //paygcash
        paygcash:(eventname,member,amount)=>{

            if(!util.db.getItem('profile')){
                util.speaks('YOU ARE NOT A MEMBER PLEASE REGISTER FIRST')
                
                //off keyboard cofig
                const configObj = { keyboard: false, backdrop:'static' }
		
                util.regModal = new bootstrap.Modal(document.getElementById('registerModal'), configObj);
                util.regModal.show();

                return false;
            }

            const xname = JSON.parse( util.db.getItem('profile') )
            console.log( `for ${eventname},${xname.fullname},${amount}`)

            let obj = {}

            obj.amount = parseFloat(amount)

            obj.description = `${eventname} for ${xname.fullname} `

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(obj)
            }

            const myIp = "https:/luap-onrender.onrender.com" 
            //const myIp = "http://192.168.43.221:10000"

            fetch(`${myIp}/luap/pay`, options)
            .then( response => response.json()) // if the response is a JSON object
            .then( data => {
                console.log( 'fetch data',data )
                //zonked.gcashdata = data
                
                //util.modalShow( 'gcashmodal')
                //window.location.href = data.data.attributes.checkout_url
                
                util.mongoURL = data.data.attributes.checkout_url
                //util.mongoURL = "./checkout.html"
                
                util.mongoRefNo = data.data.attributes.reference_number

                
                util.mongoModal = new bootstrap.Modal(document.getElementById('gcashmodal'),  { keyboard: false, backdrop:'static' })

                util.mongoModal.show();

                return true

            })
            // Handle the success response object
            .catch( (error) => {
                console.log(error) // Handle the error response object
            });
        },//==== end paygcash =====

        //checkpayment
        checkPayment:async()=>{

            let obj = {}
            obj.refno = util.mongoRefNo
            
            const myIp = "https://asn-jtgrp-api.onrender.com" 
            //const myIp = "http://192.168.43.221:10000"

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(obj)
            }

            await fetch(`${myIp}/luap/payref`,options)
            .then( (response) => {
                return response.json() // if the response is a JSON object
            })
            .then( (data) =>{

                switch(data.xdata.status.toUpperCase()){
                    case "UNPAID":
                        Toastify({
                            text: `PLS CHECK AGAIN, SERVER UPDATE TAKES A WHILE \n OR YOU'RE NOT DONE YET WITH PAYMENT PROCESS!`,
                            duration:6000,
                            close:false,
                            position:'center',
                            offset:{
                                x: 0,
                                y:100//window.innerHeight/2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                            },
                            style: {
                            background: "linear-gradient(to right, #1a0003, #350408)",
                            }
                        }).showToast();
                        return false

                        break     
                    
                    case "PAID":
                        // console.log('disabling btn')
                        // document.getElementById(`call-btn-${zonked.refnobtnidx}`).disabled = false
                        // document.getElementById(`gcash-btn-${zonked.refnobtnidx}`).disabled = true
                        // document.getElementById(`gcash-btn-${zonked.btnidx}`).innerHTML='<i class="fa fa-thumbs-up"></i>&nbsp;PAID!'
                        
                        // const closebtn = document.getElementById('close-btn')
                        // closebtn.classList.remove('hide-me')
                        // closebtn.disabled = false


                        // const checkbtn = document.getElementById('check-btn')
                        // checkbtn.classList.add('hide-me')
                        // checkbtn.disabled = true
        
                        break;    
                }//endsw
                
                Toastify({
                    text: `PAYMENT STATUS: "${data.xdata.status.toUpperCase()}"`,
                    duration:3000,
                    close:false,
                    position:'center',
                    offset:{
                        x: 0,
                        y:100//window.innerHeight/2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                    },
                    style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            
                
                document.getElementById('gcash').src=''
                util.mongoModal.hide()
                
            })
            // Handle the success response object
            .catch( (error) => {
                console.log(error) // Handle the error response object
            });
            //zonked.getCalendar()
            return true
        },

        //====RUN ONLYY  ONCE PER REGISTERD BUSINESS ACCOUNT OF PAYMONGO, 
        registerWebHook:async()=>{

            console.log('==RUNNING WEBHOOK')
            const secretKey = ''

            //const encodedKey = Buffer.from(secretKey + ':').toString('base64');

            try {
                const response = await fetch('https://api.paymongo.com/v1/webhooks', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Basic ' + btoa(secretKey + ':'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "data": {
                        "attributes": {
                            "url": "https://luap-onrender.onrender.com/luap/webhook",
                            "events": [
                                "payment.paid",
                                "payment.failed"
                            ]
                        }
                    }
                })
            });

            const result = await response.json();
            console.log('Webhook created:', result);
            } catch (error) {
            console.error('Error creating webhook:', error);
            }
       },
       
       socket:null,

        //instantiate
        init:()=>{
            console.log('speaking')
            util.speaks('Welcome to LUAP Web apps!!!')

            const myIp = "https://luap-onrender..onrender.com" 
            
            //form validate
            util.loadFormValidation('#registerForm')
            util.loadFormValidation('#loginForm')

            //off keyboard cofig
            const configObj = { keyboard: false, backdrop:'static' }
		
            // Attach click events to all event images
            document.querySelectorAll('.event-img').forEach(img => {
                img.addEventListener('click', function() {
                const largeSrc = this.getAttribute('data-large');
                document.getElementById('modalImage').src = largeSrc;
                const modal = new bootstrap.Modal(document.getElementById('imageModal'), configObj);
                modal.show();
                });
            });

            //initialize node socket.io
            let authz = []
            authz.push(1)
            authz.push('CALOY TEST USER')
         
            console.log(authz[1])

            //==HANDSHAKE FIRST WITH SOCKET.IO
            const userName = { token : authz[1] , mode: 1}//full name token

            util.socket = io.connect(`https://luap-onrender.onrender.com`, {
                //withCredentials: true,
                transports: ['websocket', 'polling'], // Same as server
                upgrade: true, // Ensure WebSocket upgrade is attempted
                rememberTransport: false, //Don't keep transport after refresh
                query:`userName=${JSON.stringify(userName)}`
                // extraHeaders: {
                //   "osndp-header": "osndp"
                // }
            });//========================initiate socket handshake ================

            //socket.io listener
            util.socket.on('payment_update', (data) => {
                console.log('******Payment update received:****', data);
            
                // Handle different webhook events
                if (data.attributes.type === 'payment.paid') {
                    Toastify({
                        text: `PAYMENT STATUS: PAID!!!"`,
                        duration:4000,
                        close:false,
                        position:'center',
                        offset:{
                            x: 0,
                            y:100//window.innerHeight/2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                        style: {
                        background: "linear-gradient(to right,rgb(0, 176, 155), #96c93d)",
                        }
                    }).showToast();
                                   
                    document.getElementById('gcash').src=''
                    
                    util.mongoModal.hide() 

                } else if (data.type === 'payment.failed') {
                    alert('PAYMENT FAILED!!!')
                } 
            });

            util.socket.on('connect', () => {
                console.log('Connected to Socket.IO server using:', util.socket.io.engine.transport.name); // Check the transport
            });

            util.socket.on('disconnect', () => {
                console.log('Disconnected from Socket.IO server');
            });
            ///done register  don't uncomment this  except for new
            //paymongo account this is for LUAP-APP test paymongo
            // util.registerWebHook()////
           
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

        const modalEl = document.getElementById('gcashmodal');

        // Attach event listener for after modal is shown
        modalEl.addEventListener('shown.bs.modal', () => {
            console.log('Modal is now visible!');
            // Put your code here
            const iframe = document.getElementById('gcash')

            iframe.height=window.innerHeight - 160
            iframe.src = util.mongoURL
        });

    });

