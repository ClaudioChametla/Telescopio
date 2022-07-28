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

  @Input() planetaSelected:any;
  planeta:any;
  pdfText='';


  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.planeta=planetas;
  }

  irSistema(){
    this.cctService.$sistemaSolar.emit(false);
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
}
