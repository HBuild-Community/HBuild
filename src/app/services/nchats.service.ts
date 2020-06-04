import { Injectable } from '@angular/core';
import { User } from './../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, finalize} from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Mensajes } from '../models/mensajes';

@Injectable({
  providedIn: 'root'
})
export class NchatsService {

  private objectSource = new BehaviorSubject<any>({});

  $getObjectSource = this.objectSource.asObservable();

  constructor(
    public firestore: AngularFirestore,
    private fireStorage:AngularFireStorage,
  ) { }

    mostrarMisChats(uidPersonal){
      return this.firestore.collection('chats').doc(uidPersonal)
      .collection('misChats').snapshotChanges();
    }

    getCurrentUser(uid:string){
      return this.firestore.doc<User>(`users/${uid}`).valueChanges();
    }

    sendObjectData(data:any){
      this.objectSource.next(data);
    }

    getMessages(uidPersonal, uidOtro):any{
      return this.firestore.collection('chats').doc(uidPersonal)
      .collection('misChats').doc(uidOtro).collection('mensajes').valueChanges();
    }

    async enviarMensaje(mensaje,uidPersonal,uidOtro){
      let uidDoc = this.firestore.createId();

      let objPersonal = {
        uid:uidPersonal,
      }

      let objOtro = {
        uid:uidOtro,
      }

      await this.firestore.collection('chats').doc(uidPersonal)
       .collection('misChats').doc(uidOtro).set(objOtro);

       await this.firestore.collection('chats').doc(uidOtro)
       .collection('misChats').doc(uidPersonal).set(objPersonal);

       await this.firestore.collection('chats').doc(uidPersonal)
       .collection('misChats').doc(uidOtro).collection('mensajes').doc(uidDoc).set(mensaje);

       await this.firestore.collection('chats').doc(uidOtro)
       .collection('misChats').doc(uidPersonal).collection('mensajes').doc(uidDoc).set(mensaje);
    }

    borrarConversacion(uidPersonal,uidOtro){
      return this.firestore.collection('chats').doc(uidPersonal)
      .collection('misChats').doc(uidOtro).delete();
    }

}
