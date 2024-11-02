import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';;

@Component({
  selector: 'app-detalle-ambiente',
  templateUrl: './detalle-ambiente.page.html',
  styleUrls: ['./detalle-ambiente.page.scss'],
})
export class DetalleAmbientePage implements OnInit {

  ambienteId: string = ''; 
  electrodomesticos: any[] = []; 

  constructor(
    private localS: LocalStorageService
  ) {}

  ngOnInit() {
  }
}
