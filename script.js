/* ===== HAMBURGER MENU ===== */
// Get the hamburger icon and the nav menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Add a click event listener to the hamburger icon
hamburger.addEventListener("click", () => {
    // Toggle the 'active' class on both the icon and the menu
    // This will trigger the CSS to show/hide the menu
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close the menu when a nav link is clicked
// This is good for user experience on mobile
document.querySelectorAll(".nav-item a").forEach(link => {
    link.addEventListener("click", () => {
        // Remove the 'active' class to hide the menu
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});


/* ===== NEW: SCROLL SPY (Active Nav Link on Scroll) ===== */

// Get all the sections that have an ID
const sections = document.querySelectorAll("section[id]");

// Set up the options for the observer
const observerOptions = {
    // This creates a 'viewport' for detection that starts 70px from the top
    // (to offset your 70px sticky nav) and ends 40% from the bottom.
    // A section is 'active' when it's in this zone.
    rootMargin: "-70px 0px -40% 0px",
};

// This function is called every time a section enters or leaves the 'zone'
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        
        // entry.isIntersecting is true when the section is in our 'zone'
        if (entry.isIntersecting) {
            
            // Get the ID of the section (e.g., "about", "projects")
            const id = entry.target.getAttribute("id");
            
            // Find the navigation link that has an href matching the section ID
            const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
            
            // 1. First, remove the 'active-link' class from ALL nav links
            document.querySelectorAll(".nav-menu a.active-link").forEach((link) => {
                link.classList.remove("active-link");
            });
            
            // 2. Then, add the 'active-link' class to the ONE correct link
            if (activeLink) {
                activeLink.classList.add("active-link");
            }
        }
    });
};

// Create the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Tell the observer to watch (observe) every section
sections.forEach((section) => {
    observer.observe(section);
});