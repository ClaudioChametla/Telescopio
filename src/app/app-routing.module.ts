import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversoComponent } from './components/universo/universo.component';
import { SistemaSolarComponent } from './components/sistema-solar/sistema-solar.component';

const routes: Routes = [
  {path:'', redirectTo:'/universo',pathMatch:'full'},
  {path:'universo',component: UniversoComponent},
  {path: 'sistema-solar',component:SistemaSolarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
