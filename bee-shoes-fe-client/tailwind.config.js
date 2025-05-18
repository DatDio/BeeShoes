module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        hover: "#6756ca",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
