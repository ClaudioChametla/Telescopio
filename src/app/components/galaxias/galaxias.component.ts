import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import galaxias from '../../files/galaxias.json';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.scss'],
})
export class GalaxiasComponent implements OnInit {
  //Valor de la Galaxia seleccionada
  @Input() galaxiaSelected: any;
  //Recibe los datos del JSON galaxias
  galaxiasDatos: any;
  //Recibe el texto ingresado del usuario
  pdfText: string = '';
  //estilo de textbox
  textBoxStyle: Boolean = false;
  //Telescopio
  informacion = [];
  //Varibles Telescopio
  abrirTelescopio = false;

  title: String = '';

  constructor(private router: Router, private cctService: CctServiceService) {}

  ngOnInit(): void {
    this.galaxiasDatos = galaxias;
    /**Inserta en un arreglo los datos que seran usados por el componente telescopio*/
    this.informacion.push(
      this.galaxiasDatos[this.galaxiaSelected].image,
      this.galaxiasDatos[this.galaxiaSelected].name
    );
    /**Separar letras para pintarlas de diferentes colores*/
    this.title = this.galaxiasDatos[this.galaxiaSelected].name.split(' ');
  }

  /**Este metodo te lleva al componente sistema-solar*/
  irSistema() {
    if (this.pdfText !== '') {
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
      });
    } else {
      this.naveSistemaSolar();
    }
  }

  /** Carga la animacion de la nave
  para hacer la transicion*/
  naveSistemaSolar() {
    this.cctService.$loader.emit(true);
    setTimeout(() => {
      this.cctService.$loader.emit(false);
      this.router.navigate(['/sistema-solar']);
    }, 1500);
  }

  /**Metodo que te lleva a conponente universo */
  irUniverso() {
    //Emite un TRUE para ocultar componente Galaxias
    if (this.pdfText !== '') {
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
      });
    } else {
      this.cctService.$universo.emit(true);
    }
  }

  /**Genera el documento PDF asignandole el texto que a ingresado el usuario */
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
      /**Se contruye el PDF
       * La imagen que se le pasa esta en BASE 64*/
      const pdf: any = {
        content: [
          {
            text: this.galaxiasDatos[this.galaxiaSelected].name,
            style: 'header',
          },
          {
            text: this.pdfText,
          },
          {
            image: this.galaxiasDatos[this.galaxiaSelected].image,
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
      //Crea y abre el PDF en nueva ventana
      pdfMake.createPdf(pdf).open();
    }
  }

  ///////////////////////////////////////

  /**Muestra la pantalla del telescopio*/
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
  ocultarTelescopio() {
    this.abrirTelescopio = false;
  }
}
