// src/app/services/tuya.service.ts
import axios from 'axios';
import * as crypto from 'crypto-js';

const ACCESS_ID = 'rgmhqd4mgvcwtucc5y49';
const ACCESS_SECRET = '35c6bd6aae5e4f43be9371983cb81f05';
const BASE_URL = 'https://openapi.tuyaus.com/v1.0';
const DEVICE_ID = 'ebdc821cecd2a55a3bfugw';

export class TuyaService {
  private static token: string = '';

  // Método para obtener el token de acceso
  static async getAccessToken(): Promise<string> {
    if (this.token) return this.token;

    const timestamp = Date.now().toString();
    const sign = this.generateSign(timestamp);

    try {
      const response = await axios.post(`${BASE_URL}/token`, null, {
        headers: {
          'client_id': ACCESS_ID,
          'sign': sign,
          't': timestamp,
          'sign_method': 'HMAC-SHA256',
        },
      });

      this.token = response.data.result.access_token || '';
      return this.token;
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error);
      throw error;
    }
  }

  // Generar firma para las peticiones
  private static generateSign(timestamp: string): string {
    const stringToSign = ACCESS_ID + timestamp;
    return crypto.HmacSHA256(stringToSign, ACCESS_SECRET).toString(crypto.enc.Hex);
  }

  // Método para obtener el estado del LED
  static async getDeviceStatus(): Promise<boolean> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const status = response.data.result.find((item: any) => item.code === 'switch_led');
      return status ? status.value : false;
    } catch (error) {
      console.error('Error al obtener el estado del dispositivo:', error);
      throw error;
    }
  }

  // **Nuevo Método**: Cambiar el estado del LED
  static async setDeviceState(isOn: boolean): Promise<void> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${BASE_URL}/devices/${DEVICE_ID}/commands`,
        {
          commands: [{ code: 'switch_led', value: isOn }],
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Comando enviado con éxito:', response.data);
    } catch (error) {
      console.error('Error al cambiar el estado del dispositivo:', error);
      throw error;
    }
  }
} 