import { Router } from '@angular/router';
import { User } from './../../models/user';
import { CacheUser } from './../../cache/cache-user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.page.html',
  styleUrls: ['./first-login.page.scss'],
})
export class FirstLoginPage implements OnInit {

  nombre:'';
  apellidos:'';
  telefono:'';
  locacion:'';
  oficio:'';
  

  constructor(
    private router:Router,
    private authService:AuthService,
  ) { }

  ngOnInit() {
  }

  onFirstLogin(){
    let user:User;
    user = CacheUser.user;
    user.nombre = this.nombre;
    user.apellidos = this.apellidos;
    user.telefono = this.telefono;
    user.locacion = this.locacion;
    user.oficio = this.oficio;
    this.authService.updateUser(user)
    .then(response => {
      console.log(response);
      this.router.navigate(['/menu']);
    });
  }

}
