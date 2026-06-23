$(document).ready( function() {

//  Initialise array
    const imageLinks = [];

// -------------------------- Initial Setup --------------------------------------------
// This section performs initial setup of variables and section positions. It generates
// a seed and displays the banner image, adding an img element with appropriate sizing
// and effects parameters in the Lorum Picsum url.
// -------------------------------------------------------------------------------------
// Get references.

    const firstTitleText = document.getElementById("header-title-wrapper");
    const firstHeaderTitle = document.getElementById("header-title-top");
    const firstHeaderIntro = document.getElementById("header-intro-top");
    const firstAddressTop = document.getElementById("address-manager-top");
    const firstImageMngrTop = document.getElementById("image-manager-top");
    const firstGalleryTop = document.getElementById("gallery-top");

// Set and calculate flags and variables.

    const firstCurrentWidth = window.innerWidth;

    // Initialise global variables.
    const maxBannerHeight = 450;
    const maxIMImageWidth = 1440;
    let currentBannerImageSeed = Math.random().toString(36).substring(2, 9);
    let currentImageManagerSeed = "";
    let currentUniqueID = "";
    let selectedAddress = "";
    let updateIMDisplay = false;
    let gallerySeeds = [];
    let galleryUniqueIDs = [];
    let galleryIndex = -1;
    let desktopMode = (firstCurrentWidth >= 1500);
    let bannerHidden = false;
    let tempHeight;
    let firstCalculatedHeight = 0;

    if (!bannerHidden) {

        // Constrains the banner height to the maximum.
        tempHeight = Math.ceil(firstCurrentWidth * 0.5625);
        firstCalculatedHeight = (tempHeight > maxBannerHeight)?maxBannerHeight:tempHeight;

    }

    // Get or calculate section heights and the banner text font-size.
    const firstIntroHeight = firstHeaderIntro.clientHeight;
    const firstAddressHeight = firstAddressTop.clientHeight;
    const firstImgMngrHeight = (firstCurrentWidth * 0.39375) + 120;
    const firstNewFontSize = (firstCurrentWidth / 768) + 2;

    // Set top and left positions of sections and banner text font-size.
    $(firstTitleText).css({"font-size":`${firstNewFontSize}rem`});
    $(firstHeaderIntro).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight}px`});
    $(firstAddressTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight}px`});
    $(firstImageMngrTop).css({"position":"absolute","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight}px`});

    // If in desktop mode (width >= 1500px) sets the position and height,
    // moving the Gallery to the right of the intro and address manager.
    if (desktopMode) {

        $(firstGalleryTop).css({"position":"absolute","height":`${firstAddressHeight}`,"right":"0","top":`${firstCalculatedHeight + firstIntroHeight}px`});

    } else {

        $(firstGalleryTop).css({"position":"absolute","height":"fit-content","left":"0","top":`${firstCalculatedHeight + firstIntroHeight + firstAddressHeight + firstImgMngrHeight}px`});
    }

    // Insert random image into banner as an img element.
    firstHeaderTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${currentBannerImageSeed}/${firstCurrentWidth}/${firstCalculatedHeight}?not-from-cache.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);



// Calculates a new image seed, then fades the current image before loading the new image.
// Finally the new image seed replaces the old one. Does nothing if the banner is hidden.

    function changeHeader() {

        if (!bannerHidden){

            // Get reference to section.
            const headerTitle = document.getElementById("header-title-top");

            // Get current window width.
            const currentWidth = window.innerWidth;

            // Calculate banner height.
            tempHeight = Math.ceil(currentWidth * 0.5625);
            const calculatedHeight = (tempHeight > maxBannerHeight)?maxBannerHeight:tempHeight;

            // Generate new random seed.
            const imageSeed = Math.random().toString(36).substring(2, 9);

            // Fade current banner image.
            $("#banner-image").fadeOut(200, () => {

                // Remove current img element.
                $("#banner-image").remove();

                // Insert new img element with new seed.
                headerTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${imageSeed}/${currentWidth}/${calculatedHeight}.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

                // Set global seed variable to new value.
                currentBannerImageSeed = imageSeed;

            });
        }
    }

    // Call the changeHeader function every 15 seconds.
    const changeHeaderImage = setInterval(changeHeader, 15000);

// This function handles updating the positions of the sections and the
// size of the banner image as the display changes size or orientation.

    function updateSections() {

        const titleText = document.getElementById("header-title-wrapper");
        const headerTitle = document.getElementById("header-title-top");
        const headerIntro = document.getElementById("header-intro-top");
        const addressTop = document.getElementById("address-manager-top");
        const imageMngrTop = document.getElementById("image-manager-top");
        const galleryTop = document.getElementById("gallery-top");

        const currentWidth = window.innerWidth;

        let calculatedHeight = 0;

        if (!bannerHidden) {

            // Constrains the banner height to the maximum.
            tempHeight = Math.ceil(firstCurrentWidth * 0.5625);
            calculatedHeight = (tempHeight > maxBannerHeight)?maxBannerHeight:tempHeight;

        }

        const introHeight = headerIntro.clientHeight;
        const addressHeight = addressTop.clientHeight;
        const imgMngrHeight = (currentWidth * 0.39375) + 120;
        const newFontSize = (currentWidth / 768) + 2;

        $(titleText).css({"font-size":`${newFontSize}rem`});
        $(headerIntro).css({"position":"absolute","left":"0","top":`${calculatedHeight}px`});
        $(addressTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight}px`});
        $(imageMngrTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight}px`});
        // $(galleryTop).css({"position":"absolute","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});

        // If in desktop mode (width >= 1500px) sets the position and height,
        // moving the Gallery to the right of the address manager.
        
        desktopMode = (currentWidth >= 1500);

        if (desktopMode) {

            document.getElementById("gallery-top").style.removeProperty('left');
            $(galleryTop).css({"position":"absolute","height":`${addressHeight}`,"right":"0","top":`${calculatedHeight + introHeight}px`});

        } else {

            document.getElementById("gallery-top").style.removeProperty('right');
            $(galleryTop).css({"position":"absolute","height":"fit-content","left":"0","top":`${calculatedHeight + introHeight + addressHeight + imgMngrHeight}px`});
        }

        $("#banner-image").remove();

        headerTitle.insertAdjacentHTML('beforeend', `<img id="banner-image" src="https://picsum.photos/seed/${currentBannerImageSeed}/${currentWidth}/${calculatedHeight}.webp" style="position:absolute;top:0;left:0;z-index:0;width:100vw;object-position:50% 50%;">`);

    }

    // Call the updateSections function on resize or orientation change.
    window.addEventListener('resize', updateSections);


//--------------------------- Gallery -------------------------------------------------------
// The Gallery section displays the images attached to the currently selected email address.
// Clicking on an image copies it back into the image selection section where it can be
// assigned to another email address. When Hovered on, the image displays an X which will
// remove the image from the selected email address and update the gallery.
//-------------------------------------------------------------------------------------------

    async function populateGallery () {

        if (selectedAddress) {

            // Get the gallery wrapper
            const thumbnailContainer = document.getElementById("gallery-thumbnails");

            // Remove all gallery contents.
            while (thumbnailContainer.firstChild) {

                thumbnailContainer.firstChild.remove();
            }

            // Get the index of the object related to selectedAddress.
            const addressIndex = imageLinks.findIndex(a => a.address === selectedAddress);

            // Get the number of images attached to the object.
            let imagesInObject = Object.keys(imageLinks[addressIndex].images).length;

            // Clear gallerySeeds and UIDs array.
            gallerySeeds = [];
            galleryUniqueIDs = [];

            // If there are images, loop through them and create an img element for each one.
            if (imagesInObject > 0) {

                for (let i = 0; i < imagesInObject; i++) {

                    // Construct ID strings from index.
                    const imageName = `image-${i+1}`;
                    const spanName = `span-${i+1}`;

                    // Get the seed and UID from the array corresponding to the index.
                    let indexedImageSeed = imageLinks[addressIndex].images[imageName].url.substring(27,34);
                    let indexedImageUID = imageLinks[addressIndex].images[imageName].UID;

                    // Create the img element.
                    thumbnailContainer.insertAdjacentHTML('beforeend', `<span title="Click to delete image." class="gallery-img-span" id="${spanName}"><img alt="gallery image ${i+1}" id="${imageName}" src="https://picsum.photos/seed/${indexedImageSeed}/220/124.webp"" title="Click to open with image selector."></span>`);

                    // Get image and span elements just created.
                    const currentImage = document.getElementById(imageName);
                    const currentSpan = currentImage.parentElement;

                    // Stores a record of the current display's image seeds and UID's. This is useful for
                    // passing images back to the image manager and checking for uniqueness.
                    gallerySeeds[i] = indexedImageSeed;
                    galleryUniqueIDs[i] = indexedImageUID;

                    // Add click event listener to pass image back to image manager.
                    currentImage.addEventListener("click", function (e) {

                        // Get Index of clicked image from event object. updateIMOnResize will change the image
                        // seed to the value in gallerySeeds[] corresponding to the index.
                        galleryIndex = Number(e.target.id.substring(6)) - 1;

                        updateIMOnResize();

                    });

                    // Adds event listener to listen for clicks on the 'X' button.
                    // This pseudo-element of the image wrapper is placed in the
                    // top right corner on hover. Delimiting values are retrieved
                    // and adjusted to determine if the button was actually clicked.
                    // This setup is purely because I want a system tooltip on the
                    // delete button.
                    currentSpan.addEventListener("click", function (e) {

                        // Get the after pseudo-element from the span.
                        const spanAfter = getComputedStyle(this, ":after");

                        // Get the clicked span ID from the event object 
                        const spanID = e.target.id;

                        // Get image index from ID.
                        const imageIndex = spanID.substring(5);

                        // Make image string (ie 'image-1').
                        const imageString = `image-${imageIndex}`;

                        // Get span element.
                        const spanElement = document.getElementById(spanID);

                        if (spanAfter) {

                            // Get top/left and width/height from pseudo-element. These need adjusting to align
                            // with the mouse coordinates.
                            const afterTop = Number(spanAfter.getPropertyValue("top").slice(0, -2)) + 127;
                            const afterHeight = Number(spanAfter.getPropertyValue("height").slice(0, -2)) + 5;
                            const afterLeft = Number(spanAfter.getPropertyValue("left").slice(0, -2)) + 7.5;
                            const afterWidth = Number(spanAfter.getPropertyValue("width").slice(0, -2)) + 1;

                            // Get mouse X/Y.
                            const mouseX = e.layerX;
                            const mouseY = e.layerY;

                            // Is the mouse click within the calculated bounds of the remove image button?
                            if (mouseX > afterLeft && mouseX < afterLeft + afterWidth && mouseY > afterTop && mouseY < afterTop + afterHeight) {

                                // Get the index of the object related to selectedAddress.
                                const addressIndex = imageLinks.findIndex(a => a.address === selectedAddress);

                                // Remove the image property from the object's images.
                                delete imageLinks[addressIndex].images[imageString];

                                // Rebuild the images object so keys remain consecutive; image-1, image-2, etc...
                                const remainingImages = Object.values(imageLinks[addressIndex].images);
                                const renumberedImages = {};

                                remainingImages.forEach((val, idx) => {
                                    renumberedImages[`image-${idx+1}`] = val;
                                });

                                imageLinks[addressIndex].images = renumberedImages;

                                // Remove the element from the DOM and refresh the gallery display.
                                $(spanElement).remove();

                                populateGallery();

                                // Update address manager to show correct number of images attached.
                                displayLinks("refreshImageCounts");

                            }
                        }
                    })
                }

                // console.log(galleryUniqueIDs);
            }
        }
    }


// -------------------------- Address Manager ------------------------------------------
// This section adds email addresses to a list, stored in an array of objects.
// The objects have the email address and an object with strings representing the
// pictures assigned to it. On loading there is a button to add an address, only
// valid and unique addresses are allowed. In the scrollable list of addresses clicking
// on one selects it, changing the current address which triggers the gallery to update.
// -------------------------------------------------------------------------------------


    // Checks if the address passed to it is already a button, hence not unique.
    // Returns true if there is no match.

    function isUniqueAddress(idString) {

        let test = document.getElementById(`btn${idString}`);

        if (test) {
            return false;
        } else {
            return true;
        }
    }

    // Checks if the UID of the image string passed to it is already in the gallery,
    // hence not unique. Returns true if there is no match.

    async function isUniqueImage(imageString) {

        console.log(`Function 'isUniqueImage' - selectedAddress: >${selectedAddress}<`);

        // Assume the image is unique.
        let isUnique = true;

        // Get the unique ID for the seed passed in imageString.
        let imageStringUniqueID = await getUniqueID(imageString);
        console.log(`Function 'isUniqueImage' - imageStringUniqueID: >${imageStringUniqueID}<`);

        // If there are images in the gallery...
        let imagesInGallery = gallerySeeds.length;        
        console.log(`Function 'isUniqueImage' - imagesInGallery: >${imagesInGallery}<`);


        if (imagesInGallery > 0) {

            // Loop through galleryUniqueIDs[] to look for a match with the unique ID retrieved for the seed string parameter.
            for (let i = 0;i < imagesInGallery; i++) {

                // Get the indexed unique ID from the values stored when the gallery is populated.
                let indexedGalleryUniqueID = await galleryUniqueIDs[i];
                console.log(`Function 'isUniqueImage' - indexedGalleryUniqueID: >${indexedGalleryUniqueID}<`);

                // Test whether the ID's match.
                if (indexedGalleryUniqueID === imageStringUniqueID) {

                    // The image is not unique.
                    isUnique = false;
                    console.log("Function 'isUniqueImage' - Image not unique.")
                }

            }
        }

        return isUnique;

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
                    addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display clean-child-button" id="div${addressText}"><button aria-label="${addressText}" title="${addressText}" id="btn${addressText}" class="btn-not-selected" type="button">${buttonText}</button></div>`);

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
                addressList.insertAdjacentHTML('beforeend', `<div class="address-manager-email-display clean-child-button" id="div${addressText}"><button aria-label="${addressText}" title="${addressText}" id="btn${addressText}" class=${(arrayLength === 1)?"btn-selected":"btn-not-selected"} type="button">${buttonText}</button></div>`);

                // Changes selectedAddress to new address only if this is the first item.
                selectedAddress = (arrayLength === 1)?addressText:selectedAddress;

                // Set UpdateIMDisplay
                updateIMDisplay = true;

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


//--------------------------- Form Input Manager --------------------------------------------
// This section initiates an event listener on the form to accept new email addresses.
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

        if (isUniqueAddress(emailValue)) {

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

//--------------------------- Image Manager -------------------------------------------------
// This section handles the image selection display. At the top is the current email address.
// Below that a random image is displayed with two buttons overlaying in the top right corner.
// These refresh the image or add the current image to the selected address.
//-------------------------------------------------------------------------------------------

    // Set image dimensions. It displays a 16:9 image 70% of the page width.
    // Constrains to maxIMImageWidth to keep things sensible on large desktops.
    let imageWidth = Math.ceil(window.innerWidth * 0.7);

    if (imageWidth > maxIMImageWidth) {
        imageWidth = maxIMImageWidth;
    }

    let imageHeight = Math.ceil(imageWidth * 0.5625);

    // Generate a new random seed.
    currentImageManagerSeed = Math.random().toString(36).substring(2, 9);


// Function to retrieve the unique image ID for the image seed passed to it.-------------------

    async function getUniqueID(imageSeed) {

        // Get the Unique ID from the Lorem Picsum API.
        try {

            // HEAD method fetches metadata only.
            const response = await fetch(`https://picsum.photos/seed/${imageSeed}/500/280.webp`, { method: 'HEAD' });

            // Gives warning if http returns aren't ok.
            if (!response.ok) {

                console.warn(`Request failed: ${response.status}`);
                return "";
            }

            // Extract unique ID string from the response headers
            currentUniqueID = response.headers.get('picsum-id');

            if (!currentUniqueID) {

                console.warn(`Could not resolve ID for seed: ${imageSeed}`);
                return "";
            }

        } catch (error) {

            console.warn('Fetch failed:', error);
            return "";            
        }

        return currentUniqueID;
    }

// --------------------------------------------------------------------------------------------


    // Get image containers, header text container and both buttons.
    const imageWrapper = document.getElementById("image-wrapper");
    const imageContainerHeader = document.getElementById("image-manager-header-bar");
    const refreshButton = document.getElementById("image-manager-refresh-button-wrapper");
    const assignButton = document.getElementById("image-manager-assign-button-wrapper");

    // Make the container match the image size.
    $(imageWrapper).css({"width":`${imageWidth}px`,"height":`${imageHeight}px`});

    // Insert image element into the image container.
    imageWrapper.insertAdjacentHTML('beforeend', `<img style="overflow:hidden !important;" id="current-random-image" src="https://picsum.photos/seed/${currentImageManagerSeed}/${imageWidth}/${imageHeight}.webp">`);

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

        let currentWidth = window.innerWidth;
        let imageWidth = imageWrapper.clientWidth;
        let imageTopOffset = imageContainerHeader.offsetHeight + 40;
        let imageRightOffset = ((currentWidth - imageWidth) / 2) - `${currentWidth < 576?50:70}`;

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
        // Constrains to maxIMImageWidth to keep things sensible on large desktops.
        let newImageWidth = Math.ceil(window.innerWidth * 0.7);

        if (newImageWidth > maxIMImageWidth) {
            newImageWidth = maxIMImageWidth;
        }

        let newImageHeight = Math.ceil(newImageWidth * 0.5625);

        // Make the container match the image size.
        $(imageWrapper).css({"width":`${newImageWidth}px`,"height":`${newImageHeight}px`});

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
        // Constrains to maxIMImageWidth to keep things sensible on large desktops.
        let newImageWidth = Math.ceil(window.innerWidth * 0.7);

        if (newImageWidth > maxIMImageWidth) {
            newImageWidth = maxIMImageWidth;
        }

        let newImageHeight = Math.ceil(newImageWidth * 0.5625);

        // Make the container match the image size.
        $(imageWrapper).css({"width":`${newImageWidth}px`,"height":`${newImageHeight}px`});

        // Get the image.
        const currentImage = document.getElementById("current-random-image");

        // Remove the current image element from the image wrapper.
        $(currentImage).remove();

        // If galleryIndex is not -1 replace the current seed with the seed in gallerySeeds indexed by galleryIndex.
        // This mechanism is initiated by gallery image click events on the image.
        if (galleryIndex != -1) {

            currentImageManagerSeed = gallerySeeds[galleryIndex];

            galleryIndex = -1;
      
        }

        // Add updated image element.
        imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${currentImageManagerSeed}/${newImageWidth}/${newImageHeight}.webp">`);

    }

    // Call the updateIMOnResize function on resize.
    window.addEventListener('resize', updateIMOnResize);


    //----------------------------------------------------------------------------------------------------
    // Adds event listener on the assign button which assigns the image to the selected address.
    // It then resets the image, updates the image counts in the email section and updates the gallery.
    //----------------------------------------------------------------------------------------------------

    assignButton.addEventListener("click", async function (e) {

        // Stop any automated behaviour.
        e.preventDefault();

        // Is currentImageManagerSeed unique to this address?
        let okToAdd = await isUniqueImage(currentImageManagerSeed);

        // Gets the ID of the current IM image seed.
        let currentIMUniqueID = await getUniqueID(currentImageManagerSeed);

        // Only executes if an address has been selected and the image is unique to this address.
        if (selectedAddress && okToAdd) {

            // Get the index of the object related to selectedAddress.
            const addressIndex = imageLinks.findIndex(a => a.address === selectedAddress);

            // Get the number of images attached to the object.
            let imagesInObject = Object.keys(imageLinks[addressIndex].images).length;

            // Add the new image to the object.
            imageLinks[addressIndex].images[`image-${imagesInObject + 1}`] = {"url":`https://picsum.photos/seed/${currentImageManagerSeed}/500/280.webp`, "UID":`${currentIMUniqueID}`};
            console.log(imageLinks);

            // Set image dimensions. It displays a 16:9 image 70% of the page width.
            // Constrains to maxIMImageWidth to keep things sensible on large desktops.
            let newImageWidth = Math.ceil(window.innerWidth * 0.7);

            if (newImageWidth > maxIMImageWidth) {
                newImageWidth = maxIMImageWidth;
            }

            let newImageHeight = Math.ceil(newImageWidth * 0.5625);

            // Make the container match the image size. Needs some extra to avoid scrollbars (need to investigate).
            $(imageWrapper).css({"width":`${newImageWidth}px`,"height":`${newImageHeight}px`});

            // Get the image.
            const currentImage = document.getElementById("current-random-image");

            // Remove the current image element from the image wrapper.
            $(currentImage).remove();

            // Add new image element with current seed.
            imageWrapper.insertAdjacentHTML('beforeend', `<img id="current-random-image" src="https://picsum.photos/seed/${currentImageManagerSeed}/${newImageWidth}/${newImageHeight}.webp">`);

            // Update the image counts in the email display.
            displayLinks("refreshImageCounts");

            await populateGallery();

        } else if (!selectedAddress) {

            // No email address has been selected.
            window.alert("No email address has been selected.");

        } else if (selectedAddress && !(okToAdd)) {

            // This image is already attached to the selected address.
            window.alert("That image is already attached to this email address.");
        }
    });

});