import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversoComponent } from './components/universo/universo.component';

const routes: Routes = [
  {path:'',component: UniversoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
