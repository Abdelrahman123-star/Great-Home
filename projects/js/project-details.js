

    // ======================
    // UTILITY FUNCTIONS
    // ======================
    
    // Function to get URL parameter
    function getUrlParameter() {
        // Get the full URL
        const url = window.location.href;
        
        // Extract the part after ? (e.g., "1" from "project-details.html?1")
        const queryString = url.split('?')[1];
        
        if (!queryString) return '1'; // Default to project 1 if no query
        
        // If there are multiple parameters (e.g., ?id=1&name=test), we only want the first part
        const projectId = queryString.split('&')[0];
        
        // If it's just a number (e.g., "1"), return it
        if (/^\d+$/.test(projectId)) {
            return projectId;
        }
        
        // If it's a parameter like "id=1", extract the value
        if (projectId.includes('=')) {
            const paramParts = projectId.split('=');
            return paramParts[1] || '1';
        }
        
        return '1'; // Default to project 1
    }
    
    // Function to update page content with project data
function loadProjectData(projectId) {

    const project = projectsData[projectId];

    if (!project) {
        console.error("Project not found:", projectId);
        return;
    }

    /* ---------------------------
       UPDATE MAIN PROJECT CONTENT
    --------------------------- */
    document.title = `${project.name} - Civil Engineering Portfolio`;

    document.getElementById('dynamic-project-title').textContent = project.name;
    document.getElementById('dynamic-project-description').textContent = project.description;
    document.getElementById('dynamic-location').textContent = project.location;
    document.getElementById('dynamic-dates').textContent = project.dates;
    document.getElementById('dynamic-size').textContent = project.size;
    document.getElementById('dynamic-category').textContent = project.category;

    /* ---------------------------
        BEFORE / AFTER SLIDER
    --------------------------- */
    const sliderSection = document.getElementById("before-after-section");
    const sliderContainer = document.getElementById("mainSlider");
    const beforeImg = document.getElementById("before-image");
    const afterImg = document.getElementById("after-image");

    // Safety check (prevents total failure)
    if (!sliderSection || !sliderContainer || !beforeImg || !afterImg) {
        console.warn("Slider HTML missing — skipping slider.");
        generateGallery(project.galleryImages);
        return;
    }

    // If missing images → hide slider
    if (!project.beforeImage || !project.afterImage) {
        sliderSection.style.display = "none";
        generateGallery(project.galleryImages);
        return;
    }

    // Load images
    sliderSection.style.display = "block";
    beforeImg.src = project.beforeImage;
    afterImg.src = project.afterImage;

    // Initialize slider after images load
    setTimeout(() => {
        try {
            new BeforeAfterSlider(sliderContainer);
        } catch (err) {
            console.error("Slider failed:", err);
        }
    }, 300);

    /* ---------------------------
       GENERATE GALLERY
    --------------------------- */
    generateGallery(project.galleryImages);
}

    
    // Function to generate gallery items
    function generateGallery(images) {
    const galleryContainer = document.getElementById('dynamic-gallery');
    const tabsContainer = document.getElementById('gallery-tabs');

    if (!galleryContainer || !images) return;

    galleryContainer.innerHTML = '';
    tabsContainer.innerHTML = '';

    // Get unique categories (excluding empty ones)
    const categories = [...new Set(
        images
            .map(img => img.category?.trim())
            .filter(cat => cat && cat !== "")
    )];

    // If NO categories or only one → hide tabs
    if (categories.length <= 1) {
        tabsContainer.style.display = "none";
    } else {
        tabsContainer.style.display = "flex";

        // Add "All" tab
        tabsContainer.innerHTML += `<button class="gallery-tab active" data-filter="all">All Photos</button>`;

        // Add dynamic category tabs
        categories.forEach(category => {
            tabsContainer.innerHTML += `
                <button class="gallery-tab" data-filter="${category}">${category}</button>
            `;
        });
    }

    // Insert gallery images
    images.forEach((image, index) => {
        const category = image.category?.trim() || ""; // empty if no category

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-img', image.src);
        galleryItem.setAttribute('data-category', category);

        galleryItem.innerHTML = `
            <img src="${image.src}" loading="lazy">
        `;

        galleryContainer.appendChild(galleryItem);
    });

    initializeGallery();  // Re-init filtering
    initializeFullscreenViewer(); // Re-init fullscreen
}

    
    // ======================
    // GALLERY FUNCTIONALITY CATEGORYYY
    // ======================
    
    function initializeGallery() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {

            // Remove active highlight from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');

                if (filter === 'all' || itemCat === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

 
    
    // ======================
    // NAVBAR FUNCTIONALITY
    // ======================
    
    function initializeNavbar() {
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar && window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else if (navbar) {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ======================
    // INITIALIZE PAGE
    // ======================
    
    document.addEventListener('DOMContentLoaded', function() {
        // Get project ID from URL (e.g., project-details.html?3)
        const projectId = getUrlParameter();
        
        // Load the project data
        loadProjectData(projectId);
        
        // Initialize components
        initializeNavbar();
        
        
        // Error handling for missing images
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                console.error('Image failed to load:', e.target.src);
                // Show a placeholder instead of hiding
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.padding = '20px';
                e.target.innerHTML = '<i class="fas fa-image fa-3x" style="color:#ccc;"></i>';
            }
        }, true);
    });
    
    // Fallback for direct access (no project ID in URL)
    window.addEventListener('load', function() {
        const projectId = getUrlParameter();
        if (!projectId || projectId === '1') {
            // Already handled by default in getUrlParameter()
        }
    });




// Before/After Slider
        class BeforeAfterSlider {
            constructor(container) {
                this.container = container;
                this.sliderHandle = container.querySelector('.slider-handle');
                this.sliderLine = container.querySelector('.slider-line');
                this.beforeImage = container.querySelector('.before-image');
                this.afterImage = container.querySelector('.after-image');
                
                this.isDragging = false;
                
                // Initialize the slider
                this.initializeSlider();
                this.setupEventListeners();
            }
            
            // Function to initialize the slider at the center position
            initializeSlider() {
                // Set slider handle and line at center with a transition for initialization
                this.sliderHandle.style.transition = "left 0.3s ease";
                this.sliderLine.style.transition = "left 0.3s ease";

                this.sliderHandle.style.left = "50%";
                this.sliderLine.style.left = "50%";

                // Set both images' clip-path to 50% (center)
                this.beforeImage.style.clipPath = "inset(0 50% 0 0)";
                this.afterImage.style.clipPath = "inset(0 0 0 50%)";
            }

            // Function to move the slider based on user interaction
            moveSlider(clientX) {
                const containerRect = this.container.getBoundingClientRect();
                let offsetX = clientX - containerRect.left;

                // Limit the slider movement within the full container width (0% to 100%)
                if (offsetX < 0) offsetX = 0;
                if (offsetX > containerRect.width) offsetX = containerRect.width;

                const percentage = Math.round((offsetX / containerRect.width) * 100);

                // Update the slider handle position and image clipping
                this.sliderHandle.style.left = `${percentage}%`;
                this.sliderLine.style.left = `${percentage}%`;

                // Adjust the clip-path for both images
                this.beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                this.afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
            }

            // Event handlers
            startDragging = (event) => {
                // Prevent default behavior to avoid text selection
                event.preventDefault();
                
                this.isDragging = true;

                // Remove transitions while dragging for instant feedback
                this.sliderHandle.style.transition = "none";
                this.sliderLine.style.transition = "none";
                
                // Move slider to the click position immediately
                const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
                this.moveSlider(clientX);
            };

            stopDragging = () => {
                this.isDragging = false;

                // Reapply transitions after dragging ends
                this.sliderHandle.style.transition = "left 0.3s ease";
                this.sliderLine.style.transition = "left 0.3s ease";
            };

            handleMouseMove = (event) => {
                if (this.isDragging) {
                    this.moveSlider(event.clientX);
                }
            };

            handleTouchMove = (event) => {
                if (this.isDragging) {
                    this.moveSlider(event.touches[0].clientX);
                }
            };

            // Setup all event listeners for this slider
            setupEventListeners() {
                // Make the entire container draggable
                this.container.addEventListener("mousedown", this.startDragging);
                this.container.addEventListener("touchstart", this.startDragging);

                // Use document instead of window to handle edge cases better
                document.addEventListener("mousemove", this.handleMouseMove);
                document.addEventListener("mouseup", this.stopDragging);
                document.addEventListener("touchmove", this.handleTouchMove);
                document.addEventListener("touchend", this.stopDragging);
            }
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize the main slider
            const mainSlider = new BeforeAfterSlider(document.getElementById('mainSlider'));
            
            // Initialize gallery modal
            const galleryItems = document.querySelectorAll('.gallery-item');
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const imgSrc = this.getAttribute('data-img');
                    const caption = this.getAttribute('data-caption');
                    
                    modalImage.src = imgSrc;
                    modalCaption.textContent = caption;
                });
            });

            
            

        });
        // ======== FULLSCREEN VIEWER LOGIC =========
let currentIndex = 0;
let galleryImages = [];

// Initialize fullscreen viewer after gallery is generated
function initializeFullscreenViewer() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item'));

    const viewer = document.getElementById('fullscreenViewer');
    const viewerImg = document.getElementById('viewerImage');

    const btnClose = document.querySelector('.close-viewer');
    const btnNext = document.querySelector('.right-arrow');
    const btnPrev = document.querySelector('.left-arrow');

    // Open viewer
    galleryImages.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            viewer.style.display = "flex";
            viewerImg.src = item.getAttribute('data-img');
        });
    });

    // Next image
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        viewerImg.src = galleryImages[currentIndex].getAttribute('data-img');
    });

    // Previous image
    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        viewerImg.src = galleryImages[currentIndex].getAttribute('data-img');
    });

    // Close viewer
    btnClose.addEventListener('click', () => {
        viewer.style.display = "none";
    });

    // Close on background click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            viewer.style.display = "none";
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (viewer.style.display === "flex") {
            if (e.key === "ArrowRight") btnNext.click();
            if (e.key === "ArrowLeft") btnPrev.click();
            if (e.key === "Escape") viewer.style.display = "none";
        }
    });
}

// Re-run viewer initialization after gallery loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initializeFullscreenViewer();
    }, 500);
});
