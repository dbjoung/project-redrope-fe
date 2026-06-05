export const USABLE_ICON = {
  0: "user-star",
  1: "map",
  2: "book-marked",
  3: "hourglass",
  4: "drama",
  5: "bubbles",
} as const;

export type UsableIconKey = keyof typeof USABLE_ICON;

export type UsableIconValue = (typeof USABLE_ICON)[UsableIconKey];
