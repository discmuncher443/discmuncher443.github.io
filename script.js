document.addEventListener('DOMContentLoaded', function () {
    slide_in_overlay();
    lazy_load_image();
    populate_athlete_testimonials_2();
    initScrollIndicators();
    populate_pr_cards(4);
});

function slide_in_overlay() {
    const text = document.getElementById('animatedText');

    console.log(text);

    setTimeout(() => {
        text.classList.add('slide-up');
    }, 500);
}

function populate_pr_cards(limit = 4) {
    const prData = [
        {
            name: "Kent Ohori",
            coach: "Matt Hansen",
            category: "Marathon Focus",
            image: "images/kent_ohori.jpg",
            beforeTime: "2:55:23",
            currentTime: "2:29:12",
            improvement: "26 minute improvement in 12 months",
            beforePercent: 100,
            currentPercent: 65 // Significant visual drop for a huge marathon PR
        },
        {
            name: "Kye Lowth",
            coach: "Matt Hansen",
            category: "5k & 3k",
            image: "images/kye_lowth.jpg",
            beforeTime: "15:20 (5k)",
            currentTime: "14:26 (5k)",
            improvement: "54s improvement in 5k",
            beforePercent: 100,
            currentPercent: 72
        },
        {
            name: "Max Bregozzo",
            coach: "Matt Hansen",
            category: "Middle Distance",
            image: "images/max_bregozzo.jpg",
            beforeTime: "4:10 (1500m)",
            currentTime: "3:59 (1500m)",
            improvement: "11 second drop in one season",
            beforePercent: 100,
            currentPercent: 82 // Noticeable but smaller gap than the marathon
        },
        {
            name: "Rohan Nairn",
            coach: "Matt Hansen",
            category: "Middle Distance",
            image: "images/rohan_nairn.jpg",
            beforeTime: "9:45 (3k)",
            currentTime: "8:42 (3k)",
            improvement: "63 second drop in one season",
            beforePercent: 100,
            currentPercent: 70
        },
        {
            name: "Coleman Cronk",
            coach: "Ben Bayless",
            category: "Distance",
            image: "images/coleman_cronk.jpeg",
            beforeTime: "4:45 (Mile)",
            currentTime: "9:15 (3200)",
            improvement: "Major improvement in high school track",
            beforePercent: 100,
            currentPercent: 75
        },
        {
            name: "Lucas Bleakney",
            coach: "Ben Bayless",
            category: "Middle Distance",
            image: "images/lucas_bleakney.jpeg",
            beforeTime: "9:45 (3k)",
            currentTime: "8:42 (3k)",
            improvement: "63 second drop in one season",
            beforePercent: 100,
            currentPercent: 70
        },
        {
            name: "Nick Bruneavs",
            coach: "Ben Bayless",
            category: "Marathon",
            image: "images/nick_bruneavs.jpeg",
            beforeTime: "3:16",
            currentTime: "2:49",
            improvement: "27 minute drop in 6 months",
            beforePercent: 100,
            currentPercent: 68
        },
        {
            name: "Jake Bertelsen",
            coach: "Ben Bayless",
            category: "Road Focus",
            image: "images/jake_bert.webp",
            beforeTime: "2:38 (Marathon)",
            currentTime: "2:17 (Marathon)",
            improvement: "21 minute drop in 1 year",
            beforePercent: 100,
            currentPercent: 70
        },
        {
            name: "Parker Banzhaf",
            coach: "Ben Bayless",
            category: "Middle Distance / Distance",
            image: "images/parker_banzhaf.jpeg",
            beforeTime: "16:22 (5k)",
            currentTime: "15:23 (5k)",
            improvement: "59 second drop in under a year",
            beforePercent: 100,
            currentPercent: 78
        },
        {
            name: "Adam King",
            coach: "Ben Bayless",
            category: "Marathon",
            image: "images/adam_king.jpeg",
            beforeTime: "2:58",
            currentTime: "2:45",
            improvement: "13 minutes drop in 6 months",
            beforePercent: 100,
            currentPercent: 80
        }
    ];
    const container = document.getElementById('dynamic-pr-container');
    const seeMoreBtn = document.getElementById('see-more-btn');
    const btnContainer = document.getElementById('see-more-container');

    // Slice the data based on the limit provided
    const visibleData = prData.slice(0, limit);

    let html = '';
    visibleData.forEach(athlete => {
        // Inside your prData.forEach loop in populate_pr_cards:
        html += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="pr-card h-100 p-4">
                        <div class="pr-image-wrapper mb-3">
                            <img src="${athlete.image}" alt="${athlete.name}" class="img-fluid pr-img">
                        </div>
                        <div class="pr-content">
                            <h4 class="rajdhani-bold text-uppercase mb-1">${athlete.name}</h4>
                            
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <div class="badge bg-dark rajdhani-regular">${athlete.category}</div>
                                <div class="badge coach-badge rajdhani-regular">Coach: ${athlete.coach}</div>
                            </div>
                            
                            <div class="pr-stats">
                                <div class="pr-item mb-3">
                                    <div class="d-flex justify-content-between rajdhani-bold small">
                                        <span>BEFORE</span>
                                        <span>${athlete.beforeTime}</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill initial" style="width: ${athlete.beforePercent}%"></div>
                                    </div>
                                </div>
                                
                                <div class="pr-item">
                                    <div class="d-flex justify-content-between rajdhani-bold text-success small">
                                        <span>CURRENT</span>
                                        <span>${athlete.currentTime}</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill improved" style="width: ${athlete.currentPercent}%"></div>
                                    </div>
                                </div>
                            </div>
                            <p class="rajdhani-regular mt-3 mb-0 small text-muted">*${athlete.improvement}</p>
                        </div>
                    </div>
                </div>
            `;
    });

    container.innerHTML = html;

    // Handle button visibility and logic
    if (limit >= prData.length) {
        btnContainer.style.display = 'none'; // Hide if all are shown
    } else {
        seeMoreBtn.onclick = () => {
            // When clicked, show everything (or increase the number)
            populate_pr_cards(prData.length);

            // Optional: Smooth scroll down to the new cards
            window.scrollBy({ top: 300, behavior: 'smooth' });
        };
    }
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
function populate_athlete_testimonials_2() {
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

    let navHTML = '';
    let contentHTML = '';

    tabData.forEach((item, index) => {
        const isActive = index === 0;
        const activeClass = isActive ? 'active' : '';
        const showClass = isActive ? 'show active' : '';
        const ariaSelected = isActive ? 'true' : 'false';

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

        // Updated structure with the testimonial-card class
        // Inside populate_athlete_testimonials() loop:
        contentHTML += `
    <div class="tab-pane fade ${showClass}" 
         id="${item.id}-pane" 
         role="tabpanel" 
         aria-labelledby="${item.id}-tab">

        <div class="testimonial-card flip-container" onclick="this.classList.toggle('flipped')">
            <div class="flipper">
                
                <div class="front">
                    <div class="row g-0 align-items-stretch h-100">
                        <div class="col-md-5">
                            <img src="${item.imageSrc}" class="testimonial-img-dynamic" alt="${item.label}">
                        </div>     
                        <div class="col-md-7 d-flex flex-column justify-content-center p-4 p-md-5">
                            <div class="product-badge rajdhani-bold mb-3">Athlete Story</div>
                            <h3 class="rajdhani-bold text-uppercase mb-2">${item.label}</h3>
                            <p class="rajdhani-regular testimonial-text">"${item.content}"</p>
                            <small class="text-muted mt-3 rajdhani-bold">Click to view stats ↻</small>
                        </div>     
                    </div>
                </div>

                <div class="back d-flex flex-column justify-content-center align-items-center text-center p-5">
                    <div class="product-badge rajdhani-bold mb-4">Latest Activity</div>
                    <h3 class="rajdhani-bold text-uppercase">${item.label}</h3>
                    <div class="strava-placeholder my-4">
                        <p class="rajdhani-regular fs-4 mb-1">Coming Soon: Strava Integration</p>
                        <p class="text-muted">Live training data and recent runs.</p>
                    </div>
                    <button class="btn btn-outline-dark btn-sm rajdhani-bold">Back to Story</button>
                </div>

            </div>
        </div>
    </div>
`;
    });

    tabNavContainer.innerHTML = navHTML;
    tabContentContainer.innerHTML = contentHTML;
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