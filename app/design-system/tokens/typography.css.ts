export const fontFamily = {
  accent: "Inter, serif",
  primary: "Inter, sans-serif",
} as const;

export const fontSize = {
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
  base: "16px",
  lg: "18px",
  sm: "14px",
  xl: "20px",
  xs: "12px",
} as const;

export const fontWeight = {
  light: "300",
  medium: "500",
  regular: "400",
  semibold: "600",
} as const;

export const lineHeight = {
  normal: "1.4",
  relaxed: "1.6",
  tight: "1.2",
} as const;

export const letterSpacing = {
  normal: "0",
  tight: "-0.02em",
  wide: "0.05em",
} as const;
