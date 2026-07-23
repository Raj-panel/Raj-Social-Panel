// প্রতি ১০০০ সার্ভিসের জন্য দাম সেট করা হলো (এখানে দাম পরিবর্তন করতে পারেন)
const serviceData = {
    instagram: [
        { name: "Instagram Followers", pricePer1000: 80 },
        { name: "Instagram Likes (Non Drop)", pricePer1000: 30 },
        { name: "Instagram Reels Views", pricePer1000: 10 },
        { name: "Instagram Custom Report", pricePer1000: 150 }
    ],
    facebook: [
        { name: "Facebook Page Followers", pricePer1000: 100 },
        { name: "Facebook Post Likes", pricePer1000: 40 }
    ]
};

// সার্ভিস অপশন আপডেট করা
function updateServices() {
    const platform = document.getElementById("platform").value;
    const serviceSelect = document.getElementById("service");
    
    serviceSelect.innerHTML = '<option value="">-- সার্ভিস সিলেক্ট করুন --</option>';

    if (platform && serviceData[platform]) {
        serviceData[platform].forEach((item, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.text = `${item.name} - ₹${item.pricePer1000} / 1000`;
            serviceSelect.appendChild(option);
        });
    }
    calculatePrice();
}

// দাম গণনা করা
function calculatePrice() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const quantity = document.getElementById("quantity").value || 0;
    const priceText = document.getElementById("totalPrice");

    if (platform && serviceIndex !== "" && quantity > 0) {
        const pricePer1000 = serviceData[platform][serviceIndex].pricePer1000;
        const totalPrice = (quantity / 1000) * pricePer1000;
        priceText.innerText = totalPrice.toFixed(2);
    } else {
        priceText.innerText = "0";
    }
}

// অর্ডার এবং dynamic QR Code তৈরি
function generateOrder() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const link = document.getElementById("link").value;
    const quantity = document.getElementById("quantity").value;
    const totalPrice = document.getElementById("totalPrice").innerText;

    if (!platform || serviceIndex === "" || !link || quantity <= 0) {
        alert("দয়া করে সমস্ত তথ্য সঠিকভাবে দিন!");
        return;
    }

    const serviceName = serviceData[platform][serviceIndex].name;

    // আপনার UPI ID দিন (এখানে পরিবর্তন করুন)
    const upiId = "YOUR_UPI_ID@upi"; 
    const payeeName = "Raj Social Panel";

    // Dynamic UPI QR Code তৈরি (উইথ অ্যামাউন্ট)
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

    document.getElementById("qrCodeImg").src = qrApi;
    document.getElementById("paymentCard").style.display = "block";

    // হোয়াটসঅ্যাপ লিঙ্ক প্রস্তুত করা
    const waMsg = `হ্যালো! আমি একটি অর্ডার করেছি:%0A%0A` +
                  `*সার্ভিস:* ${serviceName}%0A` +
                  `*লিঙ্ক:* ${link}%0A` +
                  `*পরিমাণ:* ${quantity}%0A` +
                  `*মোট দাম:* ₹${totalPrice}%0A%0A` +
                  `পেমেন্ট করার পর স্ক্রিনশট এখানে পাঠিয়ে দিন।`;

    document.getElementById("waPayBtn").href = `https://wa.me/919337028344?text=${waMsg}`;
    
    // স্ক্রোল করে পেমেন্ট সেকশনে নিয়ে যাওয়া
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}
