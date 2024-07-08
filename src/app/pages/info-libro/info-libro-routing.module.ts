import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoLibroPage } from './info-libro.page';

const routes: Routes = [
  {
    path: '',
    component: InfoLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoLibroPageRoutingModule {}
