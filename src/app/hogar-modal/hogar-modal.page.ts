import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-hogar-modal',
  templateUrl: './hogar-modal.page.html',
  styleUrls: ['./hogar-modal.page.scss'],
})
export class HogarModalPage implements OnInit {

  constructor(private modalController: ModalController,
              private localS: LocalStorageService,
              private firestoreService: FirestoreService,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
