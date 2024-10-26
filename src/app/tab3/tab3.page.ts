import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, private localstorage : LocalStorageService, private alertController: AlertController, private firestoreService: FirestoreService,) { }

  nombre: string = '';
  mailuser: string='';
  celular: string = '';

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
    const correo = this.localstorage.ObtenerDato('correo'); // Obtener el correo del LocalStorage
    console.log('Correo encontrado en LocalStorage:', correo);

    if (correo) {
      this.cargarDatosUsuario(correo); // Cargar los datos del usuario desde Firestore
    } else {
      console.warn('No se encontró un correo en LocalStorage.');
    }
  }

  cargarDatosUsuario(correo: string) {
    this.firestoreService.obtenerUsuarioPorCorreo(correo).subscribe(usuario => {
      if (usuario) {
        this.nombre = usuario.nombre || '';
        this.mailuser = usuario.mailuser || '';
        this.celular = usuario.celular || '';
        console.log('Datos del usuario cargados:', usuario);
      } else {
        console.warn('No se encontraron datos del usuario.');
        this.presentAlert('Error', 'No se encontraron datos del usuario.');
        this.router.navigate(['/login']);
      }
    }, error => {
      console.error('Error al cargar los datos del usuario:', error);
      this.presentAlert('Error', 'Ocurrió un problema al cargar los datos del usuario.');
    });
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
    this.localstorage.LimpiarDato();
    console.log('datos limpiados');
    this.router.navigate(['./login']);
  }

}
