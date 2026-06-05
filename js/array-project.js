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
        console.log(currentWidth);
        console.log(calculatedHeight);
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

});

// This section adds email addresses to a list, stored in an array of objects.
// The objects have the email address and an array of strings representing the
// pictures assigned to it. On loading there is a button to add an address,
// only valid addresses are allowed. In the scrollable list of addresses clicking
// on one selects it, changing the current address which triggers the gallery to update.


const imageLinks = Array.from([

  {

    address: "random@company.com",
    images: [
      {
        url1: "https://picsum.photos/seed/68416414/500/280",
        url2: "https://picsum.photos/seed/07235622/500/280"
      }
    ]
  }

]);

console.log(imageLinks);

