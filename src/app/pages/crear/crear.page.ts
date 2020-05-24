import { CacheUser } from './../../cache/cache-user';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx'
import { Publicaciones } from 'src/app/models/publicaciones';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  images: any;


  options: ImagePickerOptions = {
    maximumImagesCount: 1
  };

  constructor(
    public imagePicker: ImagePicker,
    public file: File,
    private publicacionesService:PublicacionesService,
  ) { }

  ngOnInit() {
  } 

  PickMultipleImages(){
    this.imagePicker.getPictures(this.options).then(
      (results) => {
        for(var interval = 0; interval < results.length; interval++){
          let fileName = results[interval].substring(results[interval].lastIndexOf('/')+1);
          let path = results[interval].substring(0, results[interval].lastIndexOf('/')+1);
          this.file.readAsDataURL(path, fileName).then(
            (base64string) => {
              this.images = base64string;
            }
          );
        }
      }
    )
  }
  titulo:'';
  descripcion:'';
  insertPublicacion(){
    console.log(this.titulo);
    console.log(this.descripcion);
    let publicacion: Publicaciones = {
      uid: CacheUser.user.uid,
      titulo: this.titulo,
      descripcion: this.descripcion,
    }
    this.publicacionesService
    .insertPublicacion(publicacion)
    .then(response => {
      console.log(response);
    });
  }

}
