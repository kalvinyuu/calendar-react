/** @type {import('tailwindcss'.Config} */
module.exports = {
    content: [
	"./app/**/*.{js,ts,jsx,tsx}",
	"./pages/**/*.{js,ts,jsx,tsx}",
	"./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
	extend: {
	    backgroundImage: theme => ({
		'snow': "url('../public/images/snow.jpeg')",
		'summer': "url('../public/images/summer.jpeg')",
		'autumn': "url('../public/images/autumn.jpeg')",
            })
	},
    },
    plugins: [],
}
