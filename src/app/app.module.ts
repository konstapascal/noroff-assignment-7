import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { HomePage } from './pages/home/home.page';
import { TrainersPage } from './pages/trainers/trainers.page';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    TrainersPage,
    CataloguePage,
    NavbarComponent,
    LoginFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
