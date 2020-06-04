import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private objectSource = new BehaviorSubject<any>({});

  $getObjectSource = this.objectSource.asObservable();

  constructor() { }

  sendObjectData(data:any){
    this.objectSource.next(data);
  }
}
