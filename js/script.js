// Controller for mobile menu navigation toggle.
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
        mainNav.classList.toggle("open");
    });
}

// Controller to check if a required value has been entered.
function isRequired(value) {
    return value.trim() !== "";
}

// Controller to check if an email address is valid (contains "@" and ".").
function isValidEmail(value) {
    return value.includes("@") && value.includes(".");
}

// Controller for Contact Form validation.
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.querySelector("#fullName").value;
        const email = document.querySelector("#email").value;
        const subject = document.querySelector("#subject").value;
        const message = document.querySelector("#message").value;

        formMessage.classList.remove("success-message", "error-message");

        if (!isRequired(fullName) || !isRequired(email) || !isRequired(subject) || !isRequired(message)) {
            formMessage.textContent = "Please complete all required fields before submitting the form.";
            formMessage.classList.add("error-message");
        } else if (!isValidEmail(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.classList.add("error-message");
        } else {
            formMessage.textContent = "Thank you, " + fullName + ". Your message has been prepared successfully.";
            formMessage.classList.add("success-message");
            contactForm.reset();
        }
    });
}

// Controller for searching and filtering on the Events page.
const eventFilter = document.querySelector("#eventFilter");
const eventSearch = document.querySelector("#eventSearch");
const eventCards = document.querySelectorAll(".event-card");
const eventCount = document.querySelector("#eventCount");

function filterEvents() {
    const selectedCategory = eventFilter ? eventFilter.value : "all";
    const searchText = eventSearch ? eventSearch.value.toLowerCase() : "";
    let visibleCount = 0;

    eventCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        const cardText = card.textContent.toLowerCase();
        const categoryMatches = selectedCategory === "all" || category === selectedCategory;
        const searchMatches = cardText.includes(searchText);

        if (categoryMatches && searchMatches) {
            card.classList.remove("hide-card");
            visibleCount = visibleCount + 1;
        } else {
            card.classList.add("hide-card");
        }
    });

    if (eventCount) {
        eventCount.textContent = "Showing " + visibleCount + " event(s).";
    }
}

if (eventFilter && eventSearch) {
    eventFilter.addEventListener("change", filterEvents);
    eventSearch.addEventListener("input", filterEvents);
    filterEvents();
}

// Controller for gallery filtering on the Projects/Gallery page.
const galleryFilter = document.querySelector("#galleryFilter");
const galleryItems = document.querySelectorAll(".gallery-item");

function filterGallery() {
    const selectedCategory = galleryFilter ? galleryFilter.value : "all";

    galleryItems.forEach(function (item) {
        const category = item.getAttribute("data-category");

        if (selectedCategory === "all" || category === selectedCategory) {
            item.classList.remove("hide-card");
        } else {
            item.classList.add("hide-card");
        }
    });
}

if (galleryFilter) {
    galleryFilter.addEventListener("change", filterGallery);
    filterGallery();
}

// Controller for image pop-up (Lightbox) preview.
const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.querySelector("#lightbox");
const closeLightbox = document.querySelector("#closeLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");

if (lightbox && lightboxImage && lightboxCaption) {
    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            const caption = image.parentElement.querySelector("figcaption").textContent;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = caption;
            lightbox.classList.add("show-lightbox");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });
}

if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", function () {
        lightbox.classList.remove("show-lightbox");
        lightbox.setAttribute("aria-hidden", "true");
    });
}
