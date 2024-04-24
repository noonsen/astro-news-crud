export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    const DARK_THEME_CLASS = "dark";  
    const COLOUR_MODE = "COLOUR_MODE";
    const LIGHT_THEME = "LIGHT";
    const DARK_THEME = "DARK";

    // Select the theme toggle button and root element
    const toggle = document.querySelector("[data-theme-toggle]");
    const rootEl = document.documentElement;


    // Add event listener to the toggle button
    if (toggle) {
        toggle.addEventListener("click", () => {
            rootEl.classList.toggle(DARK_THEME_CLASS); // Determine the current colour mode based on class existence
            const colourMode = rootEl.classList.contains(DARK_THEME_CLASS)
            ? DARK_THEME : LIGHT_THEME;
        // Store the colour mode preference in local storage
        window.localStorage.setItem(COLOUR_MODE, colourMode);
    });
}
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  