import { Publicaciones } from './../models/publicaciones';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(
    public afa: AngularFireAuth,
    public afs: AngularFirestore,
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

  getPublicaciones(){
    return this.afs.collection<Publicaciones>('publicacion')
    .valueChanges()
    .pipe(map(publicaciones => {
      console.log(publicaciones);
    })
    );
  }

  insertPublicacion(publicacion:Publicaciones):Promise<void>{
    let pubUid = this.afs.createId();
    return this.afs.doc<Publicaciones>(`publicacion/${pubUid}`).set(publicacion);
  }
}
