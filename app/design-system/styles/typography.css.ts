import { style } from "@vanilla-extract/css";

import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "../tokens/typography.css";

export const display = style({
  fontFamily: fontFamily.primary,
  fontSize: fontSize["4xl"],
  fontWeight: fontWeight.semibold,
  letterSpacing: letterSpacing.tight,
  lineHeight: lineHeight.tight,
  marginBottom: "24px",
});

export const displaySm = style({
  fontFamily: fontFamily.primary,
  fontSize: fontSize["3xl"],
  fontWeight: fontWeight.semibold,
  letterSpacing: letterSpacing.tight,
  lineHeight: lineHeight.tight,
  marginBottom: "20px",
});

export const subhead = style({
  fontFamily: fontFamily.primary,
  fontSize: fontSize.xl,
  fontWeight: fontWeight.medium,
  letterSpacing: letterSpacing.normal,
  lineHeight: lineHeight.normal,
  marginBottom: "16px",
});

export const body = style({
  fontFamily: fontFamily.primary,
  fontSize: fontSize.base,
  fontWeight: fontWeight.regular,
  letterSpacing: letterSpacing.normal,
  lineHeight: lineHeight.relaxed,
  marginBottom: "12px",
});

export const meta = style({
  fontFamily: fontFamily.primary,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.regular,
  letterSpacing: letterSpacing.normal,
  lineHeight: lineHeight.normal,
  marginBottom: "8px",
});

export const accent = style({
  fontFamily: fontFamily.accent,
  fontSize: fontSize.lg,
  fontWeight: fontWeight.medium,
  letterSpacing: letterSpacing.wide,
  lineHeight: lineHeight.normal,
  marginBottom: "12px",
});
