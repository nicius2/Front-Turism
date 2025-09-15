/** @type {import('tailwindcss').TailwindConfig} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'login': "url('./src/assets/background.svg')"
            }
        },
    },
    plugins: [],
}