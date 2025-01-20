/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto_400Regular", "sans-serif"],
        "inter-thin": ["Inter_100Thin", "sans-serif"],
        "inter-extra-light": ["Inter_200ExtraLight", "sans-serif"],
        "inter-light": ["Inter_300Light", "sans-serif"],
        "inter-regular": ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semi-bold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
        "inter-extra-bold": ["Inter_800ExtraBold", "sans-serif"],
        "inter-black": ["Inter_900Black", "sans-serif"],
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
        backgroundButton: {
          dark: "#8A31FF",
          DEFAULT: "#007AFF",
        },
        backgroundDetailsVacantion: {
          dark: "#606060",
          DEFAULT: "#959595",
        },
        backgroundSeparator: {
          dark: "#9747FF",
          DEFAULT: "#acacac",
        },
        backgroundPlatformSelected: {
          dark: "#39394B",
          DEFAULT: "#D9D9D9",
        },
        backgroundLabelVacantion: {
          dark: "#707070",
          DEFAULT: "#707070",
        },
        borderForeground: {
          dark: "#dcdcdc",
          DEFAULT: "#dcdcdc",
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
        fontQuartenary: {
          dark: "#808080",
          DEFAULT: "#808080",
        },
        fontLink: {
          dark: "#8A31FF",
          DEFAULT: "#0082FB",
        },
        followedBackground: {
          dark: "#0F0F0F",
          DEFAULT: "#F0F0F0",
        },
        cardFollowed: {
          dark: "#2A272E",
          DEFAULT: "#FFFFFF",
        },
        platformLabel: {
          dark: "#440992",
          DEFAULT: "#B3D8FF",
        },
      },
    },
  },
  plugins: [],
};
