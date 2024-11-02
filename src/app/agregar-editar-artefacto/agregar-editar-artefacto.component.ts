import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  artefactos: Artefacto[] = [];
  selectedArtefacto: string = '';
  potencia: number | null = null;
  cantidad: number | null = null;
  usoEstimado: number | null = null;
  diasEstimados: number | null = null;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
