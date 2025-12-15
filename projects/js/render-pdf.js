document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("pdf-viewer-container");
    if (!container) return; // Exit if no container found

    const url = container.getAttribute("data-pdf-url");
    if (!url) {
        console.error("No PDF URL specified in data-pdf-url attribute.");
        return;
    }

    // Configure PDF.js worker
    if (typeof pdfjsLib === 'undefined') {
        console.error("PDF.js library is not loaded.");
        container.innerHTML = '<p class="text-center text-danger">Error: PDF Library not loaded.</p>';
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Show loading indicator
    container.innerHTML = '<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-3x text-muted"></i><p class="mt-3 text-muted">Loading Project Details...</p></div>';

    // Determine Source: URL or Embedded Data
    let loadingTask;

    // Check if we have embedded data (to bypass CORS/File protocol issues)
    if (window.pdfData) {
        console.log("Loading PDF from embedded data...");
        // Convert Base64 to Uint8Array
        const pdfData = atob(window.pdfData);
        const uint8Array = new Uint8Array(pdfData.length);
        for (let i = 0; i < pdfData.length; i++) {
            uint8Array[i] = pdfData.charCodeAt(i);
        }
        loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    } else {
        console.log(`Loading PDF from URL: ${url}`);
        loadingTask = pdfjsLib.getDocument(url);
    }


    loadingTask.promise.then(function (pdf) {
        // Clear loading indicator
        container.innerHTML = '';

        const totalPages = pdf.numPages;
        console.log(`PDF loaded. Total pages: ${totalPages}`);

        // Loop through all pages
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            pdf.getPage(pageNum).then(function (page) {

                // Determine scale based on container width
                // We fetch the viewport at scale 1.5 first to get high quality
                const baseScale = 1.5;
                const viewport = page.getViewport({ scale: baseScale });

                // Create wrapper for the page (to add margin/shadow)
                const pageWrapper = document.createElement("div");
                pageWrapper.className = "pdf-page-wrapper mb-4";
                pageWrapper.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                pageWrapper.style.borderRadius = "8px";
                pageWrapper.style.overflow = "hidden";
                pageWrapper.style.position = "relative";
                pageWrapper.style.background = "#fff";

                // Create canvas
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                // Set canvas dimensions
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Responsive CSS for the canvas
                canvas.style.width = "100%";
                canvas.style.height = "auto";
                canvas.style.display = "block";

                // Disable right-click options
                canvas.addEventListener('contextmenu', event => event.preventDefault());

                // Append canvas to wrapper
                pageWrapper.appendChild(canvas);

                // Append wrapper to container (in order functionality relies on promise resolving order, 
                // but usually fast enough. For strict order, we'd use async/await loop, but this is simpler)
                // To ensure strict order, we'll append a placeholder first then replace it? 
                // Actually, let's just append. PDF.js is usually fast enough for small files. 
                // If order is an issue, we can sort elements later, but simple append is usually fine for these portfolios.
                // BETTER: Create slots first to ensure order.

            });
        }

        // Revised approach for strict ordering:
        // We will execute the page rendering sequentially using async/await pattern inside a self-executing async function
        // to guarantee page 1 is followed by page 2, etc.
        (async function renderPages() {
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                await pdf.getPage(pageNum).then(async function (page) {
                    const scale = 2.0; // Higher scale for better quality on mobile pinch-zoom
                    const viewport = page.getViewport({ scale: scale });

                    const pageWrapper = document.createElement("div");
                    pageWrapper.className = `pdf-page-wrapper page-${pageNum} mb-4`;
                    pageWrapper.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
                    pageWrapper.style.borderRadius = "8px";
                    pageWrapper.style.overflow = "hidden";
                    pageWrapper.style.background = "#fff";

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Make it responsive
                    canvas.style.width = "100%";
                    canvas.style.height = "auto";

                    // Disable interactions
                    canvas.oncontextmenu = function () { return false; };

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    await page.render(renderContext).promise;
                    pageWrapper.appendChild(canvas);
                    container.appendChild(pageWrapper);
                });
            }
        })();

    }, function (reason) {
        // PDF loading error
        console.error(reason);
        container.innerHTML = `<div class="alert alert-danger text-center">
            <h5 class="mb-3">Unable to load project document.</h5>
            <p class="mb-0">Please try refreshing the page.</p>
        </div>`;
    });
});
