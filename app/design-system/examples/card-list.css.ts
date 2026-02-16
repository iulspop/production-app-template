import { style } from "@vanilla-extract/css";

import { themeVars } from "../tokens/colors.css";
import {
  borderRadius,
  container,
  elevation,
  gap,
  inset,
  padding,
} from "../tokens/spacing.css";

export const page = style({
  background: themeVars.surface.primary,
  maxWidth: container.lg,
  paddingBottom: inset.page.bottom,
  paddingLeft: padding.page,
  paddingRight: padding.page,
  paddingTop: inset.page.top,
});

export const heading = style({
  color: themeVars.text.primary,
  fontSize: "24px",
  fontWeight: 600,
  marginBottom: gap.stack.lg,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: gap.stack.sm,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

export const card = style({
  background: themeVars.surface.secondary,
  border: `1px solid ${themeVars.border.default}`,
  borderRadius: borderRadius.md,
  boxShadow: elevation[1],
  display: "flex",
  justifyContent: "space-between",
  padding: padding.card,
});

export const cardTitle = style({
  color: themeVars.text.primary,
  fontSize: "16px",
  fontWeight: 500,
  margin: 0,
});

export const cardMeta = style({
  color: themeVars.text.tertiary,
  fontSize: "14px",
});
