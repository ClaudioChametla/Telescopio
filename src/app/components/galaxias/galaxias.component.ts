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

  @Input() galaxiaSelected:any;
  galaxiasDatos:any;
  pdfText='';

  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.galaxiasDatos=galaxias;
  }

  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }

  irUniverso(){
    this.cctService.$universo.emit(true);
    //this.router.navigate(['/sistema-solar']);
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
        content:[{
          text:this.pdfText
        }]
      }
      pdfMake.createPdf(pdf).open();
    }
  }

}
