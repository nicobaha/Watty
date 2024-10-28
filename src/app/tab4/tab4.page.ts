import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HogarModalPage } from '../hogar-modal/hogar-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private router : Router, private modalController: ModalController) { }

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
