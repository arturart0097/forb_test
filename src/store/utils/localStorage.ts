import type { IJoke } from "@/types/IJoke";

const STORAGE_KEY = "custom_jokes";

export const loadCustomJokes = (): IJoke[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCustomJokes = (jokes: IJoke[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
}; 