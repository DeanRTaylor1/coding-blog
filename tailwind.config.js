/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: [
        "JetBrains Mono",
        "VT323",
        "ui-monospace",
        "SFMono-Regular",
        "monospace",
      ],
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "vim-light": "rgb(220, 215, 186)",
        "vim-bg": "rgb(30, 31, 40)",
        "vim-comment": "#727169",
        "vim-dark-blue": "#223249",
        "vim-purple": "#957fb8",
        "vim-light-blue": "#7e9cd8",
        "vim-light-blue-highlight": "rgba(54,54,70, 0.8)",
        "vim-bright-red": "#e82424",
        "vim-comment-green": "#98bb6c",
        "vim-orange": "#ffa066",
        "vim-red-standard": "#e46876",
        "vim-beige": "#e46876",
      },
    },
  },
  plugins: [],
};
