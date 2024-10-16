// src/app/services/tuya.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class TuyaService {
  private readonly API_URL = 'https://openapi.tuya.com';

  constructor() {}

  // Ejemplo: Obtener lista de dispositivos
  async getDevices() {
    try {
      const response = await axios.get(`${this.API_URL}/devices`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener dispositivos:', error);
      throw error;
    }
  }

  // Puedes agregar más métodos aquí según tus necesidades
}
