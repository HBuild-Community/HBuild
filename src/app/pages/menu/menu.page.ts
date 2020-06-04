import { CacheUser } from './../../cache/cache-user';
import { User } from './../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user:User;

  @ViewChild(IonTabs,{static:false}) tabs:IonTabs;
  constructor(

  ) 
  { 
    this.user = CacheUser.user;
  }
    
  ngOnInit() {
    console.log(this.tabs);
    
  }


}
