import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { TuyaService } from '../services/tuya.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  ledStatus: string = 'Desconocido';
  isLedOn: boolean = false;
  Texts: string = 'Bienvenido a Watty';
  public weatherData: any; // Variable para almacenar datos del clima

  constructor(
    private alertController: AlertController,
    private router: Router,
    private localS: LocalStorageService,
    private weatherService: WeatherService // Inyección de WeatherService
  ) {}

  ngOnInit(): void {}

  // Método para obtener el clima de una ciudad específica
  getWeatherForCity(city: any) {
    const cityName = city ? String(city) : 'Puerto Montt'; // Asigna "Puerto Montt" si no se proporciona una ciudad
    this.getWeather(cityName);
  }
  async getWeather(city: string | null | undefined) {
    const defaultCity = 'Puerto Montt';
    const cityToFetch = city || defaultCity; // Usa "Puerto Montt" si el valor de city es null o undefined
    
    try {
      this.weatherData = await this.weatherService.getWeather(cityToFetch);
      console.log(`Datos del clima para ${cityToFetch}:`, this.weatherData);
    } catch (error) {
      console.error('Error al obtener el clima:', error);
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab1.');
    this.refreshStatus(); // Verificamos el estado del dispositivo al entrar a la vista
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs>tab1 es visible.');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs>tab1.');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs>tab1 ya no es visible.');
  }

  // Método para refrescar el estado del LED
  async refreshStatus() {
    try {
      this.isLedOn = await TuyaService.getDeviceStatus();
      this.ledStatus = this.isLedOn ? 'Encendido' : 'Apagado';
      console.log('Estado del LED:', this.ledStatus);
    } catch (error) {
      console.error('Error al obtener el estado del LED:', error);
      this.ledStatus = 'Error al obtener estado';
    }
  }

  // Método para alternar el estado del LED (encender/apagar)
  async toggleLedState() {
    try {
      const newState = !this.isLedOn; // Cambiamos el estado al opuesto
      await TuyaService.setDeviceState(newState); // Enviamos el comando
      this.isLedOn = newState; // Actualizamos el estado localmente
      this.ledStatus = newState ? 'Encendido' : 'Apagado';
      console.log('LED cambiado a:', this.ledStatus);
    } catch (error) {
      console.error('Error al cambiar el estado del LED:', error);
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Hey! Este electrodoméstico debería ser desconectado.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  tutorial() {
    this.router.navigate(['/tutorial']);
  }

  inicioApp() {
    this.router.navigate(['/tabs/tab1']);
  }

  volver() {
    this.router.navigate(['/tabs-old/tab1']);
  }
}