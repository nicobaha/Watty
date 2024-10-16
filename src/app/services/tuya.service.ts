import axios from 'axios';
import * as crypto from 'crypto-js';

const ACCESS_ID = 'rgmhqd4mgvcwtucc5y49';
const ACCESS_SECRET = '35c6bd6aae5e4f43be9371983cb81f05';
const BASE_URL = 'https://openapi.tuyaus.com/v1.0';
const DEVICE_ID = 'ebdc821cecd2a55a3bfugw';

export class TuyaService {
  private token: string = ''; // Token inicializado como string vacío

  constructor() {}

  // Obtener token de acceso
  async getAccessToken(): Promise<string> {
    if (this.token) return this.token;

    const timestamp = Date.now().toString();
    const sign = this.generateSign(timestamp);

    try {
      const response = await axios.post(`${BASE_URL}/token`, null, {
        headers: {
          'client_id': ACCESS_ID,
          'sign': sign,
          't': timestamp,
          'sign_method': 'HMAC-SHA256'
        }
      });

      this.token = response.data.result.access_token || ''; // Asignamos un string vacío en caso de null
      return this.token;
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
      throw error;
    }
  }

  // Generar firma
  private generateSign(timestamp: string): string {
    const stringToSign = ACCESS_ID + timestamp;
    return crypto.HmacSHA256(stringToSign, ACCESS_SECRET).toString(crypto.enc.Hex);
  }

  // Obtener el estado del dispositivo LED
  async getDeviceStatus(): Promise<boolean> {
    const token = await this.getAccessToken();
    try {
      const response = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Busca el estado de encendido/apagado en la respuesta
      const status = response.data.result.find((item: any) => item.code === 'switch_led');
      return status ? status.value : false;
    } catch (error) {
      console.error("Error al obtener el estado del dispositivo:", error);
      throw error;
    }
  }
}
