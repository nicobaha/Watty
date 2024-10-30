import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-detalle-ambiente',
  templateUrl: './detalle-ambiente.page.html',
  styleUrls: ['./detalle-ambiente.page.scss'],
})
export class DetalleAmbientePage implements OnInit {

  ambienteId: string = ''; 
  electrodomesticos: any[] = []; 

  constructor(
    private localS: LocalStorageService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.ambienteId = this.localS.ObtenerDato('ambienteId'); // Recuperar el ID desde LocalStorage
    console.log('ID del Ambiente recuperado:', this.ambienteId);

    if (this.ambienteId) {
      this.cargarElectrodomesticos(); // Si el ID es válido, cargar los electrodomésticos
    } else {
      console.warn('No se encontró un ID válido en LocalStorage.');
    }
  }

  cargarElectrodomesticos() {
    this.firestoreService
      .obtenerElectrodomesticosPorAmbiente(this.ambienteId)
      .subscribe((electros) => {
        this.electrodomesticos = electros; // Almacenar los electrodomésticos obtenidos
        console.log('Electrodomésticos cargados:', electros);
      }, (error) => {
        console.error('Error al cargar los electrodomésticos:', error);
      });
  }
}
