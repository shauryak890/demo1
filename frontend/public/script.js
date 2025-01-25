document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function setTheme(theme) {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }

    // Set initial theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? "dark" : "light");
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
        });
    } else {
        console.error("Theme toggle button not found");
    }

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll(".feature-card");
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.1 },
        );

        featureCards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = "opacity 0.5s, transform 0.5s";
            observer.observe(card);
        });
    } else {
        console.error("No feature cards found");
    }

    // Handle form submission
    const subscribeForm = document.getElementById("subscribe-form");
    if (subscribeForm) {
        subscribeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = e.target.elements.email.value;
            // Here you would typically send the email to your server
            console.log(`Subscribed with email: ${email}`);
            alert("Thank you for subscribing!");
            e.target.reset();
        });
    } else {
        console.error("Subscribe form not found");
    }
});