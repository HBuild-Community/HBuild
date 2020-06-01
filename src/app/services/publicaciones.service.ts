import { User } from './../models/user';
import { Publicaciones } from './../models/publicaciones';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, filter, finalize} from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {


  publicaciones:Array<Publicaciones>;

  constructor(
    public afa: AngularFireAuth,
    public firestore: AngularFirestore,
    private fireStorage:AngularFireStorage,
  ) { }

  /* getPublicaciones(){
    return this.afs.collection<Publicaciones>('publicacion')
    .valueChanges()
    .subscribe(response =>{
      console.log(response);
      response.forEach(element => {
        console.log(element.uid);
      });
    });
  } */
/* 
  getPublicaciones(){
    return this.afs.collection<Publicaciones>('publicacion')
    .valueChanges()
    .pipe(map(publicaciones => {
      console.log(publicaciones);
    })
    );
  } */

  getPublicaciones(user) {
    return this.firestore.collection('publicacion', ref => ref.where('uid','==', 
     user.uid)).valueChanges()
    }
    
    getAllPublicaciones(){
      return this.firestore.collection('publicacion').get();
    }

    async insertImage(image){
      let pubUid = this.firestore.createId();
      await this.fireStorage.ref(`imagenesPublicaciones/${pubUid}`).putString(image, 'data_url');
      return this.fireStorage.ref(`imagenesPublicaciones/${pubUid}`).getDownloadURL().toPromise();
    }

  insertPublicacion(publicacion:Publicaciones):Promise<void>{
    let pubUid = this.firestore.createId();
    return this.firestore.doc<Publicaciones>(`publicacion/${pubUid}`).set(publicacion);
  }

  getCurrentUser(uid:string){
    return this.firestore.doc<User>(`users/${uid}`).valueChanges();
  }


  /* obtenerTodasPublicaciones(){
    let mapita = new Map();
    this.afs.collection('publicacion').get()
    .subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        let uid = doc.data().uid;
        let pubs = Array<Publicaciones>();
        this.getCurrentUser(doc.data().uid)
        .subscribe(response => {
          mapita.set(doc.data(),response);
        });
      });
    });
    return mapita;
  } */

  obtenerTodasPublicaciones():Observable<any>{
    return this.firestore.collection('publicacion').get();
  }

  getCurrentPublicacion(uid:string){
    return this.firestore.doc(`publicacion/${uid}`).collection('comentarios').get();
  }

  insertComentario(uidPub,comentario){
    let uidCom = this.firestore.createId();
    return this.firestore.doc(`publicacion/${uidPub}`).collection('comentarios').doc(uidCom).set(comentario);
  }

}
