import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-hogar-modal',
  templateUrl: './hogar-modal.page.html',
  styleUrls: ['./hogar-modal.page.scss'],
})
export class HogarModalPage implements OnInit {

  nombrePersonalizado: string = ''; 

  constructor(private modalController: ModalController,
              private localS: LocalStorageService,
              private firestoreService: FirestoreService,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async guardarAmbiente() {
    const correo = this.localS.ObtenerDato('correo'); // Obtener correo del usuario
  
    if (!this.nombrePersonalizado) {
      this.presentAlert('Error', 'Debe ingresar el nombre del ambiente.');
      return;
    }
  
    try {
      // Obtener el RUT del usuario por su correo
      const usuario = await this.firestoreService.obtenerUsuarioPorCorreo(correo).toPromise();
  
      if (!usuario || !usuario.rut) {
        this.presentAlert('Error', 'No se encontró el usuario o su RUT.');
        return;
      }
  
      const nuevoAmbiente = {
        NombreAmbiente: this.nombrePersonalizado,
        fechaCreacion: new Date(),
        TotalW: 0, // Inicialmente el consumo es 0
      };
  
      // Guardar el nuevo ambiente
      await this.firestoreService.agregarAmbiente(usuario.rut, nuevoAmbiente);
  
      this.presentAlert('Éxito', 'Ambiente agregado correctamente.');
      this.dismissModal();
      this.nombrePersonalizado = ''; // Limpiar el campo
    } catch (error) {
      console.error('Error al guardar el ambiente:', error);
      this.presentAlert('Error', 'Ocurrió un problema al guardar el ambiente.');
    }
  }
  
}
