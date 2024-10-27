import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HogarModalPage } from '../hogar-modal/hogar-modal.page';
import { FirestoreService } from '../services/firestore.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  ambientes: any[] = [];
  rutUsuario: string = ''; 

  constructor(private router : Router, 
              private modalController: ModalController, 
              private firestoreService: FirestoreService,
              private localS : LocalStorageService) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab4.');
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
    const correo = this.localS.ObtenerDato('correo'); // Obtener correo del usuario
    this.firestoreService.obtenerUsuarioPorCorreo(correo).subscribe(usuario => {
      if (usuario && usuario.rut) {
        this.rutUsuario = usuario.rut;
        this.cargarAmbientes(); // Cargar ambientes del usuario
      } else {
        console.warn('No se encontró el RUT del usuario.');
      }
    });
  }

  cargarAmbientes() {
    this.firestoreService.obtenerAmbientesUsuario(this.rutUsuario).subscribe(ambientes => {
      this.ambientes = ambientes; // Almacenar los ambientes obtenidos
      console.log('Ambientes cargados:', ambientes);
    });
  }


  async abrirModal() {
    const modal = await this.modalController.create({
      component: HogarModalPage,
      cssClass: 'small-modal',  // Asegúrate de que esta clase sea la misma que usaremos en los estilos.
      backdropDismiss: true     // Opción para cerrar tocando fuera del modal.
    });
    return await modal.present();
  }

  DetalleAmbiente(){
    this.router.navigate(['./ambiente']);
  }

}
