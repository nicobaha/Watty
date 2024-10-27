import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AmbienteModalPage } from '../ambiente-modal/ambiente-modal.page';
import { ModalController } from '@ionic/angular';

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
    private localS: LocalStorageService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: AmbienteModalPage,
      cssClass: 'small-modal',  // Asegúrate de que esta clase sea la misma que usaremos en los estilos.
      backdropDismiss: true     // Opción para cerrar tocando fuera del modal.
    });
    return await modal.present();
  }

}
