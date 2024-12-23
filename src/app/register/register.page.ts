import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

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

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DatabaseService,
  ) {}

  ngOnInit() {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Registro después de validar correo y RUT
  async SingUp() {
    // Validar si todos los campos están llenos
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword) {
      this.presentAlert('Error','Faltan rellenar campos.');
      return;
    }

    // Validar Nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Error', 'Ingrese su nombre correctamente.');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Error','Ingrese un RUT válido.');
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
      this.presentAlert('Error','La contraseña debe tener mínimo 4 caracteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar si los términos y condiciones han sido aceptados
    if (!this.AceptaCondiciones) {
      this.presentAlert('Error','Debe aceptar los términos y condiciones.');
      return;
    }

    try {
      // Llamada al servicio para registrar al usuario
      await this.dbService.registerUser(this.rut, this.nombre, this.mailuser, this.password, this.celular).toPromise();
      this.presentAlert('¡Felicidades!','Usuario registrado con éxito.');
      this.rut = '';
      this.nombre = '';
      this.mailuser = '';
      this.celular= '';
      this.password = '';
      this.ConfirmPassword = '';
      this.router.navigate(['./login']);
    } catch (error) {
      this.presentAlert('Error', 'No se pudo registrar el usuario.');
    }
  }
}
