// Lightbox - auto-applies to all project/showcase images (Media/Pieces/)
(function () {
    'use strict';

    // Create overlay once
    var overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image expanded view');

    var closeBtn = document.createElement('button');
    closeBtn.id = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&times;';

    var lbImg = document.createElement('img');
    lbImg.id = 'lightbox-img';
    lbImg.src = '';
    lbImg.alt = '';

    overlay.appendChild(closeBtn);
    overlay.appendChild(lbImg);
    document.body.appendChild(overlay);

    // Target all content images (inside <main>)
    var selector = 'main img';

    function openLightbox(img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    function attachToImages() {
        document.querySelectorAll(selector).forEach(function (img) {
            if (img.dataset.lightboxAttached) return;
            img.dataset.lightboxAttached = 'true';
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function () { openLightbox(img); });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachToImages);
    } else {
        attachToImages();
    }

    // Close handlers
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();
