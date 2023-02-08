/** @type {import('tailwindcss'.Config} */
module.exports = {
    content: [
	"./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
      extend: {
	  backgroundImage: theme => ({
	      'snow': "url('images/snow.jpeg')",
	      'summer': "url('images/summer.jpeg')",
	      'autumn': "url('images/autumn.jpeg')",
          })
      },
  },
  plugins: [],
}
