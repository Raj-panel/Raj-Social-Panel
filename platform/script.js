document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Organic / Existing Service Navigation Logic
    const organicButtons = document.querySelectorAll('.btn-organic');
    
    organicButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetUrl = button.getAttribute('data-target');
            if (targetUrl) {
                // Navigate safely to existing home/service section
                window.location.href = targetUrl;
            }
        });
    });

    // 2. High Quality Service Placeholder Logic (UI Only)
    const hqButtons = document.querySelectorAll('.btn-high-quality');
    const modal = document.getElementById('hqNoticeModal');
    const closeX = document.querySelector('.hq-modal-close');
    const closeBtn = document.getElementById('hqCloseBtn');

    const openModal = () => {
        if (modal) modal.classList.remove('hidden');
    };

    const closeModal = () => {
        if (modal) modal.classList.add('hidden');
    };

    hqButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Show alert notice without executing any checkout/price logic
            openModal();
        });
    });

    if (closeX) closeX.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close modal on outside backdrop click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3. Dynamic Dark Mode Compatibility Check with Main Site
    // Detects if main website sets dark mode via class or attribute
    const checkDarkModeSync = () => {
        const isDarkMode = document.body.classList.contains('dark-mode') || 
                           document.documentElement.getAttribute('data-theme') === 'dark' ||
                           window.matchMedia('(prefers-color-scheme: dark)').matches;
                           
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    };

    checkDarkModeSync();
});
