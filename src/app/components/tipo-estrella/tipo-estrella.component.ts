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
            text:this.estrellaSelecDatos[this.selecEstrella].clase,
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

/* const pdf:any = {
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
      }* */



  }
}
