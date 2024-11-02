import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { AgregarEditarArtefactoComponent } from '../agregar-editar-artefacto/agregar-editar-artefacto.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Datos resumen
  totalKw = 0;
  costPerMonth = 0;
  totalCost = 0;
  monthlyFixedCost = 1290; // Costo fijo mensual en pesos

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.cargarArtefactos();
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab2.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs>tab2 es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs>tab2.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs>tab2 ya no es visible.');
  }

  cargarArtefactos() {
  }

  calcularResumen() {
  }

  async abrirAgregarEditarArtefacto(modo: 'agregar' | 'editar', artefacto?: any) {
    const modal = await this.modalController.create({
      component: AgregarEditarArtefactoComponent,
      componentProps: {
        modo: modo,
        artefacto: artefacto,
      },
    });
    await modal.present();
  }
}
