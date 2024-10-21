import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs>tab4.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs>tab4 es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs>tab4.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs>tab4 ya no es visible.');
  }

  ngOnInit() {
  }

}
