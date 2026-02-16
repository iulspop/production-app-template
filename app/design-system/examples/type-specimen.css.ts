import { style } from "@vanilla-extract/css";

import { themeVars } from "../tokens/colors.css";

export const wrapper = style({
  background: themeVars.surface.primary,
  color: themeVars.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  maxWidth: "640px",
  padding: "32px",
});

export const label = style({
  color: themeVars.text.tertiary,
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

export const divider = style({
  borderColor: themeVars.border.subtle,
  borderStyle: "solid",
  borderWidth: "0 0 1px",
  margin: "8px 0 16px",
});
