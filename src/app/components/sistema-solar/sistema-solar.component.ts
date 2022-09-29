import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CctServiceService } from 'src/app/service/cct-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistema-solar',
  templateUrl: './sistema-solar.component.html',
  styleUrls: ['./sistema-solar.component.scss']
})
export class SistemaSolarComponent implements OnInit {
  //Variables para mostrar planetas
  mostrarPlaneta:Boolean=false;
  planetaSelec:any;
  constructor(private cctService:CctServiceService, private router:Router) { }

  ngOnInit(): void {
    this.cctService.$sistemaSolar.subscribe((res:any)=>{this.mostrarPlaneta=res;});
  }

  //Los siguientes metodos con nombres de planetas
  //te llevan a cada uno de los siguientes planetas
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

  //Este es un metodo que te redirecciona al componente universo
  irUniverso(){
    this.router.navigate(['/universo']);
  }

  estrellas(){
    this.naveSistemaSolar();
  }

  //Te lleva al componente estrellas y carga la animacionde transicion
  naveSistemaSolar(){
    this.cctService.$loader.emit(true)
    setTimeout(() => {
      this.cctService.$loader.emit(false);
      this.router.navigate(['/estrellas']);
    }, 1500);
  }

}
