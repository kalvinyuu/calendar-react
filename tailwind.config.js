/** @type {import('tailwindcss'.Config} */
module.exports = {
  content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        snow: "url('../public/images/snow.jpeg')",
        summer: "url('../public/images/summer.jpeg')",
        autumn: "url('../public/images/autumn.jpeg')",
      }),
    },
  },
  plugins: [],
};
