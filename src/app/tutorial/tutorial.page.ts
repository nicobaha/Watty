import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor() { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tutorial.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tutorial es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tutorial.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tutorial ya no es visible.');
  }

  ngOnInit() {
  }

}
