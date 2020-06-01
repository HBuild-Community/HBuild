import { CacheUser } from './../../cache/cache-user';
import { Comentario } from './../../models/comentario';
import { Toast } from './../../models/toast';
import { Observable } from 'rxjs';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {

  publicacion;
  mapComentarios = new Map();
  inputComentario = '';
  

  constructor(
    private modalCtrl: ModalController,
    private navParams:NavParams,
    private publicacionesService:PublicacionesService,
    private alert:Toast,
    ) 
    {
      this.publicacion = this.navParams.get('publicacion');
      console.log(this.publicacion.key.uid);
      this.obtenerTodosComentarios(this.publicacion.key.uid);
      console.log(this.mapComentarios);
    }

  ngOnInit() {
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  mostrarPop(){
    
  }

  obtenerTodosComentarios(uid){
    this.publicacionesService.getCurrentPublicacion(uid)
    .subscribe((querySnapshot) => {
      this.mapComentarios.clear();
      querySnapshot.forEach((doc) =>{
        this.publicacionesService.getCurrentUser(doc.payload.doc.data().uid)
        .subscribe(response => {
          let publicacion = {
            uid:'',
            data:{},
          }
          publicacion.uid = doc.payload.doc.id;
          publicacion.data = doc.payload.doc.data();
          this.mapComentarios.set(publicacion,response);
          console.log(this.mapComentarios);
          console.log(publicacion);
          for (let [key, value] of this.mapComentarios) {
            console.log(key, value);
        }
        });
      });
    });
  }

  insertComentario(uidPub){
    if(this.inputComentario == undefined || this.inputComentario == ''){
      this.alert.showAlert('Error','Tiene que insertar un comentario');
      return;
    }

    let comentario:Comentario = {
      comentario:this.inputComentario,
      fecha:new Date(),
      uid:CacheUser.user.uid,
    }
    this.publicacionesService.insertComentario(uidPub,comentario)
    .then(response => {
      this.inputComentario = '';
    });
  }
  
}
