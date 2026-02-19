document.addEventListener('DOMContentLoaded', function () {
    slide_in_overlay();
    lazy_load_image();
    populate_athlete_testimonials();
    initScrollIndicators();
});

function slide_in_overlay() {
    const text = document.getElementById('animatedText');

    console.log(text);

    setTimeout(() => {
        text.classList.add('slide-up');
    }, 500);
}


function lazy_load_image() {

    const progressiveContainers = document.querySelectorAll('.progressive-image-container');

    const loadHighRes = (container) => {
        const highResSrc = container.getAttribute('data-high-res');
        const lowResSrc = container.getAttribute('data-low-res');
        const imgElement = container.querySelector('.high-res');

        // 1. Set the low-res image as the container background
        container.style.backgroundImage = `url(${lowResSrc})`;

        // 2. Load the high-res image into the actual <img> tag
        imgElement.src = highResSrc;

        imgElement.addEventListener('load', () => {
            // 3. Once the sharp image is loaded, add the class to fade it in
            container.classList.add('is-loaded');
        });

        // Remove data attributes after processing
        container.removeAttribute('data-high-res');
        container.removeAttribute('data-low-res');
    };
    // --- Intersection Observer for Lazy Loading ---
    // Intersection Observer is the modern standard for checking viewport visibility
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Image is visible in the viewport, load it!
                loadHighRes(entry.target);

                // Stop observing this image once loaded
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Load the image when it is 200px from entering the viewport
        rootMargin: '200px 0px 200px 0px',
    });

    // Start observing all high-res images
    progressiveContainers.forEach(img => {
        observer.observe(img);
    });
}

function initScrollIndicators() {
    const wrapper = document.querySelector('.scrolling-tabs-wrapper');

    if (!wrapper) return;

    const updateMask = () => {
        const scrollLeft = Math.ceil(wrapper.scrollLeft);
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

        // Use a 10px buffer for reliability
        const isAtStart = scrollLeft <= 10;
        const isAtEnd = scrollLeft >= (maxScroll - 10);

        if (isAtStart) {
            wrapper.classList.add('at-start');
            wrapper.classList.remove('at-end');
        } else if (isAtEnd) {
            wrapper.classList.add('at-end');
            wrapper.classList.remove('at-start');
        } else {
            wrapper.classList.remove('at-start', 'at-end');
        }
    };
    wrapper.addEventListener('scroll', updateMask);
    window.addEventListener('resize', updateMask);

    // Run once on load
    updateMask();
}


function populate_athlete_testimonials() {

    const tabData = [
        {
            id: "jake_bert", label: "Jake Bertelsen", content: "The results speak for themselves. This training has allowed me to unlock running potential I never knew existed. The plans are extremely well-tailored to maximize outcomes for any given training timeline or race length. This program places a heavy emphasis on the importance of recovery and adjustments are readily made to prevent overtraining and injuries. I feel confident and prepared when I toe the line for each race. From the mile to the marathon, we have been able to accomplish amazing feats in the sport, and I trust the best is yet to come!"
            , imageSrc: "images/jake_bert.webp"
        },
        {
            id: "jenn_davi", label: "Jennifer Davis", content: "Ben is the absolute best! Not only did he bring my marathon time down from 3:12 to 2:50 in just 5 months and half time to 1:17 in 7 months, he also helped me develop immense faith in my ability as a runner & develop a love for the process. Without prior running experience, I lacked racing confidence and Ben has helped significantly through constant communication, education and endless support. If you’re looking for a coach who is genuinely invested in your success and understanding you as an athlete look no further!"
            , imageSrc: "images/jen_davis.jpg"
        },
        {
            id: "elliot_rods", label: "Elliot Rodstrom", content: "The post college journey has been hard to navigate, but with Ben the transition has been seamless. Somehow he is able to make the combination of the complete training load and a full time job feel less stressfull than I could have managed alone. Ben helps adapt my training schedule more than every coach I've had in the past, which has proven to be successful with some of my recent races."
            , imageSrc: "images/elliot_rods.jpg"
        },
        {
            id: "david_duvic", label: "David Ducic", content: "Working with Coach Ben Bayless has allowed me to progress further in the sport than I could have ever imagined, all while developing my appreciation and understanding of the process. Top notch communication, expertise, and passion are necessary too effective coaching, and I am certain that this program embodies all. Taking a chance and reaching out was one of the best decisions I have ever made."
            , imageSrc: "images/david_duvic.png"
        },
        {
            id: "parker_banz", label: "Parker Banzhaf", content: "If you want to get better in all aspects of life, look no further. Ben possesses elite-level communication and is always on top of the little things to keep you adapting and always progressing further. It didn’t even feel like we were working over the phone with how frequently we communicated. Failing under the Dutchman method doesn’t even feel like a possibility."
            , imageSrc: "images/parker_banz_2.jpg"
        },
        {
            id: "alex_kowa", label: "Alex Kowalak", content: "Ben's coaching has been all about maintaining consistency over agressiveness in training, something that I truly enjoy, and have seen substantial progress with lately. With an unforgiving work schedule, Ben and I have come up with creative solutions to continue quality training and just getting out the door every day that I can."
            , imageSrc: "images/alex_kowa.jpg"
        },
        {
            id: "johnny_sayl", label: "Johnny Sayle", content: "Under Ben's coaching, I have progressed beyond where I was at in college, something that very few runners get to say. His philosophy of consistent 7/10 effort have worked wonders so far for me, including 30s off of my college 5k PR, and about a minute over my college 8k PR. Excelling at communication, Ben flawlessly adapts my training schedule to fit my busy work and life schedule. Cannot wait to see where we will continue to go in the future!"
            , imageSrc: "images/johnny_sayle.jpg"
        },
        {
            id: "max_bregozzo", label: "Max Bregozzo", content: "When I came to Matt, I was coming off a long period of self-coaching, not really having any structure or guidance within my training, I had some knowledge from being a student of the sport, but it limits your performance to a certain point. A priority from Matt was the obvious continuation of my aerobic development, as that is the limiting factor for me, and continuing what I was naturally good at already. He'd also love feedback from myself on the program and structure, and was always willing to be flexible if I communicated to him that didn't work with my schedule. I also had the opportunity to spent some time with Matt while he was home from college and honestly, I learned so much about the sport, how to approach it, and plenty of other bits of info that I still use today. The physiological progression was evident, I've ran times that 2 years ago I thought even come near. I'm so pleased that I can call Matt my coach but also my mate at the same time."
            , imageSrc: "images/max_bregozzo.jpg"
        },

        

    ];


    const tabNavContainer = document.getElementById('dynamic-tab-nav');
    const tabContentContainer = document.getElementById('dynamic-tab-content');

    console.log("TEST!!");

    let navHTML = '';
    let contentHTML = '';
    let imageHTML = '';

    tabData.forEach((item, index) => {
        const isActive = index === 0;
        const activeClass = isActive ? 'active' : '';
        const showClass = isActive ? 'show active' : '';
        const ariaSelected = isActive ? 'true' : 'false';

        // 1. Generate the Button/Label HTML
        navHTML += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${activeClass}" 
                        id="${item.id}-tab" 
                        data-bs-target="#${item.id}-pane" 
                        data-bs-toggle="pill" 
                        type="button" 
                        role="tab" 
                        aria-controls="${item.id}-pane" 
                        aria-selected="${ariaSelected}">
                    ${item.label}
                </button>
            </li>
        `;

        // 2. Generate the Content Pane HTML
        contentHTML += `
            <div class="tab-pane fade ${showClass} rajdhani-regular" 
                 id="${item.id}-pane" 
                 role="tabpanel" 
                 aria-labelledby="${item.id}-tab" 
                 tabindex="0">

                 <div class="row align-items-center">
                <div class="col-md-6 mb-3 mb-md-0">
                    <img src="${item.imageSrc}" class="athlete-image" alt="...">  
                </div>     

                <div class="col-md-6 text-start">
                    <h4 class="rajdhani-bold">${item.label}</h4>
                    <p class="fs-5">${item.content}</p>
                </div>     
                </div>
            </div>
        `;
        // <img src="${item.imageSrc}" class="col-md-6 float-md-end mb-3 ms-md-3 athlete-image" alt="...">       
    });

    // Insert the generated HTML into the DOM
    tabNavContainer.innerHTML = navHTML;
    tabContentContainer.innerHTML = contentHTML;
}