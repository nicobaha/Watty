import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {

  tiposAmbiente: any[] = [];
  ambienteSeleccionado: string = ''; // ID del tipo de ambiente
  nombrePersonalizado: string = ''; 

  constructor(
    private modalController: ModalController,
    private localS: LocalStorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }



  // Mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  

}
