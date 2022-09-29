import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import planetas from '../../files/planetas.json'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.scss']
})
export class PlanetasComponent implements OnInit {

  //Valor de planeta seleccionado
  @Input() planetaSelected:any;
  planeta:any;
  //Texto del PDF
  pdfText='';
  //Varibles Telescopio
  abrirTelescopio=false;
  zoom:any=30;
  zoomN:any=50;
  windSize:Boolean=false;
  superficie:Boolean=false;


  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.planeta=planetas;
  }

  //Este metodo te lleva al componente sistema-solar
  irSistema(){
    if(this.pdfText!==''){
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.cctService.$sistemaSolar.emit(false);
        } else if (result.isDenied) {
        }
      })
    }else{
      this.cctService.$sistemaSolar.emit(false);
    }
  }

  //Este metodo carga el componente de la lunna
  irLuna(){
    if(this.pdfText!==''){
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/luna']);
        } else if (result.isDenied) {
        }
      })
    }else{
      this.router.navigate(['/luna']);
    }

  }

  createPDF(){
    if(this.pdfText==''){
      Swal.fire({
        icon: 'error',
        title: 'Texto vacío',
        text: 'Parece que nos haz escrito nada aún',
        footer: ':)',
        timer: 1500
      })
    }else{
      const pdf:any = {
        content:[
          {
            text:this.planeta[this.planetaSelected].name,
          style:'header'
          },
          {
          text:this.pdfText
          },
          {
            image:this.planeta[this.planetaSelected].image,
            width: 300
          },
          {
            text: 'Plandi - Plataformas Educativas ©',
            style: ['quote', 'small']
          }
      ],
        styles: {
          header: {
            fontSize: 18,
            bold: true
          },
          subheader: {
            fontSize: 14,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          }
        }
      }
      pdfMake.createPdf(pdf).open();
    }
  }

  ///////////////////////////////////////

  //Detecta el cambio en el tamaño de la pantalla para cambiar las variables
  windowsSize(e:any){
    if(e.target.innerWidth>992){
      this.windSize=false;
    }else{
      this.windSize=true;
    }
  }

  //Hace zoom en una imagen
  telescopio(e:any){
    let x, y, x1, y1;
      if(this.windSize===false){

        if ( e===null){
          e=window.event;
        }else{
          x = e.clientX;
          y= e.clientY;
          x1=150+(x);
          y1=-100+(y);
          var lup :HTMLElement = <HTMLElement>document.getElementById('lupa');
          lup.style.clipPath = "circle("+this.zoom+"% at "+x1+"px "+y1+"px)";
        }

      }else{
        if ( e===null){
          e=window.event;
        }else{
          x = e.clientX;
          y= e.clientY;
          x1=100+(x);
          y1=(y);
          var lup :HTMLElement = <HTMLElement>document.getElementById('lupa');
          lup.style.clipPath = "circle("+this.zoom+"% at "+x1+"px "+y1+"px)";
        }
      }
    }

  zoomA(){
    if(this.zoomN<100){
      this.zoom=this.zoom+5;
    this.zoomN = this.zoomN+10;
    }else{
      alert('no');
    }

  }
  zoomD(){
    if(this.zoomN>10){
      this.zoom=this.zoom-5;
      this.zoomN = this.zoomN-10;
    }else{
      alert('no');
    }

  }
  mostrarTelescopio(){

    if(this.pdfText!==''){
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.abrirTelescopio=true;
        } else if (result.isDenied) {
        }
      })
    }else{
      this.abrirTelescopio=true;
    }
  }
  ocultarTelescopio(){
    this.abrirTelescopio=false;
  }
///////////////////////////////////////
}
