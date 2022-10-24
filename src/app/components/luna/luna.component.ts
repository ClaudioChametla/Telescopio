import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import luna from '../../files/luna.json';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-luna',
  templateUrl: './luna.component.html',
  styleUrls: ['./luna.component.scss'],
})
export class LunaComponent implements OnInit {
  //Variables del cuestionario
  cuestionario: Boolean = false;
  lunaDatos: any;
  selector: number = 0;
  puntaje: number = 0;
  conteoPuntaje: number = 0;
  seguir: Boolean = false;
  random: number = 0;

  //Para mostrar u ocultar la pizarra
  hiddenGame: Boolean = false;
  btnAvaible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.lunaDatos = luna;
  }

  /** Oculta la pizarra*/
  salir() {
    this.hiddenGame = false;
    this.puntaje = 0;
  }

  /** Muestra el cuestionario */
  mostrarCuestionario() {
    /**Selecciona un numero aleatorio entre 1 y 4
    Para seleccionar el cuestionario
    */
    this.random = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    /* console.log(this.puntaje); */
    this.cuestionario = true;
    this.puntaje = 0;
    this.selector = 0;
  }

  /** Elige y obtiene el valor de la opción A
  @param e Recibe por medio de un evento el valor de la pregunta
  @param i Resibe el evento que despues se usa para extraer el nombre
  del boton al que se le esta haciendo click para poder agregarle estilos
  dependiendo si la respuesta es correcta o no
  */
  seleccionarOpcion(e: any, id: any) {
    let opcionId = id.target.id;
    let retro = document.getElementById(opcionId);
    if (e == 1) {
      retro.classList.add('btn-success');
      this.conteoPuntaje = 1;
      this.seguir = true;
      this.btnAvaible = true;
      //Espera para pasar a la siguiente pregunta
      setTimeout(() => {
        this.fadein();
        retro.classList.remove('btn-success');
        this.btnAvaible = false;
        this.siguientePregunta();
      }, 1000);
    } else {
      retro.classList.add('btn-fail');
      this.conteoPuntaje = 0;
      this.seguir = true;
      this.btnAvaible = true;
      //Espera para pasar a la siguiente pregunta
      setTimeout(() => {
        this.fadein();
        retro.classList.remove('btn-fail');
        this.btnAvaible = false;
        this.siguientePregunta();
      }, 1000);
    }
  }

  //fadein
  fadein() {
    let preguntas = document.getElementById('preguntas');
    preguntas.classList.add('fadein');
    setTimeout(() => {
      preguntas.classList.remove('fadein');
    }, 1000);
  }

  /** Este metodo contea el número de respuestas
   * y suma el puntaje del usuario
   */
  siguientePregunta() {
    //Evalua si no es la ultima pregunta, son 10 preguntas en total
    if (this.seguir === true) {
      this.puntaje += this.conteoPuntaje;
      /* console.log('Puntaje',this.puntaje); */
      if (this.selector < 9) {
        this.selector = this.selector + 1;
        this.seguir = false;
        /* console.log('Contador numero preguntas',this.selector); */
      } else {
        Swal.fire({
          title:
            '<strong>¡ Lo lograste! <u>Tu puntaje es de </u></strong>' +
            this.puntaje,
          icon: 'info',
          showDenyButton: true,
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Imprimir Resultado',
          denyButtonText: `Salir`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Impreso', '', 'success');
            this.imprimirResultados();
            this.cuestionario = false;
          } else if (result.isDenied) {
            this.salirCuestionario();
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oh no',
        text: 'Aun no haz elegido una respuesta',
        footer: 'Elige una respuesta y vuelve a intentarlo',
      });
    }
  }

  /**Este metodo lleva al componente sistema-solar*/
  irSistema() {
    this.router.navigate(['/sistema-solar']);
  }

  /**Este metodo te muestra la pantalla de bienvenida del formulario*/
  salirCuestionario() {
    this.cuestionario = false;
    this.puntaje = 0;
  }

  /**
   * @author ClaudioChametla
   * @param ran el numero aleatorio para recorrer el arreglo
   * @returns devuelve en un arreglo las preguntas y respuestas
   * Metodo para obtener la hoja de respuestas */

  private obtenerHoja(ran: number) {
    let answer = [];
    for (const element of this.lunaDatos[ran]) {
      if (element.opciones[0].value == 1) {
        answer.push(element.opciones[0].opcion);
      } else if (element.opciones[1].value == 1) {
        answer.push(element.opciones[1].opcion);
      } else if (element.opciones[2].value == 1) {
        answer.push(element.opciones[2].opcion);
      }
    }
    for (const element of this.lunaDatos[ran]) {
      answer.push(element.pregunta);
    }
    return answer;
  }

  /**Este metodo crea un PDF con los resultados obtenidos*/
  imprimirResultados() {
    let mensajePuntaje: string = '';

    //Si el puntaje obtenido es mayor a 9 desbloquea la pizarra
    //Mensaje cambia segun la puntuacion
    switch (this.puntaje) {
      case 10:
      case 9:
        this.hiddenGame = true;
        mensajePuntaje = '¡¡¡ Muchas felicidades !!!, Excelente trabajo';
        break;
      case 8:
      case 7:
      case 6:
        mensajePuntaje = '¡Bien hecho!';
        break;
      default:
        mensajePuntaje = 'No te rindas, sigue intentandolo :)';
        break;
    }

    //Invoca al metodo que contiene los resultados
    let results = this.obtenerHoja(this.random);

    //En esta variable se guarda el contenido que imprime el PDF
    const pdf: any = {
      background: [
        {
          image: this.lunaDatos[6].imagen,
          width: 600,
          height: 845,
        },
      ],
      content: [
        {
          text: 'Hoja de resultados:\n\n',
          style: 'header',
        },
        {
          text: [
            '' + mensajePuntaje + '\n\n',
            'Haz obtenido una puntuación de: ' + this.puntaje + '\n\n',
          ],
        },
        {
          text: [
            'Hoja de Repuestas: \n\n',
            '1.-' + results[10] + '\n',
            'Respuesta: ' + results[0] + ' \n\n',

            '2.-' + results[11] + '\n',
            'Respuesta: ' + results[1] + ' \n\n',

            '3.-' + results[12] + '\n',
            'Respuesta: ' + results[2] + ' \n\n',

            '4.-' + results[13] + '\n',
            'Respuesta: ' + results[3] + ' \n\n',

            '5.-' + results[14] + '\n',
            'Respuesta: ' + results[4] + ' \n\n',

            '6.-' + results[15] + '\n',
            'Respuesta: ' + results[5] + ' \n\n',

            '7.-' + results[16] + '\n',
            'Respuesta: ' + results[6] + ' \n\n',

            '8.-' + results[17] + '\n',
            'Respuesta: ' + results[7] + ' \n\n',

            '9.-' + results[18] + '\n',
            'Respuesta: ' + results[8] + ' \n\n',

            '10.-' + results[19] + '\n',
            'Respuesta: ' + results[9] + ' \n\n',
          ],
        },

        {
          image: this.lunaDatos[5].imagen,
          width: 460,
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
/* {
  text: 'Plandi - Plataformas Educativas ©',
  style: ['quote', 'small'],
}, */
