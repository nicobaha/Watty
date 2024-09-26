import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute) { }

  NomUser: string = ('Claudia Alves');
  mailuser: string='';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mailuser = params['mailuser'];
      console.log('mailuser:', this.mailuser);
    });
  }

  logOut(){
    this.router.navigate(['./login']);
  }

}
