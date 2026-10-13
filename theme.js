function setTheme(theme) {
    const isDark = theme === "dark";
    const themeToggle = document.querySelector(".theme-toggle");

    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.querySelector(".theme-toggle-label").textContent =
            isDark ? "Light mode" : "Dark mode";
        themeToggle.querySelector(".theme-toggle-icon").textContent =
            isDark ? "☀" : "◐";
    }

    localStorage.setItem("zinx-theme", theme);
}

const savedTheme = localStorage.getItem("zinx-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

setTheme(savedTheme || preferredTheme);

document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    setTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});
