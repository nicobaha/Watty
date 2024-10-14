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

  ngOnInit() {
  }

  volver(){
    this.loc.back();
  }

}
