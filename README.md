# WCAG 2.2 Color Contrast Calculator - Chrome Plugin
[WCAG 2.2 Contrast Checker - Chrome Web Store](https://chromewebstore.google.com/detail/wcag-contrast-checker/dgldkjfbookpojpaedkfeobhndpjlbaa?authuser=0&hl=en&pli=1)

React plugin for Chrome (Manifest v3) with Webpack as the dev server to auto-reload when making changes.

`npm start` to run locally

## How to Use Contrast Calculator

Enter or select any 2 colors in Hex or RGB format. The plugin will automatically calculate the color contrast ratio of any valid color pair.

### Auto-Adjust Buttons

When the current color contrast ratio is below 3:1 or 4.5:1, the respective "auto-adjust" buttons will become available. Activating them will adjust the adjacent color to meet the desired contrast ratio, while making the minimum possible change to the color value.

The plugin itself is fully accessible to WCAG 2.2 AA standards, please let me know if you find any issues.

## TO DO

- Toggleable settings for default behaviour (hex/rgb, copy value to clipboard when using color dropper)
