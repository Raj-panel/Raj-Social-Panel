// Reused Existing Sidebar Drawer Functions from index.html
function openSidebar() {
    const sidebar = document.getElementById("leftSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && !sidebar.classList.contains("active")) {
        sidebar.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        
        history.pushState({ sidebarOpen: true }, '');
    }
}

function closeSidebar(fromUserAction = false) {
    const sidebar = document.getElementById("leftSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "auto";
        
        if (fromUserAction && history.state && history.state.sidebarOpen) {
            history.back();
        }
    }
}

window.addEventListener("popstate", function (event) {
    const sidebar = document.getElementById("leftSidebar");
    if (sidebar && sidebar.classList.contains("active")) {
        closeSidebar(false);
    }
});

// Platform Modal Logic for High Quality Service
document.addEventListener("DOMContentLoaded", function () {
    const hqCard = document.getElementById("platformHqCard");
    const modal = document.getElementById("platformModal");
    const modalClose = document.getElementById("platformModalClose");

    if (hqCard && modal) {
        hqCard.addEventListener("click", function () {
            modal.classList.add("active");
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener("click", function () {
            modal.classList.remove("active");
        });

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});
