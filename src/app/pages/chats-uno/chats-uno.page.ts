import { Mensajes } from './../../models/mensajes';
import { CacheUser } from './../../cache/cache-user';
import { User } from './../../models/user';
import { NchatsService } from './../../services/nchats.service';
import { PopChatsUnoReportarComponent } from './../../components/pop-chats-uno-reportar/pop-chats-uno-reportar.component';
import { PopChatsUnoComponent } from './../../components/pop-chats-uno/pop-chats-uno.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, PopoverController, ModalController, ActionSheetController } from '@ionic/angular';
import { Plugins } from 'src/app/models/plugins';

@Component({
  selector: 'app-chats-uno',
  templateUrl: './chats-uno.page.html',
  styleUrls: ['./chats-uno.page.scss'],
})
export class ChatsUnoPage implements OnInit {

  
  currentUser;

  @ViewChild(IonContent,null) content:IonContent

  userOtro:User;
  user:User;
  mensajes;
  nuevoMensaje;
  mensajesSort:Mensajes;

  constructor(
    private popCtrl:PopoverController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public plugin: Plugins,
    private chatService:NchatsService,
  ) 
  {
    this.user = CacheUser.user;
    this.currentUser = this.user.uid;
    this.obtenerInfoUsuario();
    this.chatService.getMessages(this.user.uid,this.userOtro.uid)
    .subscribe(response => {

      response.sort(function(x, y){
        return x.creado - y.creado;
    });
    
    console.log(response);
      this.mensajes = response;
    });
  }

  obtenerInfoUsuario(){
    this.chatService.$getObjectSource
    .subscribe(user =>{
      this.userOtro = user
      console.log(user);
    });
  }

  

  enviarMensaje(){
    let date = new Date();
    let mensaje = {
      uid:this.user.uid,
      mensaje:this.nuevoMensaje,
      creado:date
    }
    this.chatService.enviarMensaje(mensaje,this.user.uid,this.userOtro.uid)
    .then(response => {
      this.nuevoMensaje='';
    });
  }

  borrarConversacion(user,userOtro){
    let id = {
      uidPersonal:user,
      uidOtro:userOtro,
    }
    this.plugin.presentActionSheet(false,id);
  }

  ngOnInit() {
    this.content.scrollToBottom();
  }


  async mostrarPop(evento) {
    const popover = await this.popCtrl.create({
      component: PopChatsUnoComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: true,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss(); //Para recibir los datos cuando se cierre el pop
    // const {data} = await popover.onWillDismiss();  Para que se dispare rápido sin esperar que e cierre el pop

    for (var clave in data) {
      // Controlando que json realmente tenga esa propiedad
      if (data.hasOwnProperty(clave)) {
        // Mostrando en pantalla la clave junto a su valor
        console.log("La clave es " + clave + " y el valor es " + data[clave]);

        if (data[clave] == "Reportar") {
          this.mostrarPopInfo();
        } else if (data[clave] == "Borrar") {
          console.log("Borrar");
        }
      }
    }
    console.log('Padre:', data);
  }

  async mostrarPopInfo() {
    const popover = await this.popCtrl.create({
      component: PopChatsUnoReportarComponent,
      componentProps:{
      },
      mode: "md",
      backdropDismiss: true,
      translucent: true,
    });
    return await popover.present();
  }


}
