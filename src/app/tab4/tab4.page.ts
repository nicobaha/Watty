import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AmbientePage } from '../ambiente/ambiente.page';
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
  }

  cargarAmbientes() {
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: AmbientePage,
      cssClass: 'small-modal',  // Asegúrate de que esta clase sea la misma que usaremos en los estilos.
      backdropDismiss: true     // Opción para cerrar tocando fuera del modal.
    });
    return await modal.present();
  }

  DetalleAmbiente(id: string) {
  }
  

}
