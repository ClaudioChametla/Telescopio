import { NgParticlesModule } from "ng-particles";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversoComponent } from './components/universo/universo.component';
import { GalaxiasComponent } from './components/galaxias/galaxias.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';
import { PlanetasComponent } from './components/planetas/planetas.component';
import { EstrellasComponent } from './components/estrellas/estrellas.component';


@NgModule({
  declarations: [
    AppComponent,
    UniversoComponent,
    GalaxiasComponent,
    SistemaSolarComponent,
    PlanetasComponent,
    EstrellasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
