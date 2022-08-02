import { Component, Input, OnInit } from '@angular/core';
import estrellas from '../../files/estrellas.json';
import { CctServiceService } from 'src/app/service/cct-service.service';
import Swal from 'sweetalert2';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tipo-estrella',
  templateUrl: './tipo-estrella.component.html',
  styleUrls: ['./tipo-estrella.component.scss']
})
export class TipoEstrellaComponent implements OnInit {

  @Input() selecEstrella:any;
  estrellaSelecDatos:any;
  pdfText='';
  //Varibles Telescopio
  abrirTelescopio=false;
  zoom=30;
  zoomN=50;

  constructor(private service:CctServiceService) { }

  ngOnInit(): void {
    this.estrellaSelecDatos=estrellas;
  }

  irEstrellas(){
    this.service.$estrella.emit(true);
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
            text:'Estrella Clase: '+this.estrellaSelecDatos[this.selecEstrella].clase,
            style:'header'
          },
          {
          text:this.pdfText
          },
          {
            image:this.estrellaSelecDatos[this.selecEstrella].image,
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
  //Hace zoom en una imagen
  telescopio(e:any){
    let x, y, x1, y1;
    if ( e===null){
      e=window.event;
    }else{
      x = e.clientX;
      y= e.clientY;
      x1=150+(x);
      y1=30+(y);
      var lup :HTMLElement = <HTMLElement>document.getElementById('lupa');
      lup.style.clipPath = "circle("+this.zoom+"% at "+x1+"px "+y1+"px)";
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
    this.abrirTelescopio=true;
  }
  ocultarTelescopio(){
    this.abrirTelescopio=false;
  }
///////////////////////////////////////
}
