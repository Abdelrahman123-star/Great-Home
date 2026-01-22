

// ======================
// UTILITY FUNCTIONS
// ======================

// GLOBAL STATE
let currentIndex = 0;
let visibleGalleryImages = [];

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

    // Apply custom slider styles (Height)
    if (window.innerWidth <= 768 && project.sliderHeight_mob) {
        sliderContainer.style.height = project.sliderHeight_mob;
    } else if (project.sliderHeight) {
        sliderContainer.style.height = project.sliderHeight;
    } else {
        sliderContainer.style.height = ''; // Revert to CSS default (500px)
    }

    // Apply custom slider styles (Width)
    if (project.sliderWidth) {
        sliderContainer.style.width = project.sliderWidth;
        sliderContainer.style.margin = "0 auto 30px"; // Center it
    } else {
        sliderContainer.style.width = ''; // Revert to CSS default
        sliderContainer.style.margin = '';
    }

    // Apply custom image positioning/fitting
    beforeImg.style.objectPosition = project.beforeObjectPosition || 'center center';
    afterImg.style.objectPosition = project.afterObjectPosition || 'center center';

    beforeImg.style.objectFit = project.beforeObjectFit || 'cover';
    afterImg.style.objectFit = project.afterObjectFit || 'cover';

    // Apply Blurred Background if requested
    if (project.blurBackground) {
        // Before Image Wrapper
        if (beforeImg.parentElement) {
            beforeImg.parentElement.classList.add('has-blur-bg');
            beforeImg.parentElement.style.setProperty('--bg-image', `url('${project.beforeImage}')`);
        }
        // After Image Wrapper
        if (afterImg.parentElement) {
            afterImg.parentElement.classList.add('has-blur-bg');
            afterImg.parentElement.style.setProperty('--bg-image', `url('${project.afterImage}')`);
        }
    } else {
        // Clean up just in case (though page reload usually handles this, keeps it robust)
        if (beforeImg.parentElement) beforeImg.parentElement.classList.remove('has-blur-bg');
        if (afterImg.parentElement) afterImg.parentElement.classList.remove('has-blur-bg');
    }

    // Update labels (default to "Before" and "After" if not specified)
    const beforeText = sliderContainer.querySelector('.before-text');
    const afterText = sliderContainer.querySelector('.after-text');

    if (beforeText) beforeText.textContent = project.beforeLabel || "Before";
    if (afterText) afterText.textContent = project.afterLabel || "After";

    // Set Slider Limit (max percentage)
    if (project.sliderLimit) {
        sliderContainer.setAttribute('data-max-limit', project.sliderLimit);
    } else {
        sliderContainer.removeAttribute('data-max-limit');
    }

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
        tab.addEventListener('click', function () {

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

            // Update visible images list
            visibleGalleryImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        });
    });
}



// ======================
// NAVBAR FUNCTIONALITY
// ======================

function initializeNavbar() {
    window.addEventListener('scroll', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    // Get project ID from URL (e.g., project-details.html?3)
    const projectId = getUrlParameter();

    // Load the project data
    loadProjectData(projectId);

    // Initialize components
    initializeNavbar();


    // Error handling for missing images
    document.addEventListener('error', function (e) {
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
window.addEventListener('load', function () {
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

        // Read limit from data attribute (default 100)
        this.maxLimit = parseInt(container.getAttribute('data-max-limit')) || 100;

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

        // If a limit is set, start at the limit (right edge of the valid area)
        // Otherwise start at 50%
        const initialPos = this.maxLimit < 100 ? this.maxLimit : 50;

        this.sliderHandle.style.left = `${initialPos}%`;
        this.sliderLine.style.left = `${initialPos}%`;

        // Set both images' clip-path
        this.beforeImage.style.clipPath = `inset(0 ${100 - initialPos}% 0 0)`;
        this.afterImage.style.clipPath = `inset(0 0 0 ${initialPos}%)`;
    }

    // Function to move the slider based on user interaction
    moveSlider(clientX) {
        const containerRect = this.container.getBoundingClientRect();
        let offsetX = clientX - containerRect.left;

        // Limit the slider movement within the full container width (0% to 100%)
        if (offsetX < 0) offsetX = 0;
        if (offsetX > containerRect.width) offsetX = containerRect.width;

        let percentage = Math.round((offsetX / containerRect.width) * 100);

        // Enforce Max Limit
        if (percentage > this.maxLimit) percentage = this.maxLimit;

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
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the main slider
    const mainSlider = new BeforeAfterSlider(document.getElementById('mainSlider'));

    // Initialize gallery modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-img');
            const caption = this.getAttribute('data-caption');

            modalImage.src = imgSrc;
            modalCaption.textContent = caption;
        });
    });




});
// ======== FULLSCREEN VIEWER LOGIC =========
let isInitialized = false;

// Initialize fullscreen viewer after gallery is generated
function initializeFullscreenViewer() {
    if (isInitialized) return; // Prevent re-initialization
    isInitialized = true;

    // Use all items for initial setup
    const allGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    // Initially, all are visible
    if (visibleGalleryImages.length === 0) {
        visibleGalleryImages = [...allGalleryItems];
    }

    const viewer = document.getElementById('fullscreenViewer');
    const viewerImg = document.getElementById('viewerImage');

    const btnClose = document.querySelector('.close-viewer');
    const btnNext = document.querySelector('.right-arrow');
    const btnPrev = document.querySelector('.left-arrow');

    // Open viewer - add listener to ALL items
    allGalleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Find index in the CURRENTLY VISIBLE list
            const index = visibleGalleryImages.indexOf(item);

            if (index !== -1) {
                currentIndex = index;
                viewer.style.display = "flex";
                viewerImg.src = visibleGalleryImages[currentIndex].getAttribute('data-img');
            }
        });
    });

    // Next image
    btnNext.addEventListener('click', () => {
        if (visibleGalleryImages.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleGalleryImages.length;
        viewerImg.src = visibleGalleryImages[currentIndex].getAttribute('data-img');
    });

    // Previous image
    btnPrev.addEventListener('click', () => {
        if (visibleGalleryImages.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleGalleryImages.length) % visibleGalleryImages.length;
        viewerImg.src = visibleGalleryImages[currentIndex].getAttribute('data-img');
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
