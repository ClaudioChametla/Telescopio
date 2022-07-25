import { Component, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universo',
  templateUrl: './universo.component.html',
  styleUrls: ['./universo.component.scss']
})
export class UniversoComponent implements OnInit {

  mostrarUniverso=true;
  selecGalaxia:any;

  constructor(private cctService:CctServiceService, private router:Router) { }

  ngOnInit(): void {
    this.cctService.$universo.subscribe((res:any)=>{
      this.mostrarUniverso=res;
      console.log(res);

    });
    console.log(this.mostrarUniverso);


  }



  viaLactea(){
    this.mostrarUniverso=false;
    this.selecGalaxia=0;
  }
  andromeda(){
    this.mostrarUniverso=false;
    this.selecGalaxia=1;
  }
  m3(){
    this.mostrarUniverso=false;
    this.selecGalaxia=2;
  }
  magallanes(){
    this.mostrarUniverso=false;
    this.selecGalaxia=3;
  }
  ngc2936(){
    this.mostrarUniverso=false;
    this.selecGalaxia=4;
  }
  ngc1672(){
    this.mostrarUniverso=false;
    this.selecGalaxia=5;
  }
  zoomSolar(){
    this.router.navigate(['/sistema-solar']);
  }

}
