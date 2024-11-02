import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, private localS : LocalStorageService, private alertController: AlertController) { }

  nombreUser: string = '';
  telefonoUser: string = '';
  correoUser: string = '';

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab3.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs>tab3 es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs>tab3.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs>tab3 ya no es visible.');
  }
  
  ngOnInit() {
    const usuario = this.localS.ObtenerDato('user');
      if (usuario) {
        this.nombreUser = usuario.Nom_User;
        this.correoUser = usuario.Correo_User;
        this.telefonoUser = usuario.Celular_User;
      } else {
        console.warn('No se encontró información del usuario en el LocalStorage.');
      }
  }

  cargarDatosUsuario() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  logOut(){
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }

  deleteAccount(){
    this.presentAlert("Lamentamos tu partida","Su cuenta ha sido eliminada.");
    this.localS.LimpiarDato();
    console.log('datos limpiados');
    this.router.navigate(['./login']);
  }

}
