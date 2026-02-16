export const duration = {
  fast: "100ms",
  instant: "0ms",
  moderate: "300ms",
  normal: "200ms",
  slow: "400ms",
  slower: "600ms",
  slowest: "1000ms",
} as const;

export const easing = {
  easeIn: "cubic-bezier(0.55, 0, 1, 0.45)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const motion = {
  ambient: { duration: duration.slowest, easing: easing.easeInOut },
  collapse: { duration: duration.normal, easing: easing.easeIn },
  emphasis: { duration: duration.slow, easing: easing.easeSpring },
  enter: { duration: duration.moderate, easing: easing.easeOut },
  exit: { duration: duration.normal, easing: easing.easeIn },
  expand: { duration: duration.moderate, easing: easing.easeOut },
  fade: { duration: duration.normal, easing: easing.easeOut },
  move: { duration: duration.normal, easing: easing.easeInOut },
} as const;
