
import axios from 'axios';
import { Cartoon } from '../utils/types';

const API_BASE = 'https://api.sampleapis.com/cartoons/cartoons2D';

/**
 * Fetching the list of cartoons from the API.
 */
export const fetchCartoonList = async (): Promise<Cartoon[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

/**
 * Fetching cartoon details for a specific cartoon by ID.
 */
export const fetchCartoonDetails = async (id: number): Promise<Cartoon> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};
