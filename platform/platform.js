document.addEventListener('DOMContentLoaded', () => {

    // 1. Hamburger Menu Trigger
    const menuBtn = document.getElementById('platformMenuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // আপনার ওয়েবসাইটের বিদ্যমান মেনু খোলার ফাংশন ডাকার চেষ্টা করা হচ্ছে
            if (typeof openNav === 'function') {
                openNav();
            } else if (typeof toggleMenu === 'function') {
                toggleMenu();
            } else {
                alert('আপনার মেইন ওয়েবসাইটের Hamburger Menu-এর JavaScript ফাংশনের নাম শেয়ার করলে সেটি এখানে সঠিকভাবে যুক্ত করে দেব।');
            }
        });
    }

    // 2. High Quality Service Modal
    const hqCard = document.getElementById('platformHqServiceCard');
    const modal = document.getElementById('platformModal');
    const modalClose = document.getElementById('platformModalClose');

    if (hqCard && modal) {
        hqCard.addEventListener('click', () => modal.classList.add('active'));
    }

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

});
