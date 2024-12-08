/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto_400Regular", "sans-serif"],
        "roboto-thin": ["Roboto_100Thin", "sans-serif"],
        "roboto-thin-italic": ["Roboto_100Thin_Italic", "sans-serif"],
        "roboto-light": ["Roboto_300Light", "sans-serif"],
        "roboto-light-italic": ["Roboto_300Light_Italic", "sans-serif"],
        "roboto-regular": ["Roboto_400Regular", "sans-serif"],
        "roboto-regular-italic": ["Roboto_400Regular_Italic", "sans-serif"],
        "roboto-medium": ["Roboto_500Medium", "sans-serif"],
        "roboto-medium-italic": ["Roboto_500Medium_Italic", "sans-serif"],
        "roboto-bold": ["Roboto_700Bold", "sans-serif"],
        "roboto-bold-italic": ["Roboto_700Bold_Italic", "sans-serif"],
        "roboto-black": ["Roboto_900Black", "sans-serif"],
        "roboto-black-italic": ["Roboto_900Black_Italic", "sans-serif"],
      },
      colors: {
        background: {
          dark: "#181829",
          DEFAULT: "#FFFFFF",
        },
        foreground: {
          dark: "#222232",
          DEFAULT: "#fffafa",
        },
        borderForeground: {
          dark: "transparent",
          DEFAULT: "#f5f5f5",
        },
        fontDefault: {
          dark: "#FFFFFF",
          DEFAULT: "#000000",
        },
        fontWelcome: {
          dark: "#DFC6FE",
          DEFAULT: "#000000",
        },
        fontSecondary: {
          dark: "#E8E2F0",
          DEFAULT: "#000000",
        },
        fontTertiary: {
          dark: "#D3D3D3",
          DEFAULT: "#000000",
        },
        fontLink: {
          dark: "#8A31FF",
          DEFAULT: "#000000",
        },
        followedBackground: {
          dark: "#0F0F0F",
          DEFAULT: "#f5f5f5",
        },
        cardFollowed: {
          dark: "#2A272E",
          DEFAULT: "#fffafa",
        },
      },
    },
  },
  plugins: [],
};
