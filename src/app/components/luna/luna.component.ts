import { Component, OnInit } from '@angular/core';
import luna from '../../files/luna.json'

@Component({
  selector: 'app-luna',
  templateUrl: './luna.component.html',
  styleUrls: ['./luna.component.scss']
})

export class LunaComponent implements OnInit {
  cuestionario=false;
  lunaDatos:any;
  selector=0;
  puntaje=0;

  constructor() { }

  ngOnInit(): void {
    this.lunaDatos=luna;
    console.log(this.lunaDatos[0]);
  }

  mostrarCuestionario(){
    this.cuestionario=true;
  }

  opA(e:any){
    this.puntaje+=e;
  }
  opB(e:any){
    this.puntaje+=e;
  }
  opC(e:any){
    this.puntaje+=e;
  }

  siguientePregunta(){

    if(this.selector < 9){
      this.selector=this.selector+1;
    }else{
      alert('Tu puntaje final es de : '+ this.puntaje);
    }
  }

}
