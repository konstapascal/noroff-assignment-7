import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/landing-page-components/login-form/login-form.component';
import { NavbarComponent } from './components/shared-components/navbar/navbar.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LandingPage } from './pages/landing/landing.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePokemonListComponent } from './components/catalogue-page-components/catalogue-pokemon-list/catalogue-pokemon-list.component';
import { CataloguePokemonCardComponent } from './components/catalogue-page-components/catalogue-pokemon-card/catalogue-pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPage,
    LoginFormComponent,
    CataloguePage,
    CataloguePokemonListComponent,
    CataloguePokemonCardComponent,
    TrainerPage,
    NotFoundPage,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
