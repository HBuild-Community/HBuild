import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from './../../models/toast';
import { CacheUser } from './../../cache/cache-user';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx'
import { Publicaciones } from 'src/app/models/publicaciones';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  images: any;
  imagen;

  options: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality:100,
    
  };

  constructor(
    public imagePicker: ImagePicker,
    public file: File,
    private publicacionesService:PublicacionesService,
    private alert:Toast,
    private camera:Camera,
  ) { }

  ngOnInit() {
  } 

  async addImage(){
    const libraryImage = await this.openLibrary();
    this.images = 'data:image/jpg;base64,'+libraryImage;
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  
  titulo:'';
  descripcion:'';
  insertPublicacion(){
    let pubUid;
    let url;
    let date = new Date();
    if(this.images != undefined){
      this.insertarConImagen(url,date);
    }
    else{
      console.log('Sin');
      this.insertarSinImagen(date);
    }
    
  }

  insertarConImagen(url, date){

    this.publicacionesService.insertImage(this.images)
    .then(response =>{
      url = response;
      console.log(response);
      let publicacion: Publicaciones = {
        uid: CacheUser.user.uid,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: date,
        urlImagen:url,
      }
      this.publicacionesService
      .insertPublicacion(publicacion)
      .then(response => {
        console.log(response);
        this.alert.toast('Exito','Publicación creada correctamente');
      });
    });
  }

  insertarSinImagen(date){
      let publicacion: Publicaciones = {
        uid: CacheUser.user.uid,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: date,
        urlImagen:'',
      }
      this.publicacionesService
      .insertPublicacion(publicacion)
      .then(response => {
        console.log(response);
        this.alert.toast('Exito','Publicación creada correctamente');
      });
  }

}
