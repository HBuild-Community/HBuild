import { CacheUser } from './../../cache/cache-user';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  usuario: User;
  user:User;
  cover: string;
  show: boolean = false;
  slideOpts: {};

  constructor() {
     this.user = CacheUser.user;
   }

  ngOnInit() {
    setTimeout( () => {
      this.usuario = {
        correo: '',
        password: '',
        imagen: '../../assets/exampleprofile.jpg'
      };
      this.cover = '../../assets/examplecover.jpg'
      this.show = true;
      console.log(this.usuario);
    }, 3000);
    
    this.slideOpts = {
      slidesPerView: 'auto',
      zoom: false,
      grabCursor: true
    }
  }
}
