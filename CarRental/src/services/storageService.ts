import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car, mockCars } from './mockCars';

const CARS_STORAGE_KEY = 'cached_cars_v3';

// saving cars into cache memory
export const storeCars = async (cars: Car[]): Promise<void> => {
  try {
    const jsonCars = JSON.stringify(cars);
    await AsyncStorage.setItem(CARS_STORAGE_KEY, jsonCars);
  } catch (e) {
    console.error('Error saving to cache:', e);
  }
};

// Downloading cars from catche
export const getCachedCars = async (): Promise<Car[]> => {
  try {
    const data = await AsyncStorage.getItem(CARS_STORAGE_KEY);
    if (data !== null) {
      return JSON.parse(data) as Car[];
    }
    // if empty save and return default mocks (<1s)
    await storeCars(mockCars);
    return mockCars;
  } catch (e) {
    console.error('Error reading cars from cache:', e);
    return mockCars;
  }
};

// optional data cleaning
export const clearCarCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CARS_STORAGE_KEY);
  } catch (e) {
    console.error('Error while deleting cache:', e);
  }
};