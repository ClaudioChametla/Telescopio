import { Component, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';

@Component({
  selector: 'app-sistema-solar',
  templateUrl: './sistema-solar.component.html',
  styleUrls: ['./sistema-solar.component.scss']
})
export class SistemaSolarComponent implements OnInit {

  mostrarPlaneta=false;
  planetaSelec:any;
  constructor(private cctService:CctServiceService) { }

  ngOnInit(): void {

  }

  sol(){
    this.mostrarPlaneta=true;
    /* this.cctService.$sistemaSolar.emit(false); */
    this.planetaSelec=8;
  }
  mercurio(){
    this.mostrarPlaneta=true;
    this.planetaSelec=0;
  }
  venus(){
    this.mostrarPlaneta=true;
    this.planetaSelec=1;
  }
  tierra(){
    this.mostrarPlaneta=true;
    this.planetaSelec=2;
  }
  marte(){
    this.mostrarPlaneta=true;
    this.planetaSelec=3;
  }
  jupiter(){
    this.mostrarPlaneta=true;
    this.planetaSelec=4;
  }
  saturno(){
    this.mostrarPlaneta=true;
    this.planetaSelec=5;
  }
  urano(){
    this.mostrarPlaneta=true;
    this.planetaSelec=6;
  }
  neptuno(){
    this.mostrarPlaneta=true;
    this.planetaSelec=7;
  }


}
