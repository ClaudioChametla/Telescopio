import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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


export class LunaComponent implements OnInit{

  //Variables del cuestionario
  cuestionario:Boolean=false;
  lunaDatos:any;
  selector:number=0;
  puntaje:Number=0;
  seguir:Boolean=false;
  random:number=0;

  //Para mostrar u ocultar la pizarra
  hiddenGame:Boolean=true;


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.lunaDatos=luna;
    //Selecciona un numero aleatorio entre 1 y 4
    //Para seleccionar el cuestionario
    this.random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  }

  //oculta la pizarra
  salir(){
    this.hiddenGame=false;
  }

  //Muestra el cuestionario
  mostrarCuestionario(){
    this.cuestionario=true;
  }

  //Elige y obtiene el valor de la opción A
  opA(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }
  //Elige y obtiene el valor de la opción B
  opB(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }
  //Elige y obtiene el valor de la opción C
  opC(e:any){
    this.puntaje+=e;
    this.seguir=true;
  }

  //Envia hacía la siguiente pregunta
  siguientePregunta(){
    //Evalua si no es la ultima pregunta, son 10 preguntas en total
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

  //Este metodo lleva al componente sistema-solar
  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }

  //Este metodo crea u PDF con los resultados obtenidos
  imprimirResultados(){
    //Si el puntaje obtenido es mayor a 8 desbloquea la pizarra
    if(this.puntaje>8){
      this.hiddenGame=true;
    }
    //En esta variable se guarda el contenido que imprime el PDF
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
          image:this.lunaDatos[5].imagen,
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

/////////////////////////////////////////////

}
