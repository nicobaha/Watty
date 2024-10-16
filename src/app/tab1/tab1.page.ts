import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TuyaService } from '../services/tuya.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  

  ledStatus: string = 'Desconocido';

  ngOnInit(): void{
  }

  Texts:String = 'Bienvenido a Watty';

  constructor(private alertController: AlertController, private router : Router) {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Hey! Este electrodoméstico debería ser desconectado.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  tutorial(){
    this.router.navigate(['/tutorial'])
  }

  inicioApp(){
    this.router.navigate(['/tabs/tab1']);
  }

  volver(){
    this.router.navigate(['/tabs-old/tab1']);
  }
}
