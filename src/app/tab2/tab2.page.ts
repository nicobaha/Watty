import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { AgregarEditarArtefactoComponent } from '../agregar-editar-artefacto/agregar-editar-artefacto.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  capturedImage: string | undefined;
  appliances: any[] = []; // Array para almacenar los artefactos

  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Datos resumen
  totalKw = 0;
  costPerMonth = 0;
  totalCost = 0;
  monthlyFixedCost = 1290; // Costo fijo mensual en pesos

  constructor(private modalController: ModalController, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.cargarArtefactos();
  }

  cargarArtefactos() {
    this.firestoreService.obtenerArtefactos().subscribe(artefactos => {
      console.log('Artefactos obtenidos:', artefactos); // Verifica los datos en la consola
      
      // Calculate kWh and cost for each appliance and store in the array
      this.appliances = artefactos.map(artefacto => {
        const kWh = (artefacto.pot_artefacto * artefacto.cant_artefacto * artefacto.hrsest_artefacto * artefacto.diasest_artefacto) / 1000;
        const costPerHour = kWh * 0.15; // Assuming $0.15 per kWh
        const costPerMonth = costPerHour * 24 * 30;
        
        return {
          ...artefacto,
          kWh: kWh.toFixed(2), // Format to 2 decimals
          costPerHour: costPerHour.toFixed(2),
          costPerMonth: costPerMonth.toFixed(2)
        };
      });

      this.calcularResumen();
    });
  }

  calcularResumen() {
    // Calculate total kWh and monthly cost based on individual appliance data
    this.totalKw = this.appliances.reduce((total, appliance) => total + parseFloat(appliance.kWh), 0);
    this.costPerMonth = this.appliances.reduce((total, appliance) => total + parseFloat(appliance.costPerMonth), 0);
    
    // Include fixed cost in the total
    this.totalCost = this.costPerMonth + this.monthlyFixedCost;
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

  async openCamera() {
    try {
      const permissions = await Camera.requestPermissions();
      if (permissions.camera !== 'granted') {
        console.error('Permiso de cámara denegado');
        return;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
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
