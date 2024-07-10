import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoLibroPageRoutingModule } from './info-libro-routing.module';

import { InfoLibroPage } from './info-libro.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLibroPageRoutingModule,

  ],
  declarations: [InfoLibroPage]
})
export class InfoLibroPageModule {}
