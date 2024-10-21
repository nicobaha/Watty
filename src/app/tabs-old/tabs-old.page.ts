import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-old',
  templateUrl: './tabs-old.page.html',
  styleUrls: ['./tabs-old.page.scss'],
})
export class TabsOldPage implements OnInit {

  constructor() { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs-old.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs-old es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs-old.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs-old ya no es visible.');
  }

  ngOnInit() {
  }

}
