import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
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
    private firestoreService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarTiposDeAmbiente();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  // Cargar los tipos de ambiente desde Firestore
  cargarTiposDeAmbiente() {
    this.firestoreService.obtenerTiposDeAmbiente().subscribe(ambientes => {
      this.tiposAmbiente = ambientes;
      console.log('Tipos de ambiente:', ambientes);
    });
  }

  // Guardar el ambiente como subcolección del usuario
  async guardarAmbiente() {
    const correo = this.localS.ObtenerDato('correo'); // Obtener correo del usuario
  
    if (!this.ambienteSeleccionado || !this.nombrePersonalizado) {
      this.presentAlert('Error', 'Debe completar todos los campos.');
      return;
    }
  
    try {
      // Obtener el usuario para recuperar su RUT
      const usuario = await this.firestoreService.obtenerUsuarioPorCorreo(correo).toPromise();
  
      if (!usuario || !usuario.rut) {
        this.presentAlert('Error', 'No se encontró el usuario o su RUT.');
        return;
      }
  
      // Crear el objeto del ambiente con nombre y fecha
      const ambiente = {
        NombreAmbiente: this.tiposAmbiente.find(a => a.id === this.ambienteSeleccionado)?.Nombre_TipoAmb || '',
        NombrePer_Ambiente: this.nombrePersonalizado,
        fechaCreacion: new Date(),
      };
  
      // Guardar el ambiente en la subcolección del usuario usando su RUT
      await this.firestoreService.agregarAmbienteParaUsuario(usuario.rut, ambiente);
  
      this.presentAlert('Éxito', 'Ambiente guardado correctamente.');
  
      // Limpiar los campos y cerrar el modal
      this.nombrePersonalizado = '';
      this.ambienteSeleccionado = '';
      this.dismissModal();
    } catch (error) {
      console.error('Error al guardar el ambiente:', error);
      this.presentAlert('Error', 'Ocurrió un problema al guardar el ambiente.');
    }
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
