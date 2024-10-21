import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  rut: string = '';
  mailuser: string = '';
  celular: string = '';
  password: string = '';
  ConfirmPassword: string = '';
  showPassword = false;
  AceptaCondiciones: boolean = false;

  constructor(private router: Router, private alertController: AlertController, private localS : LocalStorageService) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de register.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de register es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de register.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de register ya no es visible.');
  }
  
  ngOnInit() {}
  

  // Método que permite mostrar una alerta.
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword; // Alternar entre mostrar/ocultar
  }

  // Método de validación del formulario
  SingUp() {
    // Validar si todos los campos están llenos
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword) {
      this.presentAlert('Error','Faltan rellenar campos');
      return;
    }

    // Validar Nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Error','Ingrese su nombre correctamente.');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Error','Ingrese un rut válido.');
      return;
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('Error','El correo es inválido.');
      return;
    }

    // Validar el formato del número de celular
    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(this.celular)) {
      this.presentAlert('Error','Número de celular inválido.');
      return;
    }

    // Validar la contraseña
    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert('Error','La contraseña debe tener mínimo 8 carácteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Error','Las contraseñas no coinciden.');
      return;
    }

    // Validar si los términos y condiciones ha sido aceptado
    if (!this.AceptaCondiciones) {
      this.presentAlert('Para continuar','Debe aceptar los términos y condiciones.');
      return;
    }

    //Constante que tendrá todos las variables que quiero guardar.
    const datosUsuario = {
      nombre: this.nombre,
      rut: this.rut,
      mailuser: this.mailuser,
      celular: this.celular,
      password: this.password,
    };

    // Si todo está correcto, navega a la página de login
    this.localS.GuardarDato('Usuario', datosUsuario);
    // Obtener el usuario registrado (Prueba)
    console.log("usuario registrado...")
    this.presentAlert('¡Felicidades!','¡Usuario Registrado con Exito!');
    this.router.navigate(['./login']);
    // Limpiará los campos.
    this.nombre = '';
    this.rut = '';
    this.mailuser = '';
    this.celular = '';
    this.password = '';
    this.ConfirmPassword = '';
    this.AceptaCondiciones = false;
  }
}
