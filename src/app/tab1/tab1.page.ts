import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ngOnInit(): void{
  }

  Texts:String = 'Bienvenido a Watty';

  constructor(private alertController: AlertController) {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Hey! Este electrodoméstico debería ser desconectado.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
