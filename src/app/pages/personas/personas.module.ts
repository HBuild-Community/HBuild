import { PipesModule } from './../../pipes/pipes.module';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasPageRoutingModule } from './personas-routing.module';

import { PersonasPage } from './personas.page';



@NgModule({
  exports: [
    PersonasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasPageRoutingModule,
    PipesModule
  ],
  declarations: [PersonasPage]
})
export class PersonasPageModule {}
