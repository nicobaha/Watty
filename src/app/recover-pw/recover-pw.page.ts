import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover-pw',
  templateUrl: './recover-pw.page.html',
  styleUrls: ['./recover-pw.page.scss'],
})
export class RecoverPWPage implements OnInit {

  rut: string = '';
  mailuser: string = '';
  showPassword = false;
  AceptaCondiciones: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de recover-pw.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de recover-pw es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de recover-pw.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de recover-pw ya no es visible.');
  }

  ngOnInit() {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  RecoverPW() {
    // Validar si todos los campos están llenos
    if (!this.rut || !this.mailuser) {
      this.presentAlert('Faltan rellenar campos');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Ingrese un rut válido.');
      return;
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('El correo es inválido.');
      return;
    }

    // Si todo está correcto, navega a la página de login
    this.router.navigate(['./login']);
    this.rut = '';
    this.mailuser = '';
    this.AceptaCondiciones = false;
  }

}
