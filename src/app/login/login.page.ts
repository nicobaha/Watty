import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mailuser: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isAlertOpen: boolean = false;
  alertMessage: string = '';

  constructor(private router: Router,
    private alertController: AlertController,
    private dbService: DatabaseService, // Inyecta tu servicio
    private localS : LocalStorageService) { }
  
  ngOnInit() {
  }

  // Método que permite mostrar una alerta.
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  //Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword; // Alternar entre mostrar/ocultar
  }

  async login() {
    if (!this.mailuser || !this.password) {
      this.presentAlert('Por favor, complete todos los campos.');
      return;
    }
  
    try {
      const response: any = await this.dbService.loginUser(this.mailuser, this.password).toPromise();
      console.log('Respuesta recibida:', response); // Verifica la estructura completa de la respuesta
  
      if (response && response.user) {
        // Guardar los datos en localStorage
        this.localS.GuardarDato('user', response.user);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['./tabs/tab1']);
      } else {
        this.presentAlert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error: any) {
      if (error.status === 401) {
        this.presentAlert('Credenciales incorrectas o el usuario no existe en PlayTab.');
      } else {
        this.presentAlert('Error del servidor. Por favor intenta de nuevo más tarde :(');
      }
    }
  }

  signup() {
    this.router.navigate(['./register']);
  }

  recover() {
    this.router.navigate(['./recover-pw']);
  }
}