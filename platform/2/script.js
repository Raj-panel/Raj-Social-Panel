/* ==================================================
   RAJ SMM PANEL - PLATFORM 2
   ================================================== */


/* ==================================================
   CONFIGURATION
   ================================================== */

const CONFIG = {

    /*
       এখানে তোমার আসল WhatsApp Business নম্বর দেবে।

       Example:
       919876543210
    */

    whatsappNumber: "",


    /*
       এখানে তোমার আসল UPI ID দেবে।

       Example:
       rajpanel@upi
    */

    upiId: "YOURUPIID@upi",


    /*
       Payment receiver name
    */

    payeeName: "RAJ SMM PANEL",


    /*
       Currency
    */

    currency: "₹",


    /*
       IMPORTANT:

       তোমার existing Raj SMM Panel-এর
       REAL order/payment API endpoint জানা নেই।

       তাই এখানে কোনো fake endpoint দেওয়া হয়নি।

       Existing backend endpoint জানা থাকলে এখানে বসাবে।

       Example:

       orderApi: "https://rajsmmpanel.in/...."
    */

    orderApi: ""

};


/* ==================================================
   SERVICE DATA
   ================================================== */

const catalog = {


    /* ================= INSTAGRAM ================= */

    instagram: {

        title: "Instagram Boost",

        subtitle:
            "⚡ Real Engagement • Fast & Safe Delivery",

        icon: "◎",

        label:
            "Link Instagram profile",


        categories: {


            "Instagram Followers": [

                {

                    name:
                        "Instagram - Followers 30% Extra Less Drop",

                    unit:
                        "Followers",

                    rate:
                        100,

                    min:
                        100,

                    time:
                        "10 Minutes"

                },


                {

                    name:
                        "Instagram - Real Profile Followers",

                    unit:
                        "Followers",

                    rate:
                        125,

                    min:
                        100,

                    time:
                        "15 Minutes"

                }

            ],


            "Instagram Likes": [

                {

                    name:
                        "Instagram - Post Likes",

                    unit:
                        "Likes",

                    rate:
                        45,

                    min:
                        100,

                    time:
                        "10 Minutes"

                },


                {

                    name:
                        "Instagram - Reel Likes",

                    unit:
                        "Likes",

                    rate:
                        50,

                    min:
                        100,

                    time:
                        "10 Minutes"

                }

            ],


            "Instagram Views": [

                {

                    name:
                        "Instagram - Reel Views",

                    unit:
                        "Views",

                    rate:
                        12,

                    min:
                        100,

                    time:
                        "5 Minutes"

                }

            ]

        }

    },


    /* ================= FACEBOOK ================= */

    facebook: {

        title:
            "Facebook Boost",

        subtitle:
            "⚡ Fast Delivery • Quality Social Growth",

        icon:
            "f",

        label:
            "Link Facebook profile",


        categories: {


            "Facebook Followers": [

                {

                    name:
                        "Facebook - Page Followers",

                    unit:
                        "Followers",

                    rate:
                        80,

                    min:
                        100,

                    time:
                        "15 Minutes"

                }

            ],


            "Facebook Likes": [

                {

                    name:
                        "Facebook - Page Likes",

                    unit:
                        "Likes",

                    rate:
                        60,

                    min:
                        100,

                    time:
                        "10 Minutes"

                }

            ]

        }

    },


    /* ================= YOUTUBE ================= */

    youtube: {

        title:
            "YouTube Boost",

        subtitle:
            "⚡ Fast Delivery • Premium YouTube Services",

        icon:
            "▶",

        label:
            "Link YouTube video/channel",


        categories: {


            "YouTube Subscribers": [

                {

                    name:
                        "YouTube - Subscribers",

                    unit:
                        "Subscribers",

                    rate:
                        249,

                    min:
                        100,

                    time:
                        "30 Minutes"

                }

            ],


            "YouTube Views": [

                {

                    name:
                        "YouTube - Video Views",

                    unit:
                        "Views",

                    rate:
                        49,

                    min:
                        100,

                    time:
                        "15 Minutes"

                }

            ],


            "YouTube Likes": [

                {

                    name:
                        "YouTube - Real Likes",

                    unit:
                        "Likes",

                    rate:
                        49,

                    min:
                        100,

                    time:
                        "15 Minutes"

                }

            ]

        }

    },


    /* ================= TIKTOK ================= */

    tiktok: {

        title:
            "TikTok Boost",

        subtitle:
            "⚡ Fast Delivery • Premium TikTok Services",

        icon:
            "♪",

        label:
            "Link TikTok video/profile",


        categories: {


            "TikTok Followers": [

                {

                    name:
                        "TikTok - Followers",

                    unit:
                        "Followers",

                    rate:
                        90,

                    min:
                        100,

                    time:
                        "20 Minutes"

                }

            ],


            "TikTok Likes": [

                {

                    name:
                        "TikTok - Likes",

                    unit:
                        "Likes",

                    rate:
                        35,

                    min:
                        100,

                    time:
                        "15 Minutes"

                }

            ],


            "TikTok Views": [

                {

                    name:
                        "TikTok - Views",

                    unit:
                        "Views",

                    rate:
                        9,

                    min:
                        100,

                    time:
                        "10 Minutes"

                }

            ]

        }

    }

};


/* ==================================================
   GLOBAL VARIABLES
   ================================================== */

let currentPlatform =
    "instagram";


let currentService =
    null;


let checkoutMultiplier =
    1;


/* ==================================================
   SHORT SELECTOR
   ================================================== */

const $ = (id) => {

    return document.getElementById(id);

};


/* ==================================================
   MONEY FORMAT
   ================================================== */

function money(value) {

    return (
        CONFIG.currency +
        Number(value).toFixed(2)
    );

}


/* ==================================================
   GET CATEGORIES
   ================================================== */

function getCategories() {

    return Object.keys(
        catalog[currentPlatform].categories
    );

}


/* ==================================================
   GET CURRENT SERVICES
   ================================================== */

function getCurrentServices() {

    return (
        catalog[currentPlatform]
            .categories[$("category").value]
        || []
    );

}


/* ==================================================
   RENDER CATEGORY
   ================================================== */

function renderCategories() {

    const category =
        $("category");


    category.innerHTML = "";


    getCategories().forEach(
        (name) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                name;


            option.textContent =
                name;


            category.appendChild(
                option
            );

        }
    );


    renderServices();

}


/* ==================================================
   RENDER SERVICES
   ================================================== */

function renderServices() {

    const service =
        $("service");


    service.innerHTML = "";


    getCurrentServices().forEach(
        (item, index) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                String(index);


            option.textContent =
                item.name;


            service.appendChild(
                option
            );

        }
    );


    updateService();

}


/* ==================================================
   UPDATE SERVICE
   ================================================== */

function updateService() {

    const list =
        getCurrentServices();


    currentService =
        list[
            Number(
                $("service").value
            )
        ]
        || list[0];


    if (!currentService) {

        return;

    }


    $("averageTime")
        .textContent =
        currentService.time;


    $("quantity").min =
        currentService.min;


    if (
        Number(
            $("quantity").value
        )
        <
        currentService.min
    ) {

        $("quantity").value =
            currentService.min;

    }


    updateTotal();

}


/* ==================================================
   UPDATE TOTAL
   ================================================== */

function updateTotal() {

    if (!currentService) {

        return;

    }


    const qty =
        Math.max(
            currentService.min,

            Number(
                $("quantity").value
            )
            ||
            currentService.min
        );


    const total =
        (
            qty / 100
        )
        *
        currentService.rate;


    $("totalPrice")
        .textContent =
        money(total);

}


/* ==================================================
   PLATFORM UI
   ================================================== */

function updatePlatformUI() {

    const data =
        catalog[currentPlatform];


    $("heroTitle")
        .textContent =
        data.title;


    $("heroSubtitle")
        .textContent =
        data.subtitle;


    $("heroIcon")
        .textContent =
        data.icon;


    $("checkoutIcon")
        .textContent =
        data.icon;


    $("profileLabel")
        .textContent =
        data.label;


    renderCategories();


    document
        .querySelectorAll(".platform")
        .forEach(
            (btn) => {

                btn.classList.toggle(
                    "active",

                    btn.dataset.platform
                    ===
                    currentPlatform
                );

            }
        );

}


/* ==================================================
   OPEN CHECKOUT
   ================================================== */

function openCheckout() {

    if (!currentService) {

        return;

    }


    const link =
        $("profileLink")
            .value
            .trim();


    if (!link) {

        $("profileLink").focus();


        $("profileLink")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        return;

    }


    checkoutMultiplier =
        1;


    $("miniQty")
        .textContent =
        "1";


    $("checkoutServiceName")
        .textContent =
        currentService.name;


    $("checkoutQty")
        .textContent =
        Number(
            $("quantity").value
        );


    $("packageQty")
        .textContent =
        Number(
            $("quantity").value
        );


    $("checkoutPrice")
        .textContent =
        $("totalPrice")
            .textContent;


    $("checkoutLink")
        .value =
        link;


    createQRCode();


    $("checkoutScreen")
        .classList
        .add("open");


    $("checkoutScreen")
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   CLOSE CHECKOUT
   ================================================== */

function closeCheckout() {

    $("checkoutScreen")
        .classList
        .remove("open");


    $("checkoutScreen")
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body.style.overflow =
        "";

}


/* ==================================================
   CHECKOUT QUANTITY
   ================================================== */

function changeCheckoutQuantity(
    direction
) {

    checkoutMultiplier =
        Math.max(
            1,

            checkoutMultiplier
            +
            direction
        );


    $("miniQty")
        .textContent =
        checkoutMultiplier;


    const baseQty =
        Number(
            $("quantity").value
        );


    const newQty =
        baseQty *
        checkoutMultiplier;


    const newPrice =
        (
            newQty / 100
        )
        *
        currentService.rate;


    $("checkoutQty")
        .textContent =
        newQty;


    $("packageQty")
        .textContent =
        newQty;


    $("checkoutPrice")
        .textContent =
        money(newPrice);


    createQRCode(
        newPrice
    );

}


/* ==================================================
   CREATE UPI URL
   ================================================== */

function makeUpiUrl(amount) {

    const params =
        new URLSearchParams({

            pa:
                CONFIG.upiId,

            pn:
                CONFIG.payeeName,

            am:
                Number(amount)
                    .toFixed(2),

            cu:
                "INR",

            tn:
                currentService
                    ?
                    currentService.name
                    :
                    "Raj SMM Panel Order"

        });


    return (
        "upi://pay?"
        +
        params.toString()
    );

}


/* ==================================================
   CREATE QR
   ================================================== */

function createQRCode(
    amountOverride
) {

    const amount =
        amountOverride
        ||
        (
            Number(
                $("quantity").value
            )
            /
            100
        )
        *
        currentService.rate;


    if (
        CONFIG.upiId
        ===
        "YOURUPIID@upi"
    ) {

        $("qrCode")
            .innerHTML =

            '<div style="' +
            'text-align:center;' +
            'font-size:14px;' +
            'color:#777;' +
            'padding:20px">' +

            'Add your real UPI ID in ' +
            'script.js to generate ' +
            'the payment QR.' +

            '</div>';

        return;

    }


    const upiUrl =
        makeUpiUrl(
            amount
        );


    const img =
        document.createElement(
            "img"
        );


    img.alt =
        "UPI QR Code";


    img.loading =
        "eager";


    img.src =

        "https://api.qrserver.com/" +
        "v1/create-qr-code/" +
        "?size=420x420" +
        "&margin=8" +
        "&data=" +
        encodeURIComponent(
            upiUrl
        );


    $("qrCode")
        .innerHTML = "";


    $("qrCode")
        .appendChild(
            img
        );

}


/* ==================================================
   OPEN UPI APP
   ================================================== */

function openUpi(app) {

    const amount =

        (
            Number(
                $("checkoutQty")
                    .textContent
            )
            /
            100
        )
        *
        currentService.rate;


    const upi =
        makeUpiUrl(
            amount
        );


    if (
        CONFIG.upiId
        ===
        "YOURUPIID@upi"
    ) {

        alert(
            "First replace YOURUPIID@upi " +
            "in script.js with your real UPI ID."
        );


        return;

    }


    /*
       Generic UPI deep link.

       Android device সাধারণত
       available UPI application
       নির্বাচন করতে দেবে।
    */

    window.location.href =
        upi;

}


/* ==================================================
   SUBMIT ORDER
   ================================================== */

async function submitOrder() {

    const utr =
        $("utr")
            .value
            .trim();


    const link =
        $("checkoutLink")
            .value
            .trim();


    const qty =
        Number(
            $("checkoutQty")
                .textContent
        );


    const amount =
        (
            qty / 100
        )
        *
        currentService.rate;


    if (!link) {

        $("checkoutMessage")
            .textContent =
            "Please enter your profile/video link.";


        $("checkoutLink")
            .focus();


        return;

    }


    if (
        !/^\d{12}$/.test(
            utr
        )
    ) {

        $("checkoutMessage")
            .textContent =
            "Please enter a valid 12-digit UTR / Reference number.";


        $("utr")
            .focus();


        return;

    }


    const order = {

        platform:
            currentPlatform,

        service:
            currentService.name,

        quantity:
            qty,

        amount:
            Number(
                amount.toFixed(2)
            ),

        link:
            link,

        utr:
            utr

    };


    /*
       IMPORTANT:

       Existing Raj SMM Panel-এর
       real backend endpoint না জানা পর্যন্ত
       কোনো fake endpoint ব্যবহার করা হবে না।

       ফলে এখানে fake "payment successful"
       দেখানো হবে না।
    */

    if (
        !CONFIG.orderApi
    ) {

        $("checkoutMessage")
            .textContent =

            "Payment details are ready. " +
            "Connect this button to your " +
            "existing Raj SMM Panel order endpoint " +
            "to create the real order.";


        console.log(
            "Order payload:",
            order
        );


        return;

    }


    try {

        $("confirmBtn")
            .disabled =
            true;


        $("confirmBtn")
            .textContent =
            "Processing...";


        const response =
            await fetch(
                CONFIG.orderApi,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    credentials:
                        "include",

                    body:
                        JSON.stringify(
                            order
                        )

                }
            );


        const data =
            await response
                .json()
                .catch(
                    () => ({})
                );


        if (!response.ok) {

            throw new Error(
                data.message
                ||
                "Order request failed."
            );

        }


        $("checkoutMessage")
            .textContent =

            data.message
            ||
            "Order submitted successfully.";

    }


    catch (error) {

        $("checkoutMessage")
            .textContent =

            error.message
            ||
            "Unable to submit the order.";

    }


    finally {

        $("confirmBtn")
            .disabled =
            false;


        $("confirmBtn")
            .textContent =
            "◔ Confirm your order";

    }

}


/* ==================================================
   CATEGORY CHANGE
   ================================================== */

$("category")
    .addEventListener(
        "change",
        renderServices
    );


/* ==================================================
   SERVICE CHANGE
   ================================================== */

$("service")
    .addEventListener(
        "change",
        updateService
    );


/* ==================================================
   QUANTITY CHANGE
   ================================================== */

$("quantity")
    .addEventListener(
        "input",
        updateTotal
    );


/* ==================================================
   PLATFORM BUTTONS
   ================================================== */

document
    .querySelectorAll(
        ".platform"
    )
    .forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    currentPlatform =
                        btn.dataset.platform;


                    updatePlatformUI();

                }
            );

        }
    );


/* ==================================================
   BUY BUTTON
   ================================================== */

$("buyBtn")
    .addEventListener(
        "click",
        openCheckout
    );


/* ==================================================
   BACK BUTTON
   ================================================== */

$("backBtn")
    .addEventListener(
        "click",
        closeCheckout
    );


/* ==================================================
   CHECKOUT MINUS
   ================================================== */

$("minusQty")
    .addEventListener(
        "click",
        () => {

            changeCheckoutQuantity(
                -1
            );

        }
    );


/* ==================================================
   CHECKOUT PLUS
   ================================================== */

$("plusQty")
    .addEventListener(
        "click",
        () => {

            changeCheckoutQuantity(
                1
            );

        }
    );


/* ==================================================
   CONFIRM ORDER
   ================================================== */

$("confirmBtn")
    .addEventListener(
        "click",
        submitOrder
    );


/* ==================================================
   PAYMENT TABS
   ================================================== */

document
    .querySelectorAll(
        ".payment-tab"
    )
    .forEach(
        (tab) => {

            tab.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".payment-tab"
                        )
                        .forEach(
                            (t) => {

                                t.classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    tab.classList
                        .add("active");


                    const isUpi =
                        tab.dataset.pay
                        ===
                        "upi";


                    $("upiPanel")
                        .classList
                        .toggle(
                            "hidden",
                            !isUpi
                        );


                    $("binancePanel")
                        .classList
                        .toggle(
                            "hidden",
                            isUpi
                        );

                }
            );

        }
    );


/* ==================================================
   UPI APP BUTTONS
   ================================================== */

document
    .querySelectorAll(
        ".upi-apps button"
    )
    .forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    openUpi(
                        btn.dataset.upi
                    );

                }
            );

        }
    );


/* ==================================================
   BINANCE
   ================================================== */

$("binancePayBtn")
    .addEventListener(
        "click",
        () => {

            alert(
                "Add your real Binance Pay " +
                "payment link/API here."
            );

        }
    );


/* ==================================================
   MENU OPEN
   ================================================== */

$("menuBtn")
    .addEventListener(
        "click",
        () => {

            $("drawer")
                .classList
                .add("open");


            $("drawerOverlay")
                .classList
                .add("open");

        }
    );


/* ==================================================
   CLOSE MENU
   ================================================== */

$("closeDrawer")
    .addEventListener(
        "click",
        closeDrawer
    );


$("drawerOverlay")
    .addEventListener(
        "click",
        closeDrawer
    );


function closeDrawer() {

    $("drawer")
        .classList
        .remove("open");


    $("drawerOverlay")
        .classList
        .remove("open");

}


/* ==================================================
   DRAWER LINKS
   ================================================== */

document
    .querySelectorAll(
        ".drawer-link"
    )
    .forEach(
        (a) => {

            a.addEventListener(
                "click",
                closeDrawer
            );

        }
    );


/* ==================================================
   WHATSAPP
   ================================================== */

$("whatsappLink")
    .addEventListener(
        "click",
        (e) => {

            e.preventDefault();


            if (
                !CONFIG.whatsappNumber
            ) {

                alert(
                    "Add your WhatsApp Business " +
                    "number in CONFIG.whatsappNumber " +
                    "inside script.js."
                );


                return;

            }


            window.open(

                "https://wa.me/"
                +
                CONFIG.whatsappNumber,

                "_blank",

                "noopener"

            );

        }
    );


/* ==================================================
   INITIAL LOAD
   ================================================== */

updatePlatformUI();
