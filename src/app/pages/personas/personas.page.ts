import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {

  show: boolean = true;
  users:User[];

  constructor(
    private authService:AuthService,
    private profileService:ProfileService,
    private router:Router,
  ) 
  { 
    this.obtenerUsuarios();
  }

  ngOnInit() {
    setTimeout( () => {
      this.show = false;
    }, 1500);
  }

  obtenerUsuarios(){
    this.authService.getUsers()
    .subscribe(response => {
      console.log(response);
      this.users = response;
    });
  }

  irPerfil(user){
    this.profileService.sendObjectData(user);
    this.router.navigate(['profile']);
  }

  textoBuscar = '';

  buscar( event ){
    this.textoBuscar = event.detail.value;
    console.log('Se esta buscando en el filtro:');
    console.log(event.detail.value);
  }

}
