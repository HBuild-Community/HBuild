import { Publicaciones } from './../../models/publicaciones';
import { CacheUser } from './../../cache/cache-user';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from 'src/app/models/plugins';
import { PopoverController, ModalController, ActionSheetController } from '@ionic/angular';
import { PublicacionPage } from '../publicacion/publicacion.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  plugin: Plugins;
  show: boolean = true;
  mapPublicaciones = new Map();

  constructor(private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public popOverCtrl: PopoverController,
    private publicacionesService:PublicacionesService,
  ) {
    this.plugin = new Plugins(null, null, null, null, this.actionSheetController, this.modalCtrl, this.popOverCtrl);
    this.obtenerTodasPublicaciones();
  }

  

  obtenerTodasPublicaciones(){
    this.publicacionesService.obtenerTodasPublicaciones()
    .subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        this.publicacionesService.getCurrentUser(doc.data().uid)
        .subscribe(response => {
          let publicacion = {
            uid:'',
            data:{},
          }
          publicacion.uid = doc.id;
          publicacion.data = doc.data();
          this.mapPublicaciones.set(publicacion,response);
          console.log(this.mapPublicaciones);
          console.log(publicacion);
          for (let [key, value] of this.mapPublicaciones) {
            console.log(key, value);
        }
        });
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.show =false;
    }, 1000);

    this.publicacionesService.getPublicaciones(CacheUser.user)
    .subscribe(result=>{
      console.log(result);
    });

  }

  openAlert(){
    this.plugin.presentActionSheet(true);
  }

  openComment(publicacion){
    this.plugin.openModal(PublicacionPage,publicacion);
  }
}
