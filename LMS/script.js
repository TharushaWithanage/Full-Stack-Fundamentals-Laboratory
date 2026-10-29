/* ===================== 1. Dynamic Greeting ===================== */
const greetingElement = document.getElementById("greeting");

if (greetingElement) {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetingElement.textContent = "Good Morning!";
    } else if (currentHour < 18) {
        greetingElement.textContent = "Good Afternoon!";
    } else {
        greetingElement.textContent = "Good Evening!";
    }
}

/* ===================== 2. Dark Mode (all pages) ===================== */

const darkModeStyles = `
    [data-bs-theme="dark"] body {
        background-color: #212529 !important;
        color: #ffffff !important;
    }

    /* Courses page */
    [data-bs-theme="dark"] #courses {
        background-color: #212529 !important;
    }
    [data-bs-theme="dark"] #courses h2 {
        color: #ffffff !important;
    }
    [data-bs-theme="dark"] .card-body {
        background-color: #343a40 !important;
    }
    [data-bs-theme="dark"] .card-body h3,
    [data-bs-theme="dark"] .card-body p {
        color: #ffffff !important;
    }

    /* Contact page */
    [data-bs-theme="dark"] .contact-card {
        background-color: #343a40 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }
    [data-bs-theme="dark"] .contact-info h5 {
        color: #ffffff !important;
    }
    [data-bs-theme="dark"] .form-control {
        background-color: #2b3035;
        color: #ffffff;
        border-color: #495057;
    }
    [data-bs-theme="dark"] .form-label {
        color: #ffffff;
    }

    /* About page */
    [data-bs-theme="dark"] .about-card {
        background-color: #343a40 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }
    [data-bs-theme="dark"] .about-card h3 {
        color: #6ea8fe !important;
    }
    [data-bs-theme="dark"] .about-content h2 {
        color: #ffffff !important;
    }

    /* Shared grey text */
    [data-bs-theme="dark"] .text-secondary {
        color: #ced4da !important;
    }
`;

const styleTag = document.createElement("style");
styleTag.textContent = darkModeStyles;
document.head.appendChild(styleTag);

// Use the existing toggle button, or create one if the page has none
let themeToggle = document.getElementById("themeToggle");

if (!themeToggle) {
    const navContainer = document.querySelector(".navbar .nav");

    if (navContainer) {
        themeToggle = document.createElement("button");
        themeToggle.type = "button";
        themeToggle.id = "themeToggle";
        themeToggle.className = "btn btn-light ms-2";
        navContainer.appendChild(themeToggle);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }

    try {
        localStorage.setItem("lmsTheme", theme);
    } catch (error) {
        // Storage may be blocked; the toggle still works for this page
    }
}

let savedTheme = "light";
try {
    savedTheme = localStorage.getItem("lmsTheme") || "light";
} catch (error) {
    savedTheme = "light";
}
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

/* ===================== 3. Contact Form ===================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const response = document.getElementById("formResponse");

        response.textContent =
            "Thank you, " + name + "! Your message has been prepared successfully.";
        response.className = "alert alert-success mt-3";

        contactForm.reset();
    });
}