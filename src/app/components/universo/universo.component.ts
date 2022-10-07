import { Component, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universo',
  templateUrl: './universo.component.html',
  styleUrls: ['./universo.component.scss']
})
export class UniversoComponent implements OnInit {
  //Variable para mostrar universo
  mostrarUniverso:Boolean=true;
  //Id de galaxia a seleccionar
  selecGalaxia:Number;

  constructor(private cctService:CctServiceService, private router:Router) { }

  ngOnInit(): void {
    /**Recibe un valor true del componente galaxias y cambia la vista*/
    this.cctService.$universo.subscribe((res:any)=>{
      this.mostrarUniverso=res;
    });
  }

  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  viaLactea(){
    this.mostrarUniverso=false;
    this.selecGalaxia=0;
  }
  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  andromeda(){
    this.mostrarUniverso=false;
    this.selecGalaxia=1;
  }
  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  m3(){
    this.mostrarUniverso=false;
    this.selecGalaxia=2;
  }
  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  magallanes(){
    this.mostrarUniverso=false;
    this.selecGalaxia=3;
  }
  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  ngc2936(){
    this.mostrarUniverso=false;
    this.selecGalaxia=4;
  }
  /**Cambian la variable mostrarUniverso a false para cambiar la vista*/
  ngc1672(){
    this.mostrarUniverso=false;
    this.selecGalaxia=5;
  }

  zoomSolar(){
    this.naveSistemaSolar();
  }

  /**Este metodo emite un true al componente loader para mostrarlo
   * luego despues de un delay lo devuelve a falso y te envia al
   * componente sistema-solar*/
  naveSistemaSolar(){
    this.cctService.$loader.emit(true)
    setTimeout(() => {
      this.cctService.$loader.emit(false);
      this.router.navigate(['/sistema-solar']);
    }, 1500);
  }

}
