import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '71129463592acf083581adec02139077';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {}

  async getWeather(city: string) {
    try {
      const response = await axios.get(`${this.apiUrl}`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric' // Configura las unidades a métrico para °C
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      throw error;
    }
  }
}