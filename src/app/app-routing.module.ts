import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationAuthGuard } from './guards/application-auth.guard';
import { LandingAuthGuard } from './guards/landing-auth.guard';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LandingPage } from './pages/landing/landing.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { TrainerPage } from './pages/trainer/trainer.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPage,
    canActivate: [LandingAuthGuard],
  },
  {
    path: 'catalogue',
    component: CataloguePage,
    canActivate: [ApplicationAuthGuard],
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate: [ApplicationAuthGuard],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
