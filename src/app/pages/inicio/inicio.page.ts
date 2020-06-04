import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { AppComponent } from './../../app.component';
import { PublicacionPage } from './../publicacion/publicacion.page';
import { Plugins } from './../../models/plugins';
import { Observable } from 'rxjs';
import { Publicaciones } from './../../models/publicaciones';
import { CacheUser } from './../../cache/cache-user';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { PopoverController, ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  oneTime = true;
  show: boolean = true;
  public mapPublicaciones = new Map();

  constructor(private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public popOverCtrl: PopoverController,
    private publicacionesService:PublicacionesService,
    private plugins:Plugins,
    private appComponent:AppComponent,
    private router:Router,
    private profileService:ProfileService,
  ) {
    appComponent.mostrar = true;
    setTimeout(() => {
      this.show =false;
    }, 1000);
    this.obtenerTodasPublicaciones();
  }

  obtenerTodasPublicaciones(){
    this.publicacionesService.obtenerTodasPublicaciones()
    .then(querySnapshot => {
      querySnapshot.forEach(Ndoc => {
      this.mapPublicaciones.clear();
        Ndoc.forEach(doc => {
          this.publicacionesService.getCurrentUser(doc.payload.doc.data().uid)
        .subscribe(response => {
          let publicacion = {
            uid:'',
            data:{},
          }
          publicacion.uid = doc.payload.doc.id;
          publicacion.data = doc.payload.doc.data();
          this.mapPublicaciones.set(publicacion,response);
          
          /* console.log(this.mapPublicaciones);
          console.log(publicacion);
          for (let [key, value] of this.mapPublicaciones) {
            console.log(key, value);
        } */
        })
        });
      });
    });
  }

  limpiar(){
    this.oneTime = true;
        console.log(this.oneTime);
  }

  ngOnInit() {

  }

  /* openAlert(){
    this.plugins.presentActionSheet(true);
  } */

  openComment(publicacion){
    this.plugins.openModal(PublicacionPage,publicacion);
  }

  refresh(event){
    this.obtenerTodasPublicaciones();
    setTimeout(()=>{
      event.target.complete();
    },2000);
  }

  irPerfil(user){
    this.profileService.sendObjectData(user);
    this.router.navigate(['profile']);
  }
}
