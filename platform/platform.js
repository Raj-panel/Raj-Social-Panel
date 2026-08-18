document.addEventListener('DOMContentLoaded', () => {

    // 1. Hamburger Menu Trigger
    const menuBtn = document.getElementById('platformMenuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Check if existing navbar/sidebar functions exist in your system
            if (typeof openNav === 'function') {
                openNav();
            } else if (typeof toggleSidebar === 'function') {
                toggleSidebar();
            } else {
                // Default toggle fallback for standard sidebar classes
                const sidebar = document.querySelector('.sidebar, #sidebar, .mobile-menu');
                if (sidebar) {
                    sidebar.classList.toggle('active');
                }
            }
        });
    }

    // 2. High Quality Service - Coming Soon Modal Logic
    const hqCard = document.getElementById('platformHqServiceCard');
    const modal = document.getElementById('platformModal');
    const modalClose = document.getElementById('platformModalClose');

    if (hqCard && modal) {
        hqCard.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close when clicking overlay outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 3. Dynamic Service Path Handling
    const organicCard = document.getElementById('platformOrganicServiceCard');
    if (organicCard) {
        // If your services page path is different, update here
        // organicCard.setAttribute('href', '/dashboard/services');
    }

    // 4. Tutorial Button Dynamic Link
    const tutorialBtn = document.getElementById('platformTutorialBtn');
    if (tutorialBtn) {
        // Replace with your YouTube URL
        tutorialBtn.setAttribute('href', 'https://www.youtube.com/@RajSMMPanel'); 
    }

});
