/** @type {import('tailwindcss').Config} */  
// follows the TailwindCSS configuration type.
// It helps with auto-completion and avoids typos when writing config.
export default {  // This object contains all Tailwind configuration for your project.
  // Tailwind reads this file when building your CSS.
  content: ["./index.html", "./src/**/*.{js,jsx}"],// 1) "./index.html" → scan the root HTML file.
  // 2) "./src/**/*.{js,jsx}" → scan all .js and .jsx files inside "src" and its subfolders.
  // This is important because Tailwind only includes the classes you actually use.

  theme: { extend: {} },  // "theme" is where you customize design options like colors, fonts, spacing, etc.
  // "extend" means we are adding to Tailwind's default settings instead of replacing them.
  // Right now it's empty, meaning we are using the default theme.
  plugins: [],  // "plugins" is where you can add extra Tailwind features made by the community or yourself.
  // Example: forms, typography, custom utilities.
  // It's empty for now because we are not using any plugins yet.
};
