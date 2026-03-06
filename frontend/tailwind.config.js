/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ee7c2b",
                "background-light": "#faf9f8",
                "background-dark": "#221810",
                "surface-light": "#ffffff",
                "surface-dark": "#2d2118",
                "text-main": "#332c26",
                "text-muted": "#9a8c7c",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "1rem", "lg": "1.5rem", "xl": "2rem", "2xl": "2.5rem", "3xl": "3rem", "full": "9999px" },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(238, 124, 43, 0.1)',
                'card': '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
