$(document).ready( function() {

    // Initialise array
    const imageLinks = Array.from([

        {
            "address":    "random@company.com",
            "images": {
                "image-1": {

                    "url":          "https://picsum.photos/seed/68416414/500/280",
                    "blur-effect":  "?blur=3"
                }
                ,
                "image-2": {

                    "url":          "https://picsum.photos/seed/07235622/500/280",
                    "greyscale-effect":  "?grayscale"
                }
            }
        }
        ,
        {
            "address":    "info@institution.gov",
            "images": {
                "image-1": {

                    "url":          "https://picsum.photos/seed/68713524/500/280",
                    "blur-effect":  "?blur=1"
                }
                ,
                "image-2": {

                    "url":          "https://picsum.photos/seed/68435354/500/280"
                }
            }

        }
    ]);

    console.log(imageLinks);

// -------------------------------------------------------------------------------------
// This section loads and swaps the banner image - this involves adding/removing an img
// element with appropriate sizing and effects parameters in the Lorum Picsum url.
// I've given all the containers absolute positioning and adjust all sections' top
// values here too.
// -------------------------------------------------------------------------------------


    const firstTitleText = document.getElementById("header-title-wrapper");
    const firstHeaderTitle = document.getElementById("header-title-top");
    const firstHeaderIntro = document.getElementById("header-intro-top");
    const firstAddressTop = document.getElementById("address-manager-top");
    const firstImageMngrTop = document.getElementById("image-manager-top");
    const firstGalleryTop = document.getElementById("gallery-top");
    const firstCurrentWidth = window.innerWidth;
    // const maxBannerHeight = 300;
    let firstCalculatedHeight = Math.ceil(firstCurrentWidth * 0.5625);

    // if (firstCalculatedHeight > maxBannerHeight) {
    //     firstCalculatedHeight = maxBannerHeight;
    // }

    const firstIntroHeight = firstHeaderIntro.clientHeight;
    const firstAddressHeight = firstAddressTop.clientHeight;
    const firstImgMngrHeight = firstImageMngrTop.clientHeight;
    const firstNewFontSize = (firstCurrentWidth / 768) + 2;
    let currentBannerImageSeed = Math.random().toString(36).substring(2, 9);
    let selectedAddress = "";


    $(firstTitleText).css({"font-size":`${firstNewFontSize}rem`});

    $(firstHeaderIntro).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight}px`});

    $(firstAddressTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight}px`});

    $(firstImageMngrTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight}px`});

    $(firstGalleryTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight + firstImgMngrHeight}px`});

    firstHeaderTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${currentBannerImageSeed}/${firstCurrentWidth}/${firstCalculatedHeight}.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);


// Positions the sections, calculates a new image seed, then fades the current image
// before loading the new image. Finally the new image seed replaces the old one.

    function changeHeader() {

        const titleText = document.getElementById("header-title-wrapper");
        const headerTitle = document.getElementById("header-title-top");
        const headerIntro = document.getElementById("header-intro-top");
        const addressTop = document.getElementById("address-manager-top");
        const imageMngrTop = document.getElementById("image-manager-top");
        const galleryTop = document.getElementById("gallery-top");
        const currentWidth = window.innerWidth;
        
        let calculatedHeight = Math.ceil(currentWidth * 0.5625);

        // if (calculatedHeight > maxBannerHeight) {
        //     calculatedHeight = maxBannerHeight;
        // }

        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = imageMngrTop.clientHeight;

        const newFontSize = (currentWidth / 768) + 2;

        $(titleText).css({"font-size":`${newFontSize}rem`});

        const imageSeed = Math.random().toString(36).substring(2, 9);

        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});

        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});

        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});

        $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        $("#banner-image").fadeOut(200, () => {

            $("#banner-image").remove();

            headerTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${imageSeed}/${currentWidth}/${calculatedHeight}.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

            currentBannerImageSeed = imageSeed;

        });
    }

    const changeHeaderImage = setInterval(changeHeader, 15000);

// This function handles updating the top positions of the sections and the
// size of the banner image as the display changes size or orientation.

    function updateHeader() {

        const titleText = document.getElementById("header-title-wrapper");
        const headerIntro = document.getElementById("header-intro-top");
        const addressTop = document.getElementById("address-manager-top");
        const imageMngrTop = document.getElementById("image-manager-top");
        const galleryTop = document.getElementById("gallery-top");
        const currentWidth = window.innerWidth;

        let calculatedHeight = Math.ceil(currentWidth * 0.5625);

        // if (calculatedHeight > maxBannerHeight) {
        //     calculatedHeight = maxBannerHeight;
        // }

        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = imageMngrTop.clientHeight;

        const newFontSize = (currentWidth / 768) + 2;

        $(titleText).css({"font-size":`${newFontSize}rem`});

        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});

        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});

        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});

        $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        $("#banner-image").css({"src":`https://picsum.photos/seed/${currentBannerImageSeed}/${currentWidth}/${calculatedHeight}.webp`, "style":"position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;"});

    }

    window.addEventListener('resize', updateHeader);


// -------------------------------------------------------------------------------------
// This section adds email addresses to a list, stored in an array of objects.
// The objects have the email address and an object with strings representing the
// pictures assigned to it. On loading there is a button to add an address, only
// valid and unique addresses are allowed. In the scrollable list of addresses clicking
// on one selects it, changing the current address which triggers the gallery to update.
// -------------------------------------------------------------------------------------


    // Checks if the address passed to it is already a button, hence not unique.
    // Returns true if there is no match.

    function isUnique(idString) {

        let test = document.getElementById(`btn${idString}`);

        if (test) {
            return false;
        } else {
            return true;
        }
    }

    // Adds each email address as a button in #address-manager-list-wrapper.

    function displayLinks(update = "new") {

        // Get the address list wrapper.
        const addressList = document.getElementById("address-manager-list-wrapper");

        // If an address exists in the array...
        if (imageLinks.length > 0) {

            // Get the number of objects in the array.
            let arrayLength = imageLinks.length;

            let addressText = "";
            let imageCount = 0;
            let buttonText = "";
            let newButton = "";

            if (update === "new") {

                // Iterate through the objects and create a button for each.

                for (let i = 0; i < arrayLength; i++) {

                    // Gets the address and stores it.
                    addressText = imageLinks[i]["address"];

                    // Gets the number of images attached to the address.
                    imageCount = Object.keys(imageLinks[i].images).length;

                    // Builds the string for the button text.
                    buttonText = addressText + " <br> " + `${imageCount} images assigned`;

                    // Inserts the html at the end of the div. The div is given a unique id containing the email address. The button gets only the email address as an id.
                    // This means an event handler on the button returns the email address string which is the key for the array object it represents. selectedAddress can
                    // be set to this value after making the visual change showing button selection.
                    addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display" id="div${addressText}"><button id="btn${addressText}" class="btn-not-selected" type="button">${buttonText}</button></div>`);

                    // Gets the button just created.
                    newButton = document.getElementById(`btn${addressText}`);

                    // Add event listener on new button.
                    newButton.addEventListener("click", (e) => {

                        // Suppress any default behaviour.
                        e.preventDefault();

                        // Get id of button that was clicked, which will be the address the button represents.
                        let newAddress = e.target.id.substring(3);

                        // Get the newly selected button.
                        const newlySelected = document.getElementById(`btn${newAddress}`);

                        // Get the previously selected button.
                        const previouslySelected = (selectedAddress)?document.getElementById(`btn${selectedAddress}`):"";

                        // If there was a button previously selected and you haven't clicked on that same one,
                        // remove `btn-selected` class and add `btn-not-selected` class to previous button.
                        // Then do the reverse for the new button. Finally set selectedAddress to the new
                        // address.
                        if (previouslySelected && (selectedAddress != newAddress)) {

                            previouslySelected.classList.remove("btn-selected");
                            previouslySelected.classList.add("btn-not-selected");

                            newlySelected.classList.remove("btn-not-selected");
                            newlySelected.classList.add("btn-selected");

                            selectedAddress = newAddress;

                        } else {

                            // At first no buttons are selected
                            newlySelected.classList.remove("btn-not-selected");
                            newlySelected.classList.add("btn-selected");

                            selectedAddress = newAddress;
                        }
                    });

                }

            } else if (update === "addaddress") {

                // Creates a button for a newly added address...


                // Gets the last address in the array and stores it.
                addressText = imageLinks[arrayLength - 1]["address"];

                // Builds the string for the button text.
                buttonText = addressText + " <br> 0 images assigned";

                // Inserts the html at the end of the div. (see above also)
                addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display" id="div${addressText}"><button id="btn${addressText}" class="btn-not-selected" type="button">${buttonText}</button></div>`);

                // Gets the button just created.
                newButton = document.getElementById(`btn${addressText}`);

                // Add event listener on new button.
                newButton.addEventListener("click", (e) => {

                    // Suppress any default behaviour.
                    e.preventDefault();

                    // Get id of button that was clicked, which will be the address the button represents.
                    let newAddress = e.target.id.substring(3);

                    // Get the newly selected button.
                    const newlySelected = document.getElementById(`btn${newAddress}`);

                    // Get the previously selected button.
                    const previouslySelected = (selectedAddress)?document.getElementById(`btn${selectedAddress}`):"";

                    // If there was a button previously selected and you haven't clicked on that same one,
                    // remove `btn-selected` class and add `btn-not-selected` class to previous button.
                    // Then do the reverse for the new button. Finally set selectedAddress to the new
                    // address.
                    if (previouslySelected && (selectedAddress != newAddress)) {

                        previouslySelected.classList.remove("btn-selected");
                        previouslySelected.classList.add("btn-not-selected");

                        newlySelected.classList.remove("btn-not-selected");
                        newlySelected.classList.add("btn-selected");

                        selectedAddress = newAddress;

                    } else {

                        // At first no buttons are selected
                        newlySelected.classList.remove("btn-not-selected");
                        newlySelected.classList.add("btn-selected");

                        selectedAddress = newAddress;
                    }
                });

            }
        }
    }

    displayLinks("new");

    // This sections initiates an event listener on the form to accept new email addresses.
    // When an address is submitted the event listener adds a new object to the imageLinks
    // array with the supplied email address and no images attached.

    // Get Submit button.
    const formElement = document.getElementById("address-manager-form");

    // Initiate event listener.
    formElement.addEventListener("submit", function(e) {

        // Stop the automated submission and refresh.
        e.preventDefault();

        // Get email string from event object.
        const emailValue = e.target["email-address"].value;

        // Add the address to the imageLinks array only if it
        // is not an existing address. Otherwise display an
        // error message.

        if (isUnique(emailValue)) {

            // Creates the new entry in imageLinks.
            imageLinks.push({"address":emailValue});

            // Updates the address display.
            displayLinks("addaddress");

        } else {

            // Show an alert dialogue.
            window.alert(["That address has already been entered."]);
        }

        // Reset email input
        formElement.reset();

    });
});


