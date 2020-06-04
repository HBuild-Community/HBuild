import { CacheUser } from './../../cache/cache-user';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  user:User;

  constructor() 
  {
    this.user = CacheUser.user;
  }

  ngOnInit() {
  }

}
