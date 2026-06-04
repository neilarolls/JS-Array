$(document).ready( function() {

    // Load first banner image - this involves adding an image element
    // to the banner with appropriate sizing and effects parameters in
    // the Lorum Picsum url. I've given the header containers absolute
    // positioning and adjust the text body top value here as well.


    const firstHeaderTitle = document.getElementById("header-title-top");
    const firstHeaderIntro = document.getElementById("header-intro-top");
    const firstCurrentWidth = window.innerWidth;
    let firstHeaderHeight = firstHeaderTitle.clientHeight;

    const firstImageSeed = Math.random().toString(36).substring(2, 9);

    $(firstHeaderIntro).css({"position":"absolute","left":"0","top":`${firstHeaderHeight}px`});

    firstHeaderTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${firstImageSeed}/${firstCurrentWidth}/${firstHeaderHeight}" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

    function updateHeader() {

        const headerTitle = document.getElementById("header-title-top");
        const headerIntro = document.getElementById("header-intro-top");
        const currentWidth = window.innerWidth;
        let headerHeight = headerTitle.clientHeight;

        const ImageSeed = Math.random().toString(36).substring(2, 9);

        $(headerIntro).css({"position":"absolute","left":"0","top":`${headerHeight}px`});

        $("#banner-image").fadeOut(200, () => {

            $("#banner-image").remove();

            headerTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${ImageSeed}/${currentWidth}/${headerHeight}" style="position:absolute;top:0;left:0;z-index:0;width:100%;object-position:50% 50%;">`);

        });
    }
    
    const updateHeaderImage = setInterval(updateHeader, 5000);

    

});