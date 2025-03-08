import axios from 'axios';
import { WeatherInfo } from '../types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherInfo = async (city: string): Promise<WeatherInfo> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    return {
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
    };
  } catch (error) {
    throw new Error('Failed to fetch weather information');
  }
}; 