import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        serif: ['"Merriweather"', "Georgia", "Times New Roman", "serif"],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Roboto Mono', 'Courier New', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        brand: {
          orange: "#FF6347",
          "orange-light": "#FF8C7A",
          "orange-dark": "#E84C32",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],         // 16px
        lg: ["1.0625rem", { lineHeight: "1.6rem" }],      // 17px
        xl: ["1.125rem", { lineHeight: "1.4rem" }],       // 18px
        "2xl": ["1.5rem", { lineHeight: "1.25" }],        // 24px
        "3xl": ["2.125rem", { lineHeight: "1.15" }],      // 34px
        "4xl": ["2.5rem", { lineHeight: "1.1" }],         // 40px
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-out": { "0%": { opacity: "1", transform: "translateY(0)" }, "100%": { opacity: "0", transform: "translateY(10px)" } },
        "slide-in-right": { "0%": { transform: "translateX(100%)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        "slide-in-left": { "0%": { transform: "translateX(-100%)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        "slide-in-bottom": { "0%": { transform: "translateY(100%)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        "scale-in": { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        pulse: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.8" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.brand.orange"),
              fontWeight: "600",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },
            h1: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              fontSize: theme("fontSize.3xl")[0],
              lineHeight: theme("fontSize.3xl")[1].lineHeight || "1.15",
            },
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              fontSize: theme("fontSize.2xl")[0],
            },
            h3: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              fontSize: theme("fontSize.xl")[0],
            },
            code: {
              background: "rgba(27,31,35,0.05)",
              padding: "0.2rem 0.35rem",
              borderRadius: "6px",
              fontWeight: "500",
              fontFamily: theme("fontFamily.mono").join(", "),
            },
            pre: {
              background: "#0f1724",
              color: "#e6eef8",
              padding: "1rem",
              borderRadius: "8px",
            },
            blockquote: {
              borderLeftColor: theme("colors.brand.orange"),
              backgroundColor: "transparent",
            },
            table: {
              th: {
                backgroundColor: "#fff5f2",
                fontWeight: "700",
              },
              td: {
                borderColor: "rgba(0,0,0,0.06)",
              },
            },
            img: {
              borderRadius: "10px",
            },
            p: {
              fontSize: theme("fontSize.lg")[0],
              lineHeight: "1.75",
            },
          },
        },
        sm: {
          css: {
            fontSize: theme("fontSize.sm")[0],
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

export default config;
