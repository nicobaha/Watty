import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mailuser: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isAlertOpen: boolean = false;
  alertMessage: string = '';
  showPassword = false; 

  constructor(private router: Router, private alertController: AlertController,  private localS : LocalStorageService) { }

  ngOnInit() {
  }

  // Método que permite mostrar una alerta.
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword; // Alternar entre mostrar/ocultar
  }

  login() {
    //Obtiene los datos del local Storage, en este caso obtiene Usuario que contiene todos sus datos.
    const datosUsuario = this.localS.ObtenerDato('Usuario');    

    // Validar si faltan tanto el correo como la contraseña
    if (!this.mailuser && !this.password) {
      this.presentAlert("Ingrese su correo y contraseña.");
      return;
    }

    // Validar si falta el correo
    if (!this.mailuser) {
      this.presentAlert("Ingrese un correo.");
      return;
    }

    // Validar si falta la contraseña
    if (!this.password) {
      this.presentAlert("Ingrese su contraseña.");
      return;
    }

    // Validar el formato del correo, i Servirá para no discriminar entre mayúsculas y minúsculas
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert("El correo es inválido.");
      return;
    }

    // Validar el tamaño de la contraseña
    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert("Contraseña inválida");
      return;
    }

    const mailuser = document.getElementById("mailuser");
    if (mailuser) {
        // código para manejar mailuser
    } else {
        console.error("mailuser no encontrado");
    }
    
    // Verificamos si datosUsuario es null o undefined
    if (!datosUsuario) {
      this.presentAlert("El usuario no está registrado.");
      console.log(this.mailuser, 'Error, no se encuentra en la BD');
      return; // Detenemos el proceso si no hay datos
    }

    // Aquí validamos las credenciales ingresadas en el formulario de login
    if (this.mailuser === datosUsuario.mailuser && this.password === datosUsuario.password) {
      // Si el correo y la contraseña coinciden, redirige al tab1
      this.router.navigate(['./tabs/tab1']);
      console.log("Usuario autenticado correctamente");
    } else if (this.mailuser === datosUsuario.mailuser && this.password !== datosUsuario.password) {
      // Si la contraseña no coincide, muestra error
      this.presentAlert("Contraseña incorrecta.");
      console.log("Contraseña incorrecta");
    }

  }

  //*Método que permite ir al "Registro"
  signup() {
    this.router.navigate(['./register']);
  }

  recover(){
    this.router.navigate(['./recover-pw']);
  }
}