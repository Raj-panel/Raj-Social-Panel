function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (!sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    history.pushState({ sidebarOpen: true }, '');
  }
}

function closeSidebar(fromUserAction = false) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
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

function openComingSoonModal() {
  document.getElementById("comingSoonModal").classList.add("active");
}

function closeComingSoonModal() {
  document.getElementById("comingSoonModal").classList.remove("active");
}
// Premium Quality Followers কার্ড খুঁজে বের করে /platform/2/ লিঙ্ক যুক্ত করা
document.addEventListener('DOMContentLoaded', function() {
  // সার্ভিস কার্ডগুলোর মধ্য থেকে "Premium Quality Followers" টেক্সটটি খোঁজা
  const cards = document.querySelectorAll('.service-card, .card, .service-item'); // আপনার কার্ডের ক্লাসের নাম দিন
  
  cards.forEach(card => {
    if (card.innerText.includes('Premium Quality Followers')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        // ব্রাউজারকে সরাসরি নতুন লিংকে পাঠাবে
        window.location.href = '/platform/2/';
      });
    }
  });
});
