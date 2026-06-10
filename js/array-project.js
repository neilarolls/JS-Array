$(document).ready( function() {

    // Initialise array
    const imageLinks = Array.from([

        {
            "address":    "random@company.com",
            "images": {
                "image-1": {

                    "url":          "https://picsum.photos/seed/9841641/500/280.webp",
                    "blur-effect":  "?blur=3"
                }
                // ,
                // "image-2": {

                //     "url":          "https://picsum.photos/seed/0723562/500/280",
                //     "greyscale-effect":  "?grayscale"
                // }
            }
        }
        ,
        {
            "address":    "info@institution.gov",
            "images": {
                "image-1": {

                    "url":          "https://picsum.photos/seed/6871352/500/280.webp",
                    "blur-effect":  "?blur=1"
                }
                ,
                "image-2": {

                    "url":          "https://picsum.photos/seed/3843535/500/280.webp"
                }
                ,
                "image-3": {

                    "url":          "https://picsum.photos/seed/8137531/500/280.webp"
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
    const firstCalculatedHeight = Math.ceil(firstCurrentWidth * 0.5625);
    const firstIntroHeight = firstHeaderIntro.clientHeight;
    const firstAddressHeight = firstAddressTop.clientHeight;
    const firstNewFontSize = (firstCurrentWidth / 768) + 2;

    let currentBannerImageSeed = Math.random().toString(36).substring(2, 9);
    let selectedAddress = "";
    let updateIMDisplay = false;

    $(firstTitleText).css({"font-size":`${firstNewFontSize}rem`});
    $(firstHeaderIntro).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight}px`});
    $(firstAddressTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight}px`});
    $(firstImageMngrTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight}px`});

    firstHeaderTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${currentBannerImageSeed}/${firstCurrentWidth}/${firstCalculatedHeight}.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

    const firstImgMngrHeight = (firstCurrentWidth * 0.39375) + 120;
    $(firstGalleryTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight + firstImgMngrHeight}px`});


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
        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = (currentWidth * 0.39375) + 120;
        const newFontSize = (currentWidth / 768) + 2;
        const imageSeed = Math.random().toString(36).substring(2, 9);

        $(titleText).css({"font-size":`${newFontSize}rem`});
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

    // Call the changeHeader function every 15 seconds.
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
        let introHeight = headerIntro.clientHeight;
        let addressHeight = addressTop.clientHeight;
        let imgMngrHeight = (currentWidth * 0.39375) + 120;
        const newFontSize = (currentWidth / 768) + 2;

        $(titleText).css({"font-size":`${newFontSize}rem`});
        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});
        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});
        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});
        $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        $("#banner-image").css({"src":`https://picsum.photos/seed/${currentBannerImageSeed}/${currentWidth}/${calculatedHeight}.webp`, "style":"position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;"});

    }

    // Call the updateHeader function on resize or orientation change.
    window.addEventListener('resize', updateHeader);


//-------------------------------------------------------------------------------------------
// The Gallery section displays the images attached to the currently selected email address.
// Clicking on an image brings it to fullscreen.
//-------------------------------------------------------------------------------------------

    function populateGallery () {

        if (selectedAddress) {

            // Get the gallery wrapper
            const thumbnailContainer = document.getElementById("gallery-thumbnails");

            thumbnailContainer.innerHTML = "";

            // Get the index of the object related to selectedAddress.
            const addressIndex = imageLinks.findIndex(a => a.address === selectedAddress);

            // Get the number of images attached to the object.
            let imagesInObject = Object.keys(imageLinks[addressIndex].images).length;

            if (imagesInObject > 0) {

                for (let i = 0;i < imagesInObject;i++) {

                    let indexedImageSeed = imageLinks[addressIndex].images[`image-${i+1}`].url.substring(27,34);

                    thumbnailContainer.insertAdjacentHTML('beforeend', `<img id="image-${i+1}" src="https://picsum.photos/seed/${indexedImageSeed}/220/124.webp"">`);
                }
            }

        }
    }


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
            let newButton;

            if (update === "new") {

                // Iterate through the objects and create a button for each.

                for (let i = 0; i < arrayLength; i++) {

                    // Gets the indexed address.
                    addressText = imageLinks[i]["address"];

                    // Gets the number of images attached to the address.
                    imageCount = Object.keys(imageLinks[i].images).length;

                    // Builds the string for the button text.
                    buttonText = addressText.substring(0,16) + "...<br>" + `${imageCount} image${imageCount!=1?`s`:""} assigned`;

                    // Inserts the html at the end of the div. The div and btn are given a unique id containing the email address.
                    // This means an event handler on the button returns the email address string which is the key for the array object it represents.
                    // selectedAddress is set to this value after making the visual change showing button selection.
                    addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display" id="div${addressText}"><button aria-label="${addressText}" title="${addressText}" id="btn${addressText}" class="btn-not-selected" type="button">${buttonText}</button></div>`);

                    // Gets the button just created.
                    newButton = document.getElementById(`btn${addressText}`);

                    // Add click event listener on new button. This functions to select that button.
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
                            updateIMDisplay = true;

                        } else {

                            // At first no buttons are selected so no need to deselect a button.
                            newlySelected.classList.remove("btn-not-selected");
                            newlySelected.classList.add("btn-selected");

                            selectedAddress = newAddress;
                            updateIMDisplay = true;
                        }

                            populateGallery();

                    });

                }

            } else if (update === "addaddress") {

                // Creates a button for a newly added address...


                // Gets the last address in the array and stores it.
                addressText = imageLinks[arrayLength - 1]["address"];

                // Builds the string for the button text.
                buttonText = addressText.substring(0,16) + "...<br>0 images assigned";

                // Inserts the html at the end of the div. (see previous branch also)
                addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display" id="div${addressText}"><button aria-label="${addressText}" title="${addressText}" id="btn${addressText}" class="btn-not-selected" type="button">${buttonText}</button></div>`);

                // Gets the button just created.
                newButton = document.getElementById(`btn${addressText}`);

                // Add a click event listener on new button.
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
                        updateIMDisplay = true;

                        populateGallery();

                    } else {

                        // At first no buttons are selected
                        newlySelected.classList.remove("btn-not-selected");
                        newlySelected.classList.add("btn-selected");

                        selectedAddress = newAddress;
                        updateIMDisplay = true;

                        populateGallery();

                    }

                });

            // Updates the image counts on the buttons. Called by the assign button.
            } else if (update === "refreshImageCounts") {

                // Get the number of objects in the array.
                let arrayLength = imageLinks.length;

                // Not sure how I'd end up calling this branch with an empty array, but just in case...
                if(arrayLength) {
                
                    for (let i = 0; i < arrayLength; i++) {

                        // Gets the indexed address.
                        addressText = imageLinks[i]["address"];

                        // Gets the number of images attached to the address.
                        imageCount = Object.keys(imageLinks[i].images).length;

                        // Builds the string for the button text.
                        buttonText = addressText.substring(0,16) + "...<br>" + `${imageCount} image${imageCount!=1?`s`:""} assigned`;

                        // Get the indexed button.
                        const indexedButton = document.getElementById(`btn${addressText}`);

                        // Insert new string into button.
                        indexedButton.innerHTML = `${buttonText}`;
                    }
                    
                } else {

                    window.alert("Tried to refresh image counts with an empty array!");
                }
            }
        }
    }

    displayLinks("new");


    //-------------------------------------------------------------------------------------------
    // This sections initiates an event listener on the form to accept new email addresses.
    // When an address is submitted the event listener adds a new object to the imageLinks
    // array with the supplied email address and no images attached.
    //-------------------------------------------------------------------------------------------

    // Get Submit button.
    const formElement = document.getElementById("address-manager-form");

    // Initiate event listener.
    formElement.addEventListener("submit", function(e) {

        // Stop the automated submission and refresh.
        e.preventDefault();

        // Get email string from event object.
        const emailValue = e.target["email-address"].value;

        // Adds the address to the imageLinks array only if it
        // is not an existing address. Otherwise display an
        // error message.

        if (isUnique(emailValue)) {

            // Creates the new entry in imageLinks.
            imageLinks.push({"address":emailValue,"images":{}});

            // Updates the address display.
            displayLinks("addaddress");

        } else {

            // Show an alert dialogue.
            window.alert(["That address has already been entered."]);
        }

        // Reset email input
        formElement.reset();

    });


//-------------------------------------------------------------------------------------------
// This section handles the image selection display. At the top is the current email address.
// Below that a random image is displayed with two buttons overlaying in the top right corner.
// These refresh the image or add the current image to the selected address.
//-------------------------------------------------------------------------------------------

    // Set image dimensions. It displays a 16:9 image 70% of the page width.
    let imageWidth = Math.ceil(window.innerWidth * 0.7);
    let imageHeight = Math.ceil(window.innerWidth * 0.39375);

    // Generate a new random seed.
    let currentImageManagerSeed = Math.random().toString(36).substring(2, 9);

    // Get image containers and header text container and both buttons.
    const imageWrapper = document.getElementById("image-wrapper");
    const imageContainerHeader = document.getElementById("image-manager-header-bar");
    const refreshButton = document.getElementById("image-manager-refresh-button-wrapper");
    const assignButton = document.getElementById("image-manager-assign-button-wrapper");

    // Make the container match the image size.
    $(imageWrapper).css({"width":`${imageWidth + 8}px`,"height":`${imageHeight + 8}px`});

    // Insert image element into the image container.
    imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${currentImageManagerSeed}/${imageWidth}/${imageHeight}.webp">`);

    // Set the header text.
    imageContainerHeader.insertAdjacentText("beforeend",`Selected Email Address: none`);


    // This interval timed function updates the selected email displayed in the header area.
    // I've also co-opted it to maintain a consistent position for the refresh and assign buttons.
    const imageManagerSelectedUpdate = setInterval( function () {

        // The updateIMDisplay flag is set when a button is selected in the address manager.
        if (updateIMDisplay) {
            

            imageContainerHeader.textContent = "";

            imageContainerHeader.insertAdjacentText("beforeend",`Selected Email Address: ${selectedAddress}`);

            updateIMDisplay = false;

        }

        let imageWidth = imageWrapper.clientWidth;
        let imageTopOffset = imageContainerHeader.offsetHeight + 16;
        let imageRightOffset = ((window.innerWidth - imageWidth) / 2) - 40;

        $(refreshButton).css({"top":`${imageTopOffset}px`});
        $(refreshButton).css({"right":`${imageRightOffset}px`});

        $(assignButton).css({"top":`${imageTopOffset + 48}px`});
        $(assignButton).css({"right":`${imageRightOffset}px`});

    }, 20);

    // Adds event listener on the refresh button which replaces the image seed and image.
    refreshButton.addEventListener("click", function (e) {

        // Stop any automated behaviour.
        e.preventDefault();

        // Set image dimensions. It displays a 16:9 image 70% of the page width.
        let newImageWidth = Math.ceil(window.innerWidth * 0.7);
        let newImageHeight = Math.ceil(window.innerWidth * 0.39375);

        // Make the container match the image size.
        $(imageWrapper).css({"width":`${newImageWidth + 8}px`,"height":`${newImageHeight + 8}px`});

        // Generate a new random seed.
        let newImageManagerSeed = Math.random().toString(36).substring(2, 9);

        // Get the current image element.
        const currentImage = document.getElementById("current-random-image");

        // Remove the current image element from the image wrapper.
        $(currentImage).remove();

        // Add new image element with new seed.
        imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${newImageManagerSeed}/${newImageWidth}/${newImageHeight}.webp">`);

        // Swap to the new seed value.
        currentImageManagerSeed = newImageManagerSeed;
    });

    function updateIMOnResize() {

        // Set image dimensions. It displays a 16:9 image 70% of the page width.
        let newImageWidth = Math.ceil(window.innerWidth * 0.7);
        let newImageHeight = Math.ceil(window.innerWidth * 0.39375);

        // Make the container match the image size.
        $(imageWrapper).css({"width":`${newImageWidth + 8}px`,"height":`${newImageHeight + 8}px`});

        // Get the image.
        const currentImage = document.getElementById("current-random-image");

        // Remove the current image element from the image wrapper.
        $(currentImage).remove();

        // Add updated image element.
        imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${currentImageManagerSeed}/${newImageWidth}/${newImageHeight}.webp">`);
        
    }

    // Call the updateHeader function on resize or orientation change.
    window.addEventListener('resize', updateIMOnResize);

    // Adds event listener on the assign button which assigns the image to the selected address.
    // It then resets the image, updates the image counts in the email section and updates the gallery.
    assignButton.addEventListener("click", function (e) {

        // Stop any automated behaviour.
        e.preventDefault();

        // Only executes if an address has been selected.
        if (selectedAddress) {

            // Get the index of the object related to selectedAddress.
            const addressIndex = imageLinks.findIndex(a => a.address === selectedAddress);

            // Get the number of images attached to the object.
            let imagesInObject = Object.keys(imageLinks[addressIndex].images).length;

            // Add the new image to the object.
            imageLinks[addressIndex].images[`image-${imagesInObject + 1}`] = {"url":`https://picsum.photos/seed/${currentImageManagerSeed}/500/280.webp`};

            console.log(imageLinks);

            // Set image dimensions. It displays a 16:9 image 70% of the page width.
            let newImageWidth = Math.ceil(window.innerWidth * 0.7);
            let newImageHeight = Math.ceil(window.innerWidth * 0.39375);

            // Make the container match the image size. Needs some extra to avoid scrollbars (need to investigate).
            $(imageWrapper).css({"width":`${newImageWidth + 8}px`,"height":`${newImageHeight + 8}px`});

            // Generate a new random seed. Sets to current value if selectedAddress is null which results in no effective change.
            let newImageManagerSeed = (selectedAddress)?Math.random().toString(36).substring(2, 9):currentImageManagerSeed;

            // Get the image.
            const currentImage = document.getElementById("current-random-image");

            // Remove the current image element from the image wrapper.
            $(currentImage).remove();

            // Add new image element with new seed.
            imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${newImageManagerSeed}/${newImageWidth}/${newImageHeight}.webp">`);

            // Update the image counts in the email display.
            displayLinks("refreshImageCounts");

            populateGallery();

            // Swap to the new seed value.
            currentImageManagerSeed = newImageManagerSeed;
        }
    });



});