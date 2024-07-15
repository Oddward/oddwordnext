module.exports = {
    theme: {
        extends: {
            screens: {
                'uxl': '2000px'
            }
        }
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        // For the best performance and to avoid false positives,
        // be as specific as possible with your content configuration.
    ],
};
