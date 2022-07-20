import { Component, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';

@Component({
  selector: 'app-universo',
  templateUrl: './universo.component.html',
  styleUrls: ['./universo.component.scss']
})
export class UniversoComponent implements OnInit {

  mostrarUniverso=true;
  mostrarGalaxia=false;
  mostrarSistemaSolar=false;
  selecGalaxia:any;

  constructor(private cctService:CctServiceService) { }

  ngOnInit(): void {
    /* this.cctService.$sistemaSolar.subscribe((res:any)=>{
      this.mostrarSistemaSolar=res
    }); */
  }


  viaLactea(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.mostrarGalaxia=true;
    this.selecGalaxia=0;
  }
  andromeda(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.selecGalaxia=1;
  }
  m3(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.selecGalaxia=2;
  }
  magallanes(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.selecGalaxia=3;
  }
  ngc2936(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.selecGalaxia=4;
  }
  ngc1672(){
    this.mostrarUniverso=false;
    this.mostrarGalaxia=true;
    this.selecGalaxia=5;
  }
  zoomSolar(){
    this.mostrarSistemaSolar=true;
    this.mostrarUniverso=false;
    this.mostrarGalaxia=false;

  }

}
