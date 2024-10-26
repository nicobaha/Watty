import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import firebase from 'firebase/compat/app'; // Importa Firebase App

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
    private firestoreService: FirestoreService
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
    if (!this.validarFormulario()) return;

    // Verificar si el correo o RUT ya existen en Firestore
    this.firestoreService.verificarCorreoYRut(this.mailuser, this.rut).subscribe(async (existe) => {
      if (existe) {
        this.presentAlert('Error', 'El correo o RUT ya están registrados. Usa otros datos.');
      } else {
        // Procede con el registro del usuario si no hay conflictos
        const datosUsuario = {
          nombre: this.nombre,
          rut: this.rut,
          mailuser: this.mailuser,
          celular: this.celular,
          password: this.password,
          fechaCreacion: firebase.firestore.Timestamp.now(),
        };

        try {
          await this.firestoreService.registrarUsuario(this.rut, datosUsuario);
          this.presentAlert('¡Felicidades!', '¡Usuario Registrado con Éxito!');
          this.router.navigate(['./login']);
          this.limpiarCampos();
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
          this.presentAlert('Error', 'Hubo un problema al registrar el usuario.');
        }
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword) {
      this.presentAlert('Error', 'Faltan rellenar campos');
      return false;
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Error', 'Ingrese su nombre correctamente.');
      return false;
    }

    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Error', 'Ingrese un RUT válido.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('Error', 'El correo es inválido.');
      return false;
    }

    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(this.celular)) {
      this.presentAlert('Error', 'Número de celular inválido.');
      return false;
    }

    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert('Error', 'La contraseña debe tener mínimo 4 y máximo 8 caracteres.');
      return false;
    }

    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return false;
    }

    if (!this.AceptaCondiciones) {
      this.presentAlert('Para continuar', 'Debe aceptar los términos y condiciones.');
      return false;
    }

    return true;
  }

  limpiarCampos() {
    this.nombre = '';
    this.rut = '';
    this.mailuser = '';
    this.celular = '';
    this.password = '';
    this.ConfirmPassword = '';
    this.AceptaCondiciones = false;
  }
}
