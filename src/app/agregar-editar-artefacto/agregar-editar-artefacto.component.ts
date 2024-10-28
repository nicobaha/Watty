import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { ChangeDetectorRef } from '@angular/core';

interface Artefacto {
  nom_artefacto: string;
  pot_artefacto: number;
  cant_artefacto: number;
  hrsest_artefacto: number;
  diasest_artefacto: number;
}

@Component({
  selector: 'app-agregar-editar-artefacto',
  templateUrl: './agregar-editar-artefacto.component.html',
  styleUrls: ['./agregar-editar-artefacto.component.scss'],
})
export class AgregarEditarArtefactoComponent implements OnInit {
  @Input() modo: 'agregar' | 'editar' = 'agregar';
  @Input() artefacto: Artefacto | null = null;

  artefactos: Artefacto[] = [];
  selectedArtefacto: string = '';
  potencia: number | null = null;
  cantidad: number | null = null;
  usoEstimado: number | null = null;
  diasEstimados: number | null = null;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarArtefactos();
    if (this.modo === 'editar' && this.artefacto) {
      this.cargarDetalles(this.artefacto);
    }
  }

  cargarArtefactos() {
    this.isLoading = true;
    this.firestoreService.obtenerArtefactos().subscribe(
      (artefactos) => {
        console.log('Artefactos obtenidos:', artefactos);
        this.artefactos = artefactos;
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al cargar artefactos:', error),
      () => (this.isLoading = false)
    );
  }

  onArtefactoChange(event: any) {
    const nom_artefacto = event.detail.value;
    const artefactoSeleccionado = this.artefactos.find(
      (artefacto) => artefacto.nom_artefacto === nom_artefacto
    );

    if (artefactoSeleccionado) {
      this.potencia = artefactoSeleccionado.pot_artefacto;
      this.cantidad = artefactoSeleccionado.cant_artefacto;
      this.usoEstimado = artefactoSeleccionado.hrsest_artefacto;
      this.diasEstimados = artefactoSeleccionado.diasest_artefacto;
    } else {
      this.potencia = null;
      this.cantidad = null;
      this.usoEstimado = null;
      this.diasEstimados = null;
    }
  }

  cargarDetalles(artefacto: Artefacto) {
    const {
      nom_artefacto,
      pot_artefacto,
      cant_artefacto,
      hrsest_artefacto,
      diasest_artefacto,
    } = artefacto;

    this.selectedArtefacto = nom_artefacto;
    this.potencia = pot_artefacto;
    this.cantidad = cant_artefacto;
    this.usoEstimado = hrsest_artefacto;
    this.diasEstimados = diasest_artefacto;
  }

  async guardarArtefacto() {
    const nuevoArtefacto: Artefacto = {
      nom_artefacto: this.selectedArtefacto,
      pot_artefacto: this.potencia ?? 0,
      cant_artefacto: this.cantidad ?? 0,
      hrsest_artefacto: this.usoEstimado ?? 0,
      diasest_artefacto: this.diasEstimados ?? 0,
    };

    try {
      await this.firestoreService.agregarArtefacto(nuevoArtefacto);
      this.dismissModal();
    } catch (error) {
      console.error('Error al guardar el artefacto:', error);
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
