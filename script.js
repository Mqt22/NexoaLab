// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

if (menuToggle && mobileMenu) {

    // Open / close menu
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });


    // Close menu when a link is clicked
    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");
        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

        if (
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");
        }

    });

}


// =========================
// ACTIVE NAVIGATION LINK
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


// =========================
// HEADER + SCROLL PROGRESS
// =========================

const header = document.querySelector(".header");
const progressBar = document.querySelector(".scroll-progress");

function handleScroll() {

    const scrollTop = window.scrollY;


    // Header background
    if (header) {

        if (scrollTop > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    // Scroll progress
    if (progressBar) {

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const scrollPercentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = `${scrollPercentage}%`;

    }

}

window.addEventListener("scroll", handleScroll);

handleScroll();


// =========================
// SERVICE TABS
// =========================

const serviceTabs = document.querySelectorAll(".service-tab");
const servicePanels = document.querySelectorAll(".service-panel");

serviceTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.service;


        // Remove active state from tabs
        serviceTabs.forEach((item) => {

            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");

        });


        // Hide all panels
        servicePanels.forEach((panel) => {
            panel.classList.remove("active");
        });


        // Activate clicked tab
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");


        // Show matching panel
        const targetPanel = document.querySelector(
            `.service-panel[data-panel="${target}"]`
        );

        if (targetPanel) {
            targetPanel.classList.add("active");
        }

    });

});


document.querySelectorAll(".service-cta").forEach((button) => {
    button.addEventListener("click", function () {
        const card = this.closest(".service-card");
        const panel = this.closest(".service-panel");

        if (!card || !panel) return;

        const serviceName = card.querySelector("h4").textContent.trim();
        const category = panel.dataset.panel;

        const serviceSelect = document.getElementById("service");
        const budgetSelect = document.getElementById("budget");
        const messageField = document.getElementById("message");

        // Select the main service category
        const categories = {
            web: "Web Development",
            automation: "AI Automation",
            game: "2D Game Development"
        };

        serviceSelect.value = categories[category] || "Something Else";

        // Select the estimated budget for the chosen service
        const budgets = {
            "Portfolio Website": "Under PKR 15,000",
            "Landing Page": "PKR 15,000 - 30,000",
            "E-Commerce": "PKR 30,000 - 50,000",
            "Admin Panel": "PKR 30,000 - 50,000",
            "Cozy Game": "Under PKR 15,000",
            "Horror Game": "Under PKR 15,000",
            "Survival Game": "Under PKR 15,000",
            "Strategy Game": "Under PKR 15,000"
        };

        budgetSelect.value = budgets[serviceName] || "Not sure yet";

        // Fill in the specific service name and let the customer add details
        messageField.value =
            `I'm interested in your ${serviceName} service.\n\n` +
            `Project details: `;

    });
});
