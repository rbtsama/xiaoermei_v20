import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // 配色系统 - 四季自然色
        'brand-primary': '#2C5F8D',    // 冬·深蓝 - 主色
        'brand-secondary': '#C67A28',  // 秋·深橙 - 强调色
        'brand-accent': '#4A8FBF',     // 夏·湖蓝 - 辅助色
        'brand-bg': '#F8F6F3',         // 春·米白 - 背景色
        'brand-success': '#5A8A65',    // 森林绿 - 成功
        'brand-error': '#B94D3D',      // 砖瓦红 - 错误
        // 中性色
        'text-primary': '#2A2A2A',
        'text-secondary': '#6B6B6B',
        'text-tertiary': '#999999',
        'text-disabled': '#CCCCCC',
        'border-normal': '#E5E5E5',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
