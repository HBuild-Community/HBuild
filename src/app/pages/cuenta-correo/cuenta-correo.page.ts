import { NavController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { CacheUser } from './../../cache/cache-user';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cuenta-correo',
  templateUrl: './cuenta-correo.page.html',
  styleUrls: ['./cuenta-correo.page.scss'],
})
export class CuentaCorreoPage implements OnInit {

  user:User;


  constructor(
    private authService:AuthService,
    private navCtrl:NavController,
  ) 
  {
    this.user = CacheUser.user;
  }

  ngOnInit() {
  }

  editCorreo(){
    this.authService.updateUser(this.user)
    .then(response => {
      this.navCtrl.back();
    })
  }

}
