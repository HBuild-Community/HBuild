import { NchatsService } from './../../services/nchats.service';
import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { CacheUser } from './../../cache/cache-user';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: User;
  cover: string;
  show: boolean = false;
  user:User;

  @Input() have: string;

  slideOpts: {};

  constructor(
    private profileService:ProfileService,
    private router:Router,
    private chatsService:NchatsService,
  ) {
    
   }

  ngOnInit() {

    if(this.have == "true"){
      console.log("Es true");
      this.user = CacheUser.user;
    }else{
      console.log("Es false");
      this.profileService.$getObjectSource
      .subscribe(user => this.user = user);
    }

    setTimeout( () => {
      this.usuario = {
        correo: '',
        password: '',
        imagen: '../../assets/exampleprofile.jpg'
      };
      this.cover = '../../assets/examplecover.jpg'
      this.show = true;
      console.log(this.usuario);
    }, 1500);
    
    this.slideOpts = {
      slidesPerView: 'auto',
      zoom: false,
      grabCursor: true
    }
  }

  refresh(event){
    this.user = CacheUser.user;
    setTimeout(()=>{
      event.target.complete();
    },2000);
  }

  irChat(user:User){
    this.chatsService.sendObjectData(user);
    this.router.navigate(['chats-uno']);
  }

}
