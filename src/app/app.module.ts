import { PublicacionPageModule } from './pages/publicacion/publicacion.module';
import { PublicacionPage } from './pages/publicacion/publicacion.page';
import { InicioPage } from './pages/inicio/inicio.page';
import { Plugins } from './models/plugins';
import { Toast } from './models/toast';

import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Angular
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

//Plugins
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx'
import { Camera } from '@ionic-native/camera/ngx';

import {AutosizeModule} from 'ngx-autosize';

import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent,MenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    AutosizeModule,
    PublicacionPageModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    Plugins,
    PublicacionPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    File,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
