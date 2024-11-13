import axios from 'axios';
import { Cartoon } from '../utils/interface';

const API_BASE = 'https://api.sampleapis.com/cartoons/cartoons2D';

/**
 * Fetching the list of cartoons 
 */
export const fetchCartoonList = async (): Promise<Cartoon[]> => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching cartoon list:', error);
    throw new Error('Unable to fetch cartoon list. Please try again later.');
  }
};

/**
 * Fetching cartoon details for a specific cartoon by ID 
 */
export const fetchCartoonDetails = async (id: number): Promise<Cartoon> => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for cartoon with ID ${id}:`, error);
    throw new Error('Unable to fetch cartoon details. Please try again later.');
  }
};
