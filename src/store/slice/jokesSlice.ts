import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Joke, JokesState } from "@/store/slice/types";
import { loadCustomJokes, saveCustomJokes } from "@/store/utils/localStorage";

import { fetchJokesFromAPI, fetchSingleJoke } from "../api/api";

const MAX_ATTEMPTS = 5;
const JOKES_PER_PAGE = 10;

const initialState: JokesState = {
  jokes: [],
  status: "idle",
  error: null,
  refreshingJokeIds: [],
};

export const fetchJokes = createAsyncThunk(
  "jokes/fetchJokes",
  async (_, { rejectWithValue }) => {
    try {
      const customJokes = loadCustomJokes();
      const remainingSlots = JOKES_PER_PAGE - customJokes.length;
      let apiJokes: Joke[] = [];
      if (remainingSlots > 0) {
        const jokesFromApi = await fetchJokesFromAPI();
        apiJokes = jokesFromApi.filter(
          (joke: Joke) => !customJokes.some((customJoke) => customJoke.id === joke.id)
        ).slice(0, remainingSlots);
      }
      return [...customJokes, ...apiJokes];
    } catch (error) {
      return rejectWithValue("Error loading jokes");
    }
  }
);

export const fetchMoreJokes = createAsyncThunk(
  "jokes/fetchMoreJokes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { jokes: JokesState };
      const existingIds = new Set(state.jokes.jokes.map((joke) => joke.id));
      let attempts = 0;
      let newJokes: Joke[] = [];
      while (attempts < MAX_ATTEMPTS) {
        const jokes = await fetchJokesFromAPI();
        const uniqueNewJokes = jokes.filter(
          (joke: Joke) => !existingIds.has(joke.id)
        );
        if (uniqueNewJokes.length === JOKES_PER_PAGE) {
          newJokes = uniqueNewJokes;
          break;
        }
        attempts++;
      }
      if (newJokes.length === 0) {
        return rejectWithValue("Failed to find new unique jokes");
      }
      return newJokes;
    } catch (error) {
      return rejectWithValue("Error loading more jokes");
    }
  }
);

export const refreshJoke = createAsyncThunk(
  "jokes/refreshJoke",
  async (jokeId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { jokes: JokesState };
      const jokeToRefresh = state.jokes.jokes.find((joke) => joke.id === jokeId);
      if (!jokeToRefresh) {
        return rejectWithValue("Joke not found");
      }
      const newJoke = await fetchSingleJoke();
      return { oldId: jokeId, newJoke };
    } catch (error) {
      return rejectWithValue("Error refreshing joke");
    }
  }
);

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    addJoke: (state, action) => {
      const newJoke = {
        ...action.payload,
        isCustom: true,
      };
      const customJokes = loadCustomJokes();
      customJokes.unshift(newJoke);
      saveCustomJokes(customJokes);
      const idx = state.jokes.findIndex(joke =>
        joke.id === action.payload.id ||
        (joke.setup === action.payload.setup && joke.punchline === action.payload.punchline)
      );
      if (idx !== -1) {
        state.jokes[idx].isCustom = true;
      }
    },
    deleteJoke: (state, action) => {
      const jokeId = action.payload;
      const jokeToDelete = state.jokes.find((joke) => joke.id === jokeId);
      const isCustom = jokeToDelete?.isCustom;
      if (isCustom) {
        const customJokes = loadCustomJokes();
        const updatedCustomJokes = customJokes.filter(
          (joke) =>
            joke.id !== jokeId &&
            !(joke.setup === jokeToDelete?.setup && joke.punchline === jokeToDelete?.punchline)
        );
        saveCustomJokes(updatedCustomJokes);
      }
      state.jokes = state.jokes.filter(
        (joke) =>
          joke.id !== jokeId &&
          !(joke.setup === jokeToDelete?.setup && joke.punchline === jokeToDelete?.punchline)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jokes = action.payload;
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchMoreJokes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoreJokes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jokes = [...state.jokes, ...action.payload];
      })
      .addCase(fetchMoreJokes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(refreshJoke.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        if (typeof action.meta.arg === 'number') {
          state.refreshingJokeIds.push(action.meta.arg);
        }
      })
      .addCase(refreshJoke.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { oldId, newJoke } = action.payload;
        const index = state.jokes.findIndex((joke) => joke.id === oldId);
        if (index !== -1) {
          state.jokes[index] = newJoke;
        }
        state.refreshingJokeIds = state.refreshingJokeIds.filter(id => id !== oldId);
      })
      .addCase(refreshJoke.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        if (typeof action.meta.arg === 'number') {
          state.refreshingJokeIds = state.refreshingJokeIds.filter(id => id !== action.meta.arg);
        }
      });
  },
});

export const { addJoke, deleteJoke } = jokesSlice.actions;
export default jokesSlice.reducer;
export const selectRefreshingJokeIds = (state: { jokes: JokesState }) => state.jokes.refreshingJokeIds;
