import { style } from "@vanilla-extract/css";

import { themeVars } from "../tokens/colors.css";

export const card = style({
  background: themeVars.surface.secondary,
  border: `1px solid ${themeVars.border.default}`,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  maxWidth: "360px",
  padding: "20px",
});

export const title = style({
  color: themeVars.text.primary,
  fontSize: "18px",
  fontWeight: 600,
  margin: 0,
});

export const meta = style({
  color: themeVars.text.tertiary,
  fontSize: "14px",
  margin: 0,
});

export const tagList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

export const tagWarm = style({
  background: themeVars.accent.warm.subtle,
  borderRadius: "4px",
  color: themeVars.accent.warm.text,
  fontSize: "12px",
  fontWeight: 500,
  padding: "2px 8px",
});

export const tagCool = style({
  background: themeVars.accent.cool.subtle,
  borderRadius: "4px",
  color: themeVars.accent.cool.text,
  fontSize: "12px",
  fontWeight: 500,
  padding: "2px 8px",
});

export const tagNatural = style({
  background: themeVars.accent.natural.subtle,
  borderRadius: "4px",
  color: themeVars.accent.natural.text,
  fontSize: "12px",
  fontWeight: 500,
  padding: "2px 8px",
});

export const footer = style({
  alignItems: "center",
  borderTop: `1px solid ${themeVars.border.subtle}`,
  color: themeVars.text.secondary,
  display: "flex",
  fontSize: "14px",
  justifyContent: "space-between",
  paddingTop: "8px",
});

export const action = style({
  background: "none",
  border: "none",
  color: themeVars.interactive.primary,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  padding: 0,
});

export const wrapper = style({
  background: themeVars.surface.primary,
  padding: "24px",
});
