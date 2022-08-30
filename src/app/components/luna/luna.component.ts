import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import luna from '../../files/luna.json'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-luna',
  templateUrl: './luna.component.html',
  styleUrls: ['./luna.component.scss']
})

export class LunaComponent implements OnInit {
  cuestionario=false;
  lunaDatos:any;
  selector=0;
  puntaje=0;
  seguir=false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.lunaDatos=luna;
    /* console.log(this.lunaDatos[10].imagen); */
  }

  mostrarCuestionario(){
    this.cuestionario=true;
  }

  opA(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }
  opB(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }
  opC(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }

  siguientePregunta(){
    if(this.seguir===true){
      if(this.selector < 9){
        this.selector=this.selector+1;
        this.seguir=false;
      }else{
        Swal.fire({
          title: '<strong>¡ Lo lograste! <u>Tu puntaje es de </u></strong>' + this.puntaje,
          icon: 'info',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Imprimir Resultado',
          denyButtonText: `Salir`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Impreso', '', 'success')
            this.imprimirResultados();
            this.cuestionario=false;
          } else if (result.isDenied) {

            this.irSistema();
          }
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oh no',
        text: 'Aun no haz elegido una respuesta',
        footer: 'Elige una respuesta y vuelve a intentarlo'
      })
    }

  }

  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }


  imprimirResultados(){
    const pdf:any = {
      content:[
        {
          text:'¡Quizz de preguntas en la Luna!',
        style:'header'
        },
        {
        text:['Muchas felicidades\n',
          'Haz obtenido una puntuación de: '+this.puntaje+'\n\n']
        },
        {
          text:['Hoja de Repuestas: \n\n',
            '1.-¿Cual es el llamado Planeta Rojo? \n',
            'Respuesta: Marte \n\n',

            '2.-¿Cual es el llamado Planeta Gigante Gaseoso? \n',
            'Respuesta: Jupiter \n\n',

            '3.-¿Que es un año luz? \n',
            'Respuesta: Es una unidad de medida en distancia utilizada en astronomía \n\n',

            '4.-¿Dónde termina el Sistema Solar? \n',
            'Respuesta: Pasando la nube Oort \n\n',

            '5.-¿Cuál es la estrella más cercana a la tierra? \n',
            'Respuesta: El sol \n\n',

            '6.-¿Cuál es la galaxia más cercana? \n',
            'Respuesta: Enana del Can Mayor \n\n',

            '7.-¿De tipo de estrella es nuestro sol? \n',
            'Respuesta: De tipo G \n\n',

            '8.-¿Cuál es la llamada Galaxia del pingüino? \n',
            'Respuesta: NGC 2936 \n\n',

            '9.-¿Cuanto tarda la luna luna en dar una vuelta al rededor de la tierra? \n',
            'Respuesta: 28 días \n\n',

            '10.-¿Que fenómenos del planeta tierra estan influenciados por la luna? \n',
            'Respuesta: Las mareas y el clima \n\n\n',

          ]
          },
        {
          image:this.lunaDatos[10].imagen,
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
    pdfMake.createPdf(pdf).open();
  }


}
