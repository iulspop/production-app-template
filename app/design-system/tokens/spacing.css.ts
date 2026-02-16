export const space = {
  "0.5": "2px",
  "1": "4px",
  "1.5": "6px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
} as const;

export const gap = {
  inline: { md: space["3"], sm: space["2"], xs: space["1"] },
  stack: {
    lg: space["6"],
    md: space["4"],
    sm: space["2"],
    xl: space["8"],
    xs: space["1"],
  },
} as const;

export const padding = {
  card: space["5"],
  input: space["3"],
  page: space["8"],
  section: space["6"],
} as const;

export const inset = {
  page: { bottom: space["12"], top: space["8"] },
} as const;

export const borderRadius = {
  full: "50%",
  lg: "16px",
  md: "8px",
  none: "0",
  sm: "4px",
  xl: "24px",
} as const;

export const elevation = {
  "0": "none",
  "1": "0 1px 3px rgba(0,0,0,0.08)",
  "2": "0 4px 12px rgba(0,0,0,0.12)",
} as const;

export const container = {
  full: "100%",
  lg: "800px",
  md: "640px",
  sm: "480px",
} as const;
