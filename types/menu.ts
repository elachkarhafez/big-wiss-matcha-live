export type MenuItem = {
  name: string;
  description: string;
  badge?: string;
  price?: string;
  approved?: boolean;
  supportsLevel?: boolean;
};

export type MatchaLevelKey = "light" | "balanced" | "strong";

export type MatchaLevel = {
  key: MatchaLevelKey;
  label: string;
  intensity: string;
  glowClass: string;
};
