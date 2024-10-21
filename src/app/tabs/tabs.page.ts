import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  mailuser: string="";

  constructor(private route: ActivatedRoute) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Preparando la vista de tabs.');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter: La vista de tabs es visible.');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave: Saliendo de la vista de tabs.');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave: La vista de tabs ya no es visible.');
  }

  ngOnInit() {
  }

}
