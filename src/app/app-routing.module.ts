import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CataloguePage } from './pages/catalogue/catalogue.page';
import { HomePage } from './pages/home/home.page';
import { TrainersPage } from './pages/trainers/trainers.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'trainers',
    component: TrainersPage,
  },
  {
    path: 'catalogue',
    component: CataloguePage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
