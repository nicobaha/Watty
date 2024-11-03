import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AmbientePage } from '../ambiente/ambiente.page';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  ambientes: any[] = [];
  isAlertOpen: boolean = false;
  alertMessage: string = '';

  constructor(private router : Router, 
              private modalController: ModalController,
              private alertController: AlertController,
              private localS : LocalStorageService,
              private dbService: DatabaseService) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab4.');
    this.cargarAmbientes();
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs>tab4 es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs>tab4.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs>tab4 ya no es visible.');
  }

  ngOnInit() {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cargarAmbientes() {
    const user = this.localS.ObtenerDato('user');
    
    // Extraer Id_User del usuario
    const Id_User = user?.Id_User;
  
    if (Id_User) {
      // Llamar al servicio con el Id_User
      this.dbService.CargarAmbientes(Id_User).subscribe(
        (data) => {
          console.log('Datos de ambientes recibidos:', data); 
          this.ambientes = data.ambientes;  // Asegúrate de que estás accediendo a la estructura correcta
        },
        (error) => {
          console.error('Error al obtener ambientes:', error);
          this.presentAlert('No se pudieron cargar los ambientes.');
        }
      );
    } else {
      console.error('No se encontró el Id_User del usuario.');
      this.presentAlert('No se pudo cargar el Id_User del usuario.');
    }
  }
  

  async abrirModal() {
    const modal = await this.modalController.create({
      component: AmbientePage,
      cssClass: 'small-modal',  // Asegúrate de que esta clase sea la misma que usaremos en los estilos.
      backdropDismiss: true     // Opción para cerrar tocando fuera del modal.
    });
    return await modal.present();
  }

  DetalleAmbiente() {
    this.router.navigate(['./detalle-ambiente']);
  }
  

}
