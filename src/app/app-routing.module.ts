import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversoComponent } from './components/universo/universo.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';
import { EstrellasComponent } from './components/estrellas/estrellas.component';

const routes: Routes = [
  {path:'', redirectTo:'/universo',pathMatch:'full'},
  {path:'universo',component: UniversoComponent},
  {path: 'sistema-solar',component:SistemaSolarComponent},
  {path: 'estrellas',component:EstrellasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
