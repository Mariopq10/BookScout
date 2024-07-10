import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { firebaseConfig } from 'src/environments/environment';
import {  provideHttpClient } from '@angular/common/http';
import Swiper from 'swiper';

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
    ],
  providers: [provideHttpClient(),{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },Swiper],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class AppModule {}
