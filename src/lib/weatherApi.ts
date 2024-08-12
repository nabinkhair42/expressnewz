// src/utils/weatherApi.ts
import toast, { Toaster } from 'react-hot-toast';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // Ensure you have this key in .env.local
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error:any) {
    toast.error('Error fetching weather data:', error);
    return null;
  }
};
