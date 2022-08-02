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
  abrirTelescopio=false;
  zoom=30;
  zoomN=50;

  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.galaxiasDatos=galaxias;
  }

  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }

  irUniverso(){
    //Emite un TRUE para ocultar componente Galaxias
    this.cctService.$universo.emit(true);
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


/* see(e:any){
  HTML
  (window:resize)="see($event)"
  HTMLEND
  console.log(e.target.innerWidth);

}
 */
