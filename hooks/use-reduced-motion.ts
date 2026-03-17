"use client";

import { useReducedMotion as useMotionPreference } from "framer-motion";

export function useReducedMotion() {
  return useMotionPreference() ?? false;
}
