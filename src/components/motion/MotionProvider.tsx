"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respecte prefers-reduced-motion pour toutes les animations Framer Motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
