import type { IJoke } from "@/types/IJoke";
import axios from "axios";

const API_URL = import.meta.env.VITE_JOKES_API_URL;
const RANDOM_JOKE_URL = import.meta.env.VITE_JOKES_RANDOM_URL;

export const fetchJokesFromAPI = async (): Promise<IJoke[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchSingleJoke = async (): Promise<IJoke> => {
  const response = await axios.get(RANDOM_JOKE_URL);
  return response.data;
}; 