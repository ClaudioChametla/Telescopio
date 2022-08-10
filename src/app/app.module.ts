import { NgParticlesModule } from "ng-particles";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversoComponent } from './components/universo/universo.component';
import { GalaxiasComponent } from './components/galaxias/galaxias.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';
import { PlanetasComponent } from './components/planetas/planetas.component';
import { EstrellasComponent } from './components/estrellas/estrellas.component';
import { TipoEstrellaComponent } from './components/tipo-estrella/tipo-estrella.component';
import { MiEstrellaComponent } from './components/mi-estrella/mi-estrella.component';


@NgModule({
  declarations: [
    AppComponent,
    UniversoComponent,
    GalaxiasComponent,
    SistemaSolarComponent,
    PlanetasComponent,
    EstrellasComponent,
    TipoEstrellaComponent,
    MiEstrellaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
