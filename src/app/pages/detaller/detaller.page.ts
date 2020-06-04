import { PublicacionesService } from './../../services/publicaciones.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { CacheUser } from './../../cache/cache-user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular'
import { Edit } from '../../models/edit';
import { ServicesService } from 'src/app/services/services.service';
import { Plugins } from '../../models/plugins'
import { Places } from 'src/app/models/places';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx'
import { City } from 'src/app/models/city';
import { Town } from 'src/app/models/town';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-detaller',
  templateUrl: './detaller.page.html',
  styleUrls: ['./detaller.page.scss'],
})
export class DetallerPage implements OnInit {

  default: any = '../../assets/examplecover.jpg';
  places: Array<Places> = new Array<Places>();
  edit: Array<Edit> = new Array<Edit>();
  city: Array<City> = new Array<City>();
  town: Array<Town> = new Array<Town>();
  ban: boolean = false;
  nombre: string;
  datos: Edit;
  user:User;
  
  images: any;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private _services: ServicesService,
    private loadingCtrl: LoadingController,
    public imagePicker: ImagePicker,
    public file: File,
    private plugins: Plugins,
    private authService:AuthService,
    private publicacionesService:PublicacionesService,
    private camera:Camera,
  ) 
  {
    this.user = CacheUser.user;
  }

  ngOnInit() {
    this.getEditMenu();
  }

  getEditMenu(){
    this._services.getEdit().subscribe(
      data => {
        this.edit = data;
        this.edit.forEach(element => {
          if(element.id == this.activatedRoute.snapshot.params.nombre)
            this.getOpts(element);
        });
      }
    );
  }

  getOpts(element){
    this.datos = {
      id: element.id,
      name: element.name
    }

    

    if(this.datos.id == 5)
      this.getPlaces();

    if(this.datos.id == 7)
      this.getCity();
  }

  selectImage(){
    let url;
    this.publicacionesService.insertImage(this.images)
    .then(response =>{
      url = response;
      this.user.imagen = url;
      this.guardarImagen();
    })
  }

  selectImagePortada(){
    let url;
    this.publicacionesService.insertImage(this.images)
    .then(response =>{
      url = response;
      this.user.imagenPortada = url;
      this.guardarImagen();
    })
  }


  async addImage(opc){
    const libraryImage = await this.openLibrary();
    this.images = 'data:image/jpg;base64,'+libraryImage;
    if(opc == 'imagen')
      this.user.imagen == this.images;
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


  getPlaces(){
    this._services.getPlaces().subscribe(
      data => {
        this.places = data;
      }
    );
  }

  getCity(){
    this._services.getCity().subscribe(
      data => {
        this.city = data;
      }
    );
  }

  getTowns(event){
    for(let citi of this.city){
      if(citi.estado == event.detail.value){
        this.ban = true;
        this.town = citi.ciudades;
        console.log(this.town);
      }
    }
    
  }

  guardarImagen(){
    this.authService.updateUser(this.user)
    .then(response => {
      console.log(response);
    });
  }

  guardar(){
    if(this.datos.id == 1){
      this.selectImage();
    }
    else if(this.datos.id == 2){
      this.selectImagePortada();
    }else{
    this.authService.updateUser(this.user)
    .then(response => {
      console.log(response);
    });
  }
  }
}
