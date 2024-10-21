import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Verá el historial de navegación.

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {

  constructor(private router : Router, private loc : Location) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de e404.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de e404 es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de e404.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de e404 ya no es visible.');
  }

  ngOnInit() {
  }

  volver(){
    this.loc.back();
  }

}
