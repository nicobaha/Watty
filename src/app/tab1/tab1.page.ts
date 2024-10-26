import { Component, OnInit } from '@angular/core';
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab1.');
    this.loadDeviceStatus(); // Verificamos el estado del dispositivo al entrar a la vista
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

  ngOnInit(): void {
    // Lógica que quieras añadir en la inicialización del componente
  }

  constructor(
    private alertController: AlertController,
    private router: Router,
    private localS: LocalStorageService
  ) {}

  async loadDeviceStatus() {
    try {
      this.isLedOn = await TuyaService.getDeviceStatus();
      this.ledStatus = this.isLedOn ? 'Encendido' : 'Apagado';
      console.log('Estado del LED:', this.ledStatus);
    } catch (error) {
      console.error('Error al obtener el estado del LED:', error);
      this.ledStatus = 'Error al obtener estado';
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