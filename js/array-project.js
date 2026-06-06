$(document).ready( function() {

    // getBannerHeight() returns a banner height depending on viewport height.
    // 150px base, 200px @ 600 and 250px @ 720

    // function getBannerHeight() {

    //     let currentHeight = window.innerHeight;

    //     if (currentHeight < 600) {
    //         return 150;
    //     } else if (currentHeight < 720) {
    //         return 200;
    //     } else {
    //         return 250;
    //     }
    // }

    // This section loads the first banner image - this involves adding an img element
    // to the banner with appropriate sizing and effects parameters in the Lorum Picsum
    // url. I've given the header containers absolute positioning and adjust the text
    // body top value here as well.

    
    const imageLinks = Array.from([

        {
            "address":    "random@company.com",
            "images": {
                "url1":   "https://picsum.photos/seed/68416414/500/280",
                "url2":   "https://picsum.photos/seed/07235622/500/280"
            }
        }
        ,
        {
            "address":    "info@institution.gov",
            "images": {
                "url1":   "https://picsum.photos/seed/68713524/500/280",
                "url2":   "https://picsum.photos/seed/68435354/500/280"
            }
        }
    ]);


    const firstHeaderTitle = document.getElementById("header-title-top");
    const firstHeaderIntro = document.getElementById("header-intro-top");
    const firstAddressTop = document.getElementById("address-manager-top");
    const firstImageMngrTop = document.getElementById("image-manager-top");
    const firstGalleryTop = document.getElementById("gallery-top");
    const firstCurrentWidth = window.innerWidth;

    let firstCalculatedHeight = Math.ceil(firstCurrentWidth * 0.5625);
    let firstIntroHeight = firstHeaderIntro.clientHeight;
    let firstAddressHeight = firstAddressTop.clientHeight;
    let firstImgMngrHeight = firstImageMngrTop.clientHeight;

    let currentBannerImageSeed = Math.random().toString(36).substring(2, 9);

    $(firstHeaderIntro).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight}px`});

    $(firstAddressTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight}px`});

    $(firstImageMngrTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight}px`});

    $(firstGalleryTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight + firstImgMngrHeight}px`});

    firstHeaderTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${currentBannerImageSeed}/${firstCurrentWidth}/${firstCalculatedHeight}" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

    function changeHeader() {

        const headerTitle = document.getElementById("header-title-top");
        const headerIntro = document.getElementById("header-intro-top");
        const addressTop = document.getElementById("address-manager-top");
        const imageMngrTop = document.getElementById("image-manager-top");
        const galleryTop = document.getElementById("gallery-top");
        const currentWidth = window.innerWidth;
        
        let calculatedHeight = Math.ceil(currentWidth * 0.5625);
        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = imageMngrTop.clientHeight;

        const imageSeed = Math.random().toString(36).substring(2, 9);

        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});

        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});

        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});

        $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        $("#banner-image").fadeOut(200, () => {

            $("#banner-image").remove();

            headerTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${imageSeed}/${currentWidth}/${calculatedHeight}" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

            currentBannerImageSeed = imageSeed;

        });
    }
    
    const changeHeaderImage = setInterval(changeHeader, 5000);

    function updateHeader() {

        // const headerTitle = document.getElementById("header-title-top");
        const headerIntro = document.getElementById("header-intro-top");
        const addressTop = document.getElementById("address-manager-top");
        const imageMngrTop = document.getElementById("image-manager-top");
        const galleryTop = document.getElementById("gallery-top");
        const currentWidth = window.innerWidth;

        let calculatedHeight = Math.ceil(currentWidth * 0.5625);
        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = imageMngrTop.clientHeight;
        // let galleryHeight = galleryTop.clientHeight;


        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});

        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});

        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});

        $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        $("#banner-image").css({"src":`https://picsum.photos/seed/${currentBannerImageSeed}/${currentWidth}/${calculatedHeight} style="position:absolute;top:0;left:0;z-index:0;width:100vw;">`});

    }

    window.addEventListener('resize', updateHeader);

    // This section adds email addresses to a list, stored in an array of objects.
    // The objects have the email address and an object with strings representing the
    // pictures assigned to it. On loading there is a button to add an address,
    // only valid addresses are allowed. In the scrollable list of addresses clicking
    // on one selects it, changing the current address which triggers the gallery to update.


    console.log(imageLinks);

    // Adds each email address as a button in #address-manager-list-wrapper.

    function displayLinks() {

        const addressList = document.getElementById("address-manager-list-wrapper");

        // If an email exists in the array...
        if (imageLinks.length > 0) {

            // Get the number of objects within the array.
            let arrayLength = imageLinks.length;

            // Iterate through the objects and create a button for each.
            for (let i = 0; i < arrayLength; i++) {

                // Gets the address and stores it.
                let addressText = imageLinks[i]["address"];

                // Gets the number of images attached to the address.
                let imageCount = Object.keys(imageLinks[i].images).length;

                // Builds the string for the button text.
                let buttonText = addressText + " (" + `${imageCount})`;

                // Inserts the html at the end of the div. The div is given a unique id containing the email address.
                addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display" id="${addressText}"><button type="button">${buttonText}</button></div>`);

                console.log(addressText);
                console.log(imageCount);
                console.log(buttonText);
            }
        }
    }

    displayLinks();
});


