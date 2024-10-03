import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, private localstorage : LocalStorageService) { }

  mailuser: string='';
  NomUser: string = ('Claudia Alves');
  
  ngOnInit() {
    this.mailuser = this.localstorage.ObtenerDato('mailuser') || 'No obtubo el correo'
    console.log('datos obtenidos', this.mailuser);
  }

  logOut(){
    this.localstorage.LimpiarDato();
    console.log('datos limpiados');
    this.router.navigate(['./login']);
  }

}
