import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import galaxias from '../../files/galaxias.json'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.scss']
})
export class GalaxiasComponent implements OnInit {
  //Valor de la Galaxia seleccionada
  @Input() galaxiaSelected:any;
  //Recibe los datos del JSON galaxias
  galaxiasDatos:any;
  //Recibe el texto ingresado del usuario
  pdfText='';
  //Varibles Telescopio
  windSize:Boolean=false;
  abrirTelescopio=false;
  zoom:any=30;
  zoomN:any=50;
  superficie:Boolean=false;

  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.galaxiasDatos=galaxias;
  }


  irSistema(){
    if(this.pdfText!==''){
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.naveSistemaSolar();
        } else if (result.isDenied) {
        }
      })
    }else{
      this.naveSistemaSolar();
    }

  }
  naveSistemaSolar(){
    this.cctService.$loader.emit(true);
    setTimeout(() => {
      this.cctService.$loader.emit(false);
      this.router.navigate(['/sistema-solar']);
    }, 1500);
  }

  irUniverso(){
    //Emite un TRUE para ocultar componente Galaxias
    if(this.pdfText!==''){
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.cctService.$universo.emit(true);
        } else if (result.isDenied) {
        }
      })
    }else{
      this.cctService.$universo.emit(true);
    }
  }

  //Función para crear el PDF
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
            text:this.galaxiasDatos[this.galaxiaSelected].name,
          style:'header'
          },
          {
          text:this.pdfText
        },
        {
          image:this.galaxiasDatos[this.galaxiaSelected].image,
	        width: 500
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
      //Crea y abre el PDF en nueva ventana
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
  //Evento movemouse detecta cambios y mueve el cilpPath de la seunda imagen
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

  //Abre el porcentaje que tiene el circulo del clipPath
  zoomA(){
    if(this.zoomN<100){
      this.zoom=this.zoom+5;
    this.zoomN = this.zoomN+10;
    if(this.zoomN>39){this.superficie=false;}
    }else{
      /* this.superficie=false; */
    }
  }

  zoomD(){
    if(this.zoomN>10){
      this.zoom=this.zoom-5;
      this.zoomN = this.zoomN-10;
      if(this.zoomN<40){this.superficie=true;}
    }else{
      /* this.superficie=true; */
    }
  }

  //Muestra la pantalla del telescopio
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
