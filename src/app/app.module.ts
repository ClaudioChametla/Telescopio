import { NgParticlesModule } from 'ng-particles';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversoComponent } from './components/universo/universo.component';
import { GalaxiasComponent } from './components/galaxias/galaxias.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';
import { PlanetasComponent } from './components/planetas/planetas.component';
import { EstrellasComponent } from './components/estrellas/estrellas.component';
import { TipoEstrellaComponent } from './components/tipo-estrella/tipo-estrella.component';
import { LunaComponent } from './components/luna/luna.component';
import { MiEstrellaComponent } from './components/mi-estrella/mi-estrella.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DibujoComponent } from './components/dibujo/dibujo.component';
import { TelescopioComponent } from './components/telescopio/telescopio.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ControlVentanaComponent } from './components/control-ventana/control-ventana.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversoComponent,
    GalaxiasComponent,
    SistemaSolarComponent,
    PlanetasComponent,
    EstrellasComponent,
    TipoEstrellaComponent,
    LunaComponent,
    MiEstrellaComponent,
    LoaderComponent,
    DibujoComponent,
    TelescopioComponent,
    InicioComponent,
    ControlVentanaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgParticlesModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
