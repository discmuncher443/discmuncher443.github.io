document.addEventListener('DOMContentLoaded', function () {

    populate_athlete_testimonials();

});

function populate_athlete_testimonials() {

    const tabData = [
        { id: "cat", label: "Section 1: The Cat", content: "SAMPLE CONTENT1 SAMPLE CONTENT1 SAMPLE CONTENT1 SAMPLE CONTENT1 SAMPLE CONTENT1 SAMPLE CONTENT1 ", imageSrc: "images/bayless_roster.jpg"},
        { id: "dog", label: "Section 2: The Dog", content: "SAMPLE CONTENT2 SAMPLE CONTENT2 SAMPLE CONTENT2 SAMPLE CONTENT2 SAMPLE CONTENT2 SAMPLE CONTENT2 ", imageSrc: "images/Skull_and_Crossbones.png"},
        { id: "bird", label: "Section 3: The Bird", content: "SAMPLE CONTENT3333 SAMPLE CONTENT3333 SAMPLE CONTENT3333 SAMPLE CONTENT3333 SAMPLE CONTENT3333 SAMPLE CONTENT3333 ", imageSrc: "images/dutchman_boat.jpg"}
    ];


    const tabNavContainer = document.getElementById('dynamic-tab-nav');
    const tabContentContainer = document.getElementById('dynamic-tab-content');
    const tabImageContainer = document.getElementById('dynamic-tab-image');

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
            <button class="nav-link ${activeClass}" 
                    id="${item.id}-tab" 
                    data-bs-toggle="pill" 
                    data-bs-target="#${item.id}-pane" 
                    type="button" 
                    role="tab" 
                    aria-controls="${item.id}-pane" 
                    aria-selected="${ariaSelected}">
                ${item.label}
            </button>
        `;

        // 2. Generate the Content Pane HTML
        contentHTML += `
            <div class="tab-pane fade ${showClass} rajdhani-regular" 
                 id="${item.id}-pane" 
                 role="tabpanel" 
                 aria-labelledby="${item.id}-tab" 
                 tabindex="0">
                ${item.content}
                <img src="${item.imageSrc}" class="col-md-6 float-md-end mb-3 ms-md-3" alt="...">       
            </div>
        `;
    });

    // Insert the generated HTML into the DOM
    tabNavContainer.innerHTML = navHTML;
    tabContentContainer.innerHTML = contentHTML;
    tabImageContainer.innerHTML = imageHTML;

}