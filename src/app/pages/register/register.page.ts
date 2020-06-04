import { Plugins } from './../../models/plugins';
import { Toast } from '../../models/toast';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.formBuilder.group({
    uid:[''],
    nombre:['',[Validators.required]],
    apellidos:[''],
    correo:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)]],
    cpassword:['',[Validators.required]],
    telefono:'',
    locacion:'',
    imagen:'',
    oficio:'',
  });
  user:User;


  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router,
    private alerts:Toast,
    private menuController:MenuController,
    private plugins:Plugins,
  )
  {
    this.menuController.enable(false);
  }

  
  get nombre(){
    return this.registerForm.get('nombre');
  }

  get correo(){
    return this.registerForm.get('correo');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get cpassword(){
    return this.registerForm.get('cpassword');
  }

  public errorMessages = {
    nombre:[
      {type:'required',message:'El nombre es obligatorio'}
    ],
    correo:[
      {type:'required',message:'El correo es obligatorio'},
      {type:'email',message:'Ingrese una dirección de correo válida'}
    ],
    password:[
      {type:'required', message:'La contraseña es obligatoria'},
      {type:'pattern', message:'La contraseña debe de tener por lo menos 6 digitos y un numero'}
    ],
    cpassword:[
      {type:'required', message:'Debe confirmar su contraseña'}
    ],
  }

  ngOnInit() {
  }

  async onSubmitCorreo(){
    let correo = this.registerForm.value.correo;
    let isEmailAvailable = await this.authService.isEmailAvailable(correo);
    if(!isEmailAvailable){
      this.plugins.presentToast('Este correo electrónico ya está en uso','danger');
      return;
    }
    this.onRegister();
  }

  onRegister(){
    if(this.registerForm.value.password != this.registerForm.value.cpassword){
      this.plugins.presentToast('Las contraseñas no coinciden','danger');
      return;
    }
    let user: User = {
      correo: this.registerForm.value.correo,
      password: this.registerForm.value.password,
      nombre:this.registerForm.value.nombre,
      imagen:'https://firebasestorage.googleapis.com/v0/b/hbuild-e1897.appspot.com/o/imagen%2Fprofile.png?alt=media&token=2af9e955-063f-4721-8c27-0787a8db57ed',
      imagenPortada: 'https://firebasestorage.googleapis.com/v0/b/hbuild-e1897.appspot.com/o/imagenPortada%2Fsplash.png?alt=media&token=10e5a222-dc6e-4a59-a129-02ecf9acaf43',
      descripcion:'Sin descripción',
    }
    this.authService.registerAuthUser(user)
    .then(result =>{
      console.log(result);
      user.uid = result.user.uid;

      this.authService.addUser(user)
      .then(result =>{
        console.log(result);
        this.plugins.presentToast('Registrado con exito','success');
        this.router.navigate(['/home']);
      });
    });
  }

}
