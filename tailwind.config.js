/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(40px)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(3px)" },
          "50%": { transform: "translateY(-2px)" },
        },
        left_right: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(50vw)" },
        },
      },
      screens: {
        "max-hm": { raw: "(max-height: 1400px)" },
        "sm-custom": { raw: "(max-width: 650px)" },
        "sm-custom_2": { raw: "(max-width: 320px)" },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        float2: "float2 5s ease-in-out infinite",
        left_right: "left_right 3s ease-in-out forwards",
        pulse_custom: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin_custom: "spin 4s linear infinite",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        press_start_2p: ['"Press Start 2P"', "system-ui"],
        bruno: ["Bruno Ace SC", "sans-serif"],
        micro5: ['"Micro 5"', "sans-serif"],
        garamond: ['"EB Garamond"', "serif"],
        bitcount: ['"Bitcount Grid Single"', "system-ui"],
        alumni: ['"Alumni Sans SC"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
