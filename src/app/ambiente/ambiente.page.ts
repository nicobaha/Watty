import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {

  constructor(private modalController: ModalController, private localS: LocalStorageService) { }
  nombreAmbiente: string = '';

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  guardarAmbiente() {
    if (this.nombreAmbiente) {
      console.log('Nombre del ambiente:', this.nombreAmbiente);
      this.localS.GuardarDato('Ambiente', this.nombreAmbiente);
      this.dismissModal();
    } else {
      alert('Por favor, ingresa el nombre del ambiente.');
    }
  }

}
