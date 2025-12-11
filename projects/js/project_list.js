// Dynamic Projects Generator
document.addEventListener('DOMContentLoaded', function() {
const projectHtmlPaths = {
    "Mr. Ahmed Gamal 2D-Plan": "2D_Projects/Ahmed_Gamal.html",
    "Mr. Abdalla Taher, 2D-Plan": "2D_Projects/Abdalla_Taher.html",
    "Eng. Ashraf Farag, 2D-Plan": "2D_Projects/Ashraf_Farag.html"
};


    const descriptions = [
        "A complete finishing Modern Villa 5th settlement New Cairo for a two-story residential villa, executed using premium marble and high-quality materials. All works were carried out in strict accordance with the approved design, ensuring exceptional detailing and a refined final appearance.",
        "A comprehensive finishing project for a three-story villa in Madinaty, completed with premium materials and meticulous craftsmanship to reflect the client’s vision and deliver a refined, elegant living experience.",
        "A complete interior finishing project for an apartment in El Shorouk City, executed with high-quality materials and careful attention to detail to achieve a modern, comfortable, and aesthetically balanced living space.",
        "A medium-level finishing project for an apartment in Nasr City, delivered with practical material selections and clean, efficient execution to provide a comfortable and well-organized living space that meets the client’s needs and budget.",
        "A high-end finishing project for a three-story luxury villa in SODIC, New Cairo. Executed with premium materials, bespoke detailing, and top-tier craftsmanship to deliver an exceptional, elegant, and refined living environment that reflects the highest standards of design and quality.",
        "A medium-level finishing project for an apartment in Elshorouq City, delivered with practical material selections and clean, efficient execution to provide a comfortable and well-organized living space that meets the client’s needs and budget.",
        "A budget-friendly finishing project for an apartment prepared with essential materials and simple, functional execution. Designed to offer a clean and practical living space suitable for rental purposes at an affordable price.",
        "A complete interior finishing project for an apartment in El Shorouk City, executed with high-quality materials and careful attention to detail to achieve a modern, comfortable, and aesthetically balanced living space.",
        "A complete finishing Modern Villa for a two-story residential villa, executed using premium marble and high-quality materials. All works were carried out in strict accordance with the approved design, ensuring exceptional detailing and a refined final appearance.",
        "A high-end finished apartment in El-Shorouk City. Featuring premium materials and meticulous detailing, this project highlights modern elegance and sophisticated living, with work completed to the highest standards.",
        "A high-end finished apartment in El-Shorouk City. Featuring premium materials and meticulous detailing, this project highlights modern elegance and sophisticated living, with work completed to the highest standards.",
        "A budget-friendly finishing project for an apartment prepared with essential materials and simple, functional execution. Designed to offer a clean and practical living space suitable for rental purposes at an affordable price.",
        "A high-end finished apartment in El-Shorouk City. Featuring premium materials and meticulous detailing, this project highlights modern elegance and sophisticated living, with work completed to the highest standards.",
        "A high-end finishing project for a three-story luxury villa in Palm Hills, New Cairo. Executed with premium materials, bespoke detailing, and top-tier craftsmanship to deliver an exceptional, elegant, and refined living environment that reflects the highest standards of design and quality.",
        "A compact yet stylish apartment, combining elegance and luxury in a small space. Thoughtful design and premium finishes create a chic, comfortable living environment.",
        "A complete interior finishing project for an apartment in El Ashrafeyya Coumpound, executed with high-quality materials and careful attention to detail to achieve a modern, comfortable, and aesthetically balanced living space.",
        // ongoing
        "An ongoing project in Mountain View, New Cairo. This three-story villa showcases high-quality finishes, elegant design, and meticulous craftsmanship, with work still in progress to achieve modern luxury living.",
        "An ongoing project at Stone Residence, Mokattam. This apartment combines modern design and quality finishes, with work still in progress, promising a stylish and sophisticated living space upon completion.",
     // 2d
        "A comprehensive 2D design project including all technical drawings: plumbing, electrical layouts, ceiling details, lighting distribution, Air Conditioning planning, and more—delivering a fully coordinated and detailed project package.",
        "A comprehensive 2D design project including all technical drawings: plumbing, electrical layouts, ceiling details, lighting distribution, Air Conditioning planning, and more—delivering a fully coordinated and detailed project package.",
        "A comprehensive 2D design project including all technical drawings: plumbing, electrical layouts, ceiling details, lighting distribution, Air Conditioning planning, and more—delivering a fully coordinated and detailed project package.",
// 3d
        "A 3D design project for a bakery shop, created to showcase the concept’s aesthetic and functional layout. The design highlights a warm, modern atmosphere tailored to the client’s vision.",
        "A 3D interior design concept for a modern apartment, focusing on simplicity, smart space use, and elegant contemporary elements. The design aims to create a welcoming and refined atmosphere.",
        "A 3D design project for a semi-classic villa, presenting a refined blend of elegance and modern comfort. The concept showcases balanced detailing and a timeless interior atmosphere.",
        "A 3D design project for a modern apartment, featuring clean lines, functional layouts, and contemporary finishes. The concept highlights a sleek, stylish, and comfortable living environment.",
        "A 3D design project for a modern apartment, featuring clean lines, functional layouts, and contemporary finishes. The concept highlights a sleek, stylish, and comfortable living environment.",


// lavista :<>
        "A high-end finishing project for a spacious two-story villa in Ain Sokhna, executed with premium materials and meticulous craftsmanship. The project features elegant wooden parquet flooring and refined detailing throughout, delivering a warm, luxurious, and distinguished living experience by the sea.",
        "A full interior finishing project for a modern apartment in Nasr City, completed with high-quality materials and precise execution to match the client’s approved design and deliver a comfortable, stylish living space.",
         

];

    // Locations for variety
    const locations = [
        "Address East Compound",
        "Madinaty",
        "El Shorouk City",
        "Nasr City",
        "SODIC - New Cairo",
        "Elshorouq City",
        "Elshorouq City",
        "El Shorouk City",
        "El-Shorouk City",
        "El-Shorouk City",
        "El-Shorouk City",
        "Elshorouq City",
        "El-Shorouk City",
        "Palm Hills - New Cairo",
        "6th October City",
        "5th Settlement",
        "Mountain View - New Cairo",
        "Stone Residence, Mokattam",
        "Nasr City",
        "6th October City",
        "El-Obour City",
        //3d
        "5th Settlement",
        "5th Settlement",
        "5th Settlement",
        "5th Settlement",
        "5th Settlement",


        "La Vista 6 - Ain Sokhna",
"Nasr City",


    ];



    const years = [
        "2020 - 2022",
        "2023 - 2024",
        "2021 - 2025",
        "2023 - 2024",
        "2022 - 2023",
        "2025 - 2025",
        "2025 - 2025",
        "2021 - 2025",
        "2022 - 2025",
        "2024 - 2025",
        "2024 - 2025",
        "2025 - 2025",
        "2024 - 2025",
        "2021 - 2023",
        "2024 - 2025",
        "2021 - 2022",
        "2025 - Now",
        "2025 - Now",
// 2d
        "2021 - 2021",
        "2024 - 2024",
        "2022 - 2022",
// 3d
        "2022 - 2022",
        "2025 - 2025",
        "2023 - 2023",
        "2025 - 2025",
        "2025 - 2025",

        "2021 - 2023",
         "2022 - 2024",
         
        
    ];


    const sizes = [
        "480 Sq ft",
        "560 Sq ft",
        "210 Sq ft",
        "180 Sq ft",
        "540 Sq ft",
        "230 Sq ft",
        "190 Sq ft",
        "210 Sq ft",
        "435 Sq ft",
        "220 Sq ft",
        "220 Sq ft",
        "190 Sq ft",
        "220 Sq ft",
        "550 Sq ft",
        "90 Sq ft",
        "170 Sq ft",
        "390 Sq ft",
        "180 Sq ft",

        "160 Sq ft",
        "90 Sq ft",
        "1680 Sq ft",

        // 3d
        "70 Sq ft",
        "260 Sq ft",
        "260 Sq ft",
        "260 Sq ft",
        "175 Sq ft",


        "475 Sq ft",


"220 Sq ft",

    ];

    // Array of all project names
    const projectNames = [
        "306 Adress East",
        "Eng. Ashraf Hamed",
        "Eng. Hesham Zayed",
        "Dr. Nadia Taleb",
        "18A7 East Town (Sodic)",
        "Eng. Essam Abd-Elaziz",
        "Mrs. Gehan Omar",
        "Eng. Ahmed Hesham",
        "Mr. Mostafa Elgarhy",
        "Dr. Ola Gamal",
        "Eng. Ali Waheed",
        "Dr. Ola Gamal 2",
        "Eng. Mohamed Waheed",
        "707 Palm Hills Katameya",
        "Mr. Abdalla Taher",
        "Mr. Mazen Ali",
// on comming
        "Benta House 70-3 Mountain View New Cairo",  
        "Stone Residence 40- 3" ,
// 2d Plans
        "Mr. Ahmed Gamal 2D-Plan", 
        "Mr. Abdalla Taher, 2D-Plan",
        "Eng. Ashraf Farag, 2D-Plan",
// 3d
        "Binotte Bakery",
        "Dr. Reham Gamal",
        "Eng. Samah Elkady",
        "Mr. Amr Elsayed",
        "Mr. Mohamed Elkammah",

// lavista
        "122 La Viesta 6",

          "Mrs. Aliaa Elhadidi",

    ];



    // array of the categories.
    const categoriesName = [
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "Completed_Projects",
        "On_Going_Projects",
        "On_Going_Projects",

        "2D_Projects",
        "2D_Projects",
        "2D_Projects",

        "3D_Projects",
        "3D_Projects",
        "3D_Projects",
        "3D_Projects",
        "3D_Projects",

        "Completed_Projects",

    ];

    // Array of Unsplash image IDs for variety
const imageIds = [
    "Projects/Completed_Projects/Adress/1.jpeg",
    "Projects/Completed_Projects/Ashraf/1.jpeg",
    "Projects/Completed_Projects/baba/1.jpg",
    "Projects/Completed_Projects/Dr. Nadia/1.jpg",
    "Projects/Completed_Projects/East Town (Sodic)/1.webp",
    "Projects/Completed_Projects/Eng. Essam/1.jpg",
    "Projects/Completed_Projects/Gegy/1.jpg",
    "Projects/Completed_Projects/Mine/Mine/1.jpg",
    "Projects/Completed_Projects/Mostafa/1.jpg",
    "Projects/Completed_Projects/Ola/1.jpg",
    "Projects/Completed_Projects/Ola Ali/1.jpg",
    "Projects/Completed_Projects/Ola Hala/5.jpg",
    "Projects/Completed_Projects/Ola Mohamed Waheed/1.jpg",
    "Projects/Completed_Projects/Palm Hills/Render/5.jpg",
    "Projects/Completed_Projects/Sara Raga2y/1.jpeg",
    "Projects/Completed_Projects/Achrafieh/1.jpeg",

    "Projects/On_Going_Projects/Mountain_View/1.jpeg",
    "Projects/On_Going_Projects/Stone_Residence/1.jpeg",

    "../imgs/AhmedGamal.png",
    "../imgs/AbdallaTaher.png",
    "../imgs/AshrafFarag.png",

    "Projects/3D_Projects/Binotte_Bakery/1.jpg",
    "Projects/3D_Projects/Dr_Reham_Gamal/1.jpeg",
    "Projects/3D_Projects/Eng_Samah_Elkady/1.jpeg",
    "Projects/3D_Projects/Mr_Amr_Elsayed/2.jpeg",
    "Projects/3D_Projects/Mr_Mohamed_Elkammah/1.jpg",
    

    "Projects/Completed_Projects/La_Viesta/Site/5.jfif",

    "Projects/Completed_Projects/Mrs_Aliaa_Elhadidi/5.webp",

];





// Project categories for filtering buttons - using underscores for data-filter attribute
    const categories = ["all", "2D_Projects", "3D_Projects", "Completed_Projects", "On_Going_Projects"];
    const categoryDisplayNames = {
        "all": "All Projects",
        "2D_Projects": "2D Projects",
        "3D_Projects": "3D Projects",
        "Completed_Projects": "Completed Projects",
        "On_Going_Projects": "On Going Projects"
    };

    // Get the projects container
    const projectsContainer = document.getElementById('projects-container');

    // Clear container if needed
    projectsContainer.innerHTML = '';

    // Create project cards for each name
    projectNames.forEach((name, index) => {
        // Get category for this project
        const categoryFinal = categoriesName[index] || "Completed_Projects";
        
        // Get display name for category
        const categoryDisplay = categoryDisplayNames[categoryFinal] || categoryFinal.replace('_', ' ');

        // Determine project number
        const projectNumber = index + 1;

        // Get location for this project
        const location = locations[index];

        // Get year for this project
        const year = years[index];

        // Get size for this project
        const size = sizes[index];

        // Get description for this project
        const description = descriptions[index];

        // Get image ID for this project
        const imageId = imageIds[index % imageIds.length];

        // Create the project card HTML
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', categoryFinal);

let projectLink = projectHtmlPaths[name] || `project-details.html?${projectNumber}`;

projectCard.innerHTML = `
    <div class="project-image" onclick="window.location.href='${projectLink}'" style="cursor: pointer;">
        <img src="${imageId}" alt="${name}">
        <div class="project-category">${categoryDisplay}</div>
    </div>
    <div class="project-content">
        <h3 class="project-title" onclick="window.location.href='${projectLink}'" style="cursor: pointer;">${name}</h3>
        <p class="project-description">${description}</p>
        <div class="project-meta">
            <div class="project-meta-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${location}</span>
            </div> 
            <div class="project-meta-item">
                <i class="fas fa-calendar-alt"></i>
                <span>${year}</span>
            </div>
            <div class="project-meta-item">
                <i class="fas fa-ruler-combined"></i>
                <span>${size}</span>
            </div>
        </div>
        <a href="${projectLink}" class="project-link">
            View Project Details <i class="fas fa-arrow-right"></i>
        </a>
    </div>
`;


        // Add the card to the container
        projectsContainer.appendChild(projectCard);
    });

    // Initialize the filtering functionality
    initializeFiltering();

    function initializeFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Also run the original filtering code to ensure both work
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});