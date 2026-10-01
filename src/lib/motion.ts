export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const;

/** Déclenchement au scroll : une seule fois, légèrement avant l'entrée. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
