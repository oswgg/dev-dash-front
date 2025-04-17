// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        darkMode: 'class',
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}