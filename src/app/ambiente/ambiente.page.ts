import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {

  tiposAmbiente: any[] = [];
  ambienteSeleccionado: number = 0; 
  nombrePersonalizado: string = '';
  idUser: number =0 ; 

  constructor(
    private modalController: ModalController,
    private dbService: DatabaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.dbService.CargarTipoAmbiente().subscribe((data) => {
      this.tiposAmbiente = data; 
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.idUser = user?.Id_User || null;
    console.log('Id_User obtenido:', this.idUser);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  guardarAmbiente() {
    if (!this.nombrePersonalizado || !this.ambienteSeleccionado || !this.idUser) {
      this.presentAlert('Error', 'Por favor complete todos los campos.');
      return;
    }
  
    const nuevoAmbiente = {
      Nombre_Ambiente: this.nombrePersonalizado,
      Id_User: this.idUser,
      Id_TipoAmb: this.ambienteSeleccionado
    };
  
    this.dbService.insertarAmbiente(nuevoAmbiente).subscribe(
      () => {
        this.presentAlert('Éxito', 'Ambiente guardado con éxito');
        this.dismissModal(); // Cerrar el modal después de guardar
      },
      (error) => {
        console.error('Error al guardar el ambiente:', error);
        this.presentAlert('Error', 'No se pudo guardar el ambiente.');
      }
    );
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
