import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

const palette = {
  cool: {
    100: "#CDDCED",
    300: "#5285B3",
    500: "#1F5280",
    700: "#80B8EB",
  },
  earth: {
    100: "#F0E2C2",
    300: "#D2A852",
    500: "#80611A",
    700: "#F2C761",
  },
  muted: {
    100: "#E0DEE3",
    300: "#99949E",
    500: "#524D57",
    700: "#C7C2CC",
  },
  natural: {
    100: "#D0E5D4",
    300: "#6BA37A",
    500: "#2E6638",
    700: "#8DD199",
  },
  neutral: {
    50: "#F8F5EE",
    100: "#EDE9E0",
    200: "#DBD6CD",
    300: "#ABA6A0",
    400: "#8C8580",
    500: "#57524D",
    600: "#38352F",
    700: "#1A1716",
    900: "#0D0C0A",
  },
  special: {
    gold: "#EBC859",
    white: "#FFFFFF",
  },
  warm: {
    100: "#F2D5CF",
    300: "#D2614D",
    500: "#941A10",
    700: "#F28566",
  },
} as const;

const colorContract = createThemeContract({
  accent: {
    cool: { subtle: null, text: null, tint: null },
    earth: { subtle: null, text: null, tint: null },
    muted: { subtle: null, text: null, tint: null },
    natural: { subtle: null, text: null, tint: null },
    warm: { subtle: null, text: null, tint: null },
  },
  border: {
    default: null,
    subtle: null,
  },
  interactive: {
    primary: null,
    subtle: null,
  },
  surface: {
    inverse: null,
    primary: null,
    secondary: null,
    tertiary: null,
  },
  text: {
    inverse: null,
    primary: null,
    secondary: null,
    tertiary: null,
  },
});

createGlobalTheme(":root", colorContract, {
  accent: {
    cool: {
      subtle: palette.cool[100],
      text: palette.cool[500],
      tint: palette.cool[300],
    },
    earth: {
      subtle: palette.earth[100],
      text: palette.earth[500],
      tint: palette.earth[300],
    },
    muted: {
      subtle: palette.muted[100],
      text: palette.muted[500],
      tint: palette.muted[300],
    },
    natural: {
      subtle: palette.natural[100],
      text: palette.natural[500],
      tint: palette.natural[300],
    },
    warm: {
      subtle: palette.warm[100],
      text: palette.warm[500],
      tint: palette.warm[300],
    },
  },
  border: {
    default: palette.neutral[200],
    subtle: palette.neutral[100],
  },
  interactive: {
    primary: palette.earth[500],
    subtle: palette.earth[300],
  },
  surface: {
    inverse: palette.neutral[700],
    primary: palette.neutral[50],
    secondary: palette.special.white,
    tertiary: palette.neutral[100],
  },
  text: {
    inverse: palette.neutral[50],
    primary: palette.neutral[700],
    secondary: palette.neutral[600],
    tertiary: palette.neutral[500],
  },
});

createGlobalTheme(".dark", colorContract, {
  accent: {
    cool: {
      subtle: palette.cool[500],
      text: palette.cool[700],
      tint: palette.cool[300],
    },
    earth: {
      subtle: palette.earth[500],
      text: palette.earth[700],
      tint: palette.earth[300],
    },
    muted: {
      subtle: palette.muted[500],
      text: palette.muted[700],
      tint: palette.muted[300],
    },
    natural: {
      subtle: palette.natural[500],
      text: palette.natural[700],
      tint: palette.natural[300],
    },
    warm: {
      subtle: palette.warm[500],
      text: palette.warm[700],
      tint: palette.warm[300],
    },
  },
  border: {
    default: palette.neutral[600],
    subtle: palette.neutral[700],
  },
  interactive: {
    primary: palette.earth[700],
    subtle: palette.earth[300],
  },
  surface: {
    inverse: palette.neutral[50],
    primary: palette.neutral[900],
    secondary: palette.neutral[700],
    tertiary: palette.neutral[600],
  },
  text: {
    inverse: palette.neutral[700],
    primary: palette.neutral[50],
    secondary: palette.neutral[200],
    tertiary: palette.neutral[300],
  },
});

export { palette, colorContract as themeVars };
