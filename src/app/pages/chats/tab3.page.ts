import { Router } from '@angular/router';
import { CacheUser } from './../../cache/cache-user';
import { User } from './../../models/user';
import { NchatsService } from './../../services/nchats.service';
import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database/public_api';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  show: boolean = true;
  yo:User;
  user:User;
  chats;
  mapChats = new Map();

  constructor(
    private chatsService:NchatsService,
    private router:Router,
  ) 
  { 
    this.yo = CacheUser.user;
    this.cargarChats();
  }

  ngOnInit() {
    setTimeout(()=> {
      this.show = false;
    }, 1500);
  }

  cargarChats(){
    this.chatsService.mostrarMisChats(this.yo.uid)
    .subscribe(snapshotChanges => {
      console.log(snapshotChanges);
      this.mapChats.clear();
      snapshotChanges.forEach(doc => {
        console.log(`${doc.payload.doc.id} => ${doc.payload.doc.data().uid}`);
        let arre = doc.payload.doc.data();
        this.chatsService.getCurrentUser(doc.payload.doc.id)
        .subscribe(response => {
          this.mapChats.set(doc.payload.doc.data(),response);
          console.log(this.mapChats);
        });
      });
    });
  }

  irChat(user:User){
    this.chatsService.sendObjectData(user);
    this.router.navigate(['chats-uno']);
  }
 
}
