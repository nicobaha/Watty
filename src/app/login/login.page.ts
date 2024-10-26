import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { FirestoreService } from '../services/firestore.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mailuser: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword = false; 

  constructor(private router: Router, private alertController: AlertController,  private localS : LocalStorageService, private firestoreService: FirestoreService,) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de Login.');
    const rememberMeData = this.localS.ObtenerDato('usuario');
    if (rememberMeData && rememberMeData.mailuser && rememberMeData.password) {
      this.mailuser = rememberMeData.mailuser;
      this.password = rememberMeData.password;
      this.rememberMe = true;
      console.log('Datos de usuario cargados:', rememberMeData);
    } else {
      // En caso de que no haya datos o estén incompletos
      this.mailuser = '';
      this.password = '';
      this.rememberMe = false;
      console.log('No se encontraron datos de usuario en LocalStorage.');
    }
  }

  // Se ejecuta cuando la vista ya es completamente visible
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de Login es visible.');
  }

  // Se ejecuta antes de que la vista comience a salir
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de Login.');
  }

  // Se ejecuta después de que la vista ya no es visible
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de Login ya no es visible.');
  }
  
  ngOnInit() {
  }

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

  login() {
    if (!this.validarCampos()) return;

    this.firestoreService.verificarUsuario(this.mailuser, this.password).subscribe(valido => {
      if (valido) {
        // Guardar el correo en LocalStorage
        this.localS.GuardarDato('correo', this.mailuser);

        if (this.rememberMe) {
          this.localS.GuardarDato('usuario', { mailuser: this.mailuser, password: this.password });
        } else {
          this.localS.ElimnarDato('usuario');
        }

        localStorage.setItem('isAuthenticated', 'true');
        console.log('Usuario autenticado correctamente');
        this.router.navigate(['/tabs']); // Navegar a la página principal
      } else {
        this.presentAlert('Error', 'Correo o contraseña incorrectos.');
      }
    }, error => {
      console.error('Error al autenticar:', error);
      this.presentAlert('Error', 'Ocurrió un problema al intentar iniciar sesión.');
    });
  }

  validarCampos(): boolean {
    if (!this.mailuser || !this.password) {
      this.presentAlert('Error', 'Por favor ingrese su correo y contraseña.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('Error', 'El correo es inválido.');
      return false;
    }

    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert('Error', 'Contraseña inválida.');
      return false;
    }

    return true;
  }

  signup() {
    this.router.navigate(['./register']);
  }

  recover() {
    this.router.navigate(['./recover-pw']);
  }
}