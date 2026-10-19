/* 1. Dynamic Greeting */

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

/* 2. Dark Mode Toggle */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");

        if (currentTheme == "dark") {
            document.documentElement.setAttribute("data-bs-theme", "light");
            themeToggle.textContent = "Dark Mode";
        } else {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            themeToggle.textContent = "Light Mode";
        }
    });
}