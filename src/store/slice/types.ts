export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
  isCustom?: boolean;
}

export interface JokesState {
  jokes: Joke[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  refreshingJokeIds: number[];
} 