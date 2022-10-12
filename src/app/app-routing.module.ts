import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversoComponent } from './components/universo/universo.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';
import { EstrellasComponent } from './components/estrellas/estrellas.component';
import { LunaComponent } from './components/luna/luna.component';
import { MiEstrellaComponent } from './components/mi-estrella/mi-estrella.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio',component:InicioComponent },
  {path:'universo',component: UniversoComponent},
  {path: 'sistema-solar',component:SistemaSolarComponent},
  {path: 'estrellas',component:EstrellasComponent},
  {path: 'luna',component:LunaComponent},
  {path: 'mi-estrella', component:MiEstrellaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
