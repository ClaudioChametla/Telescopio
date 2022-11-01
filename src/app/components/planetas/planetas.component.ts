import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import planetas from '../../files/planetas.json';
import luna from '../../files/luna.json';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.scss'],
})
export class PlanetasComponent implements OnInit {
  //Valor de planeta seleccionado
  @Input() planetaSelected: any;
  planeta: any;
  //Texto del PDF
  pdfText = '';
  //Varibles Telescopio
  informacion: any = [];
  abrirTelescopio = false;

  constructor(private router: Router, private cctService: CctServiceService) {}

  ngOnInit(): void {
    this.planeta = planetas;
    this.informacion.push(
      this.planeta[this.planetaSelected].image,
      this.planeta[this.planetaSelected].name,
      this.planeta[this.planetaSelected].desc
    );
  }

  //Este metodo te lleva al componente sistema-solar
  irSistema() {
    if (this.pdfText !== '') {
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
      });
    } else {
      this.cctService.$sistemaSolar.emit(false);
    }
  }

  //Este metodo carga el componente de la lunna
  irLuna() {
    if (this.pdfText !== '') {
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
      });
    } else {
      this.router.navigate(['/luna']);
    }
  }

  //Crea el pdf
  createPDF() {
    if (this.pdfText == '') {
      Swal.fire({
        icon: 'error',
        title: 'Texto vacío',
        text: 'Parece que nos haz escrito nada aún',
        footer: ':)',
        timer: 1500,
      });
    } else {
      const pdf: any = {
        background: [
          {
            image: luna[6].imagen,
            width: 600,
            height: 845,
          },
        ],
        content: [
          {
            text: this.planeta[this.planetaSelected].name,
            style: 'header',
          },
          {
            text: this.pdfText,
          },
          {
            image: this.planeta[this.planetaSelected].image,
            width: 300,
          },
          {
            text: 'Plandi - Plataformas Educativas ©',
            style: ['quote', 'small'],
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
          },
          quote: {
            italics: true,
          },
          small: {
            fontSize: 8,
          },
        },
      };
      pdfMake.createPdf(pdf).open();
    }
  }

  //Muestra el componente telescopio en el DOM

  mostrarTelescopio() {
    if (this.pdfText !== '') {
      Swal.fire({
        title: '¿Desea continuar? perdera sus cambios',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.abrirTelescopio = true;
        } else if (result.isDenied) {
        }
      });
    } else {
      this.abrirTelescopio = true;
    }
  }
  //Regresa la variable abrirTelescopio a false y muestra el planeta
  ocultarTelescopio() {
    this.abrirTelescopio = false;
  }
  ///////////////////////////////////////
}
