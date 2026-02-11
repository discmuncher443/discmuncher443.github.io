document.addEventListener('DOMContentLoaded', function () {
    slide_in_overlay();
    lazy_load_image();
    populate_athlete_testimonials();
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



function populate_athlete_testimonials() {

    const tabData = [
        { id: "jake_bert", label: "Jake Bertlesen", content: "The results speak for themselves. This training has allowed me to unlock running potential I never knew existed. The plans are extremely well-tailored to maximize outcomes for any given training timeline or race length. This program places a heavy emphasis on the importance of recovery and adjustments are readily made to prevent overtraining and injuries. I feel confident and prepared when I toe the line for each race. From the mile to the marathon, we have been able to accomplish amazing feats in the sport, and I trust the best is yet to come!"
            , imageSrc: "images/jake_bert.webp" },
        { id: "jenn_davi", label: "Jennifer Davis", content: "Ben is the absolute best! Not only did he bring my marathon time down from 3:12 to 2:50 in just 5 months and half time to 1:17 in 7 months, he also helped me develop immense faith in my ability as a runner & develop a love for the process. Without prior running experience, I lacked racing confidence and Ben has helped significantly through constant communication, education and endless support. If you’re looking for a coach who is genuinely invested in your success and understanding you as an athlete look no further!"
            , imageSrc: "images/jen_davis.jpg" },
        { id: "elliot_rods", label: "Elliot Rodstrom", content: "The workout warrior that shows up every day. Throwing down monster training to translate to Case Western indoor facility records"
            , imageSrc: "images/elliot_rods.jpg" },
        { id: "david_duvic", label: "David Duvic", content: "Working with Coach Ben Bayless has allowed me to progress further in the sport than I could have ever imagined, all while developing my appreciation and understanding of the process. Top notch communication, expertise, and passion are necessary too effective coaching, and I am certain that this program embodies all. Taking a chance and reaching out was one of the best decisions I have ever made."
            , imageSrc: "images/david_duvic.png" },
        { id: "parker_banz", label: "Parker Banzhaf", content: "If you want to get better in all aspects of life, look no further. Ben possesses elite-level communication and is always on top of the little things to keep you adapting and always progressing further. It didn’t even feel like we were working over the phone with how frequently we communicated. Failing under the Dutchman method doesn’t even feel like a possibility."
            , imageSrc: "images/parker_banz_2.jpg" },
        { id: "alex_kowa", label: "Alex Kowalek", content: "Adapting to a difficult working schedule, Alex has maintained an impressive training load, through a strenous work schedule"
            , imageSrc: "images/alex_kowa.jpg" },
        { id: "johnny_sayl", label: "Johnny Sayle", content: "He's doing alright so far, keep going!"
            , imageSrc: "images/johnny_sayle.jpg" },

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