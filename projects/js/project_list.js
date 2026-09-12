// Dynamic Projects Generator
document.addEventListener('DOMContentLoaded', function () {
    const projectHtmlPaths = {
        "Mr. Ahmed Gamal 2D-Plan": "2D_Projects/Ahmed_Gamal.html",
        "Mr. Abdalla Taher, 2D-Plan": "2D_Projects/Abdalla_Taher.html",
        "Eng. Ashraf Farag, 2D-Plan": "2D_Projects/Ashraf_Farag.html"
    };




    // Locations for variety
    const locations = [
        "Palm Hills - New Cairo",
        "La Vista 6 - Ain Sokhna",
        "SODIC - New Cairo",
        "Address East Compound",
        "Madinaty",
        "El-Shorouk City",
        "El-Shorouk City",
        "Nasr City",
        "El Shorouk City",
        "El-Moqattam",
        "Al-Maqsad Compound",
        "Zahraa Nasr City",
        "El-Shorouq City",
        "El-Shorouk City",
        "El-Shorouk City",
        "6th October City",
        "El-Shorouk City",
        "5th Settlement",
        "Nasr City",
        "Elshorouq City",
        "Elshorouq City",
        "Elshorouq City",
        "Mountain View - New Cairo",
        "Stone Residence, Mokattam",
        "Nasr City",
        "6th October City",
        "El-Obour City",
        "5th Settlement",
        "5th Settlement",
        "5th Settlement",
        "5th Settlement",
        "5th Settlement"
    ];



    const years = [
        "2021 - 2023",
        "2021 - 2023",
        "2022 - 2023",
        "2020 - 2022",
        "2023 - 2024",
        "2022 - 2025",
        "2024 - 2025",
        "2022 - 2024",
        "2021 - 2025",
        "2025 - 2026",
        "2025 - 2026",
        "2025 - 2025",
        "2025 - 2025",
        "2024 - 2025",
        "2021 - 2025",
        "2024 - 2025",
        "2024 - 2025",
        "2021 - 2022",
        "2023 - 2024",
        "2025 - 2026",
        "2025 - 2025",
        "2025 - 2025",
        "2025 - Now",
        "2025 - Now",
        "2021 - 2021",
        "2024 - 2024",
        "2022 - 2022",
        "2022 - 2022",
        "2025 - 2025",
        "2023 - 2023",
        "2025 - 2025",
        "2025 - 2025"
    ];


    const sizes = [
        "550 Sq ft",
        "475 Sq ft",
        "540 Sq ft",
        "480 Sq ft",
        "560 Sq ft",
        "435 Sq ft",
        "220 Sq ft",
        "220 Sq ft",
        "210 Sq ft",
        "120 Sq ft",
        "260 Sq ft",
        "120 Sq ft",
        "230 Sq ft",
        "220 Sq ft",
        "210 Sq ft",
        "90 Sq ft",
        "220 Sq ft",
        "170 Sq ft",
        "180 Sq ft",
        "230 Sq ft",
        "190 Sq ft",
        "190 Sq ft",
        "390 Sq ft",
        "180 Sq ft",
        "160 Sq ft",
        "90 Sq ft",
        "1680 Sq ft",
        "70 Sq ft",
        "260 Sq ft",
        "260 Sq ft",
        "260 Sq ft",
        "175 Sq ft"
    ];

    // Array of all project names
    const projectNames = [
        "Mr. Ahmed Hassan",
        "Mr. Mohamed Ali",
        "Eng. Omar Khaled",
        "Mr. Karim Mostafa",
        "Eng. Ashraf Hamed",
        "Mr. Mostafa Elgarhy",
        "Eng. Ali Waheed",
        "Mrs. Aliaa Elhadidi",
        "Eng. Ahmed Hesham",
        "Eng. Mohamed Wasfy",
        "Eng. Mohamed El-Alfy",
        "Eng. Ahmed Mohsen",
        "Eng. Essam Abd-Elaziz",
        "Dr. Ola Gamal",
        "Eng. Hesham Zayed",
        "Mr. Abdalla Taher",
        "Eng. Mohamed Waheed",
        "Mr. Mazen Ali",
        "Dr. Nadia Taleb",
        "Dr. Ola Gamal 3",
        "Mrs. Gehan Omar",
        "Dr. Ola Gamal 2",
        "Mrs. Sara Mohamed",
        "Dr. Nadia Hassan",
        "Mr. Ahmed Gamal 2D-Plan",
        "Mr. Abdalla Taher, 2D-Plan",
        "Eng. Ashraf Farag, 2D-Plan",
        "Mrs. Hala Mohamed",
        "Dr. Reham Gamal",
        "Eng. Samah Elkady",
        "Mr. Amr Elsayed",
        "Mr. Mohamed Elkammah"
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
        "3D_Projects"
    ];

    // Array of Unsplash image IDs for variety
    const imageIds = [
        "Projects/Completed_Projects/Palm Hills/Render/5.webp",
        "Projects/Completed_Projects/La_Viesta/Site/5.webp",
        "Projects/Completed_Projects/East Town (Sodic)/1.webp",
        "Projects/Completed_Projects/Adress/1.webp",
        "Projects/Completed_Projects/Ashraf/1.jpeg",
        "Projects/Completed_Projects/Mostafa/1.jpg",
        "Projects/Completed_Projects/Ola Ali/29.webp",
        "Projects/Completed_Projects/Mrs_Aliaa_Elhadidi/3.webp",
        "Projects/Completed_Projects/Mine/Mine/1.jpg",
        "Projects/Completed_Projects/Eng_Mohamed_Wasfy/1.webp",
        "Projects/Completed_Projects/Eng. Mohamed El-Alfy/27.webp",
        "Projects/Completed_Projects/Eng. Ahmed Mohsen/4.webp",
        "Projects/Completed_Projects/Eng. Essam/1.jpg",
        "Projects/Completed_Projects/Ola/1.jpg",
        "Projects/Completed_Projects/baba/1.jpg",
        "Projects/Completed_Projects/Sara Raga2y/1.jpeg",
        "Projects/Completed_Projects/Ola Mohamed Waheed/1.jpg",
        "Projects/Completed_Projects/Achrafieh/1.jpeg",
        "Projects/Completed_Projects/Dr. Nadia/1.jpg",
        "Projects/Completed_Projects/Dr_Ola_Gamal_3/1.jpg",
        "Projects/Completed_Projects/Gegy/1.jpg",
        "Projects/Completed_Projects/Ola Hala/5.jpg",
        "Projects/On_Going_Projects/Mountain_View/1.jpeg",
        "Projects/On_Going_Projects/Stone_Residence/1.jpeg",
        "../imgs/AhmedGamal.png",
        "../imgs/AbdallaTaher.png",
        "../imgs/AshrafFarag.png",
        "Projects/3D_Projects/Binotte_Bakery/1.jpg",
        "Projects/3D_Projects/Dr_Reham_Gamal/1.jpeg",
        "Projects/3D_Projects/Eng_Samah_Elkady/1.jpeg",
        "Projects/3D_Projects/Mr_Amr_Elsayed/2.webp",
        "Projects/3D_Projects/Mr_Mohamed_Elkammah/1.webp"
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

        // Get image ID for this project
        const imageId = imageIds[index % imageIds.length];

        // Create the project card HTML
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', categoryFinal);

        let projectLink = projectHtmlPaths[name] || `project-details.html?${projectNumber}`;

        projectCard.innerHTML = `
    <div class="project-image" onclick="window.location.href='${projectLink}'" style="cursor: pointer;">
        <img src="${imageId}" alt="${name}" loading="lazy" decoding="async">
        <div class="project-category cat-${categoryFinal.toLowerCase().replace('_', '-')}">${categoryDisplay}</div>
    </div>
    <div class="project-content">
        <h3 class="project-title" onclick="window.location.href='${projectLink}'" style="cursor: pointer;">${name}</h3>
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
            button.addEventListener('click', function () {
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
        button.addEventListener('click', function () {
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
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});
