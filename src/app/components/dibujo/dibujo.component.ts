import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dibujo',
  templateUrl: './dibujo.component.html',
  styleUrls: ['./dibujo.component.scss'],
})
export class DibujoComponent implements OnInit, AfterViewInit {
  //Imagen para descargar
  image: any = new Image();
  //Copia del Canvas
  canvasCopy: any;
  //Variable para color
  color: string = '#FFFFFF';
  grosor: number = 5;

  //Obtiene el elemento canvas
  //El elemento no es estatico
  //Asignamos la variable canvasRef de tipo 'any'
  @ViewChild('canvasRef', { static: false }) canvasRef: any;
  isAvaible: Boolean;
  public width: number = 700;
  public height: number = 700;
  private points: Array<any> = [];
  cx: CanvasRenderingContext2D;

  //Dibuja sobre el canvas
  @HostListener('document:mousemove', ['$event'])
  onMoveMouse = (e: any) => {
    if (e.target.id === 'canvasId' && this.isAvaible) {
      this.write(e);
    }
  };
  //Detecta el click sobre el canvas y habilita si se dibuja o no
  @HostListener('mousedown', ['$event'])
  onClick = (e: any) => {
    this.points = [];
    this.isAvaible = true;
  };
  //Soltar click
  @HostListener('mouseup', ['$event'])
  outClick = (e: any) => {
    this.points = [];
    this.isAvaible = false;
  };

  /**Detecta el cambio tamaño de la pantalla y ajusta el canvas
   * @param $event
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    //debounce resize, wait for resize to finish before doing stuff
    console.log(event.target.innerWidth);
    let key = event.target.innerWidth;
    if (key > 1400) {
      this.width = 700;
      this.height = 700;
    } else if (key > 1200) {
      this.width = 600;
      this.height = 600;
    } else if (key > 992) {
      this.width = 500;
      this.height = 500;
    } else if (key > 768) {
      this.width = 400;
      this.height = 400;
    } else if (key > 576) {
      this.width = 300;
      this.height = 300;
    } else {
      this.width = 200;
      this.height = 200;
    }
  }
  /**Detecta el tamaño de la pantalla y ajusta el canvas
   * @param $event
   */
  @HostListener('window:load', ['$event'])
  onWindowLoad(event: any) {
    //debounce resize, wait for resize to finish before doing stuff
    let key = event.currentTarget.innerWidth;
    if (key > 1400) {
      this.width = 700;
      this.height = 700;
    } else if (key > 1200) {
      this.width = 600;
      this.height = 600;
    } else if (key > 992) {
      this.width = 500;
      this.height = 500;
    } else if (key > 768) {
      this.width = 400;
      this.height = 400;
    } else if (key > 576) {
      this.width = 300;
      this.height = 300;
    } else {
      this.width = 200;
      this.height = 200;
    }
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.color);
  }
  ngAfterViewInit(): void {
    /**Llama al metodo que renderiza el canvas en este
     * ciclo de vida para que primero cargue la vista
     * y asi obtener luego el elemento*/
    this.render();
  }

  /**Renderiza el canvas*/
  render() {
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.fillStyle = '#09112B';
    this.cx.fillRect(0, 0, this.width, this.height);
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

  /**Limpia lo que esta en el canvas y vuelve a poner el fondo*/
  limpiarCanvas() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cx.clearRect(0, 0, this.width, this.height);
        this.cx.fillRect(0, 0, this.width, this.height);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  /**escarga lo que esta dibujado en el canvas*/
  descargar(e: any) {
    e.stopPropagation();
    let dibujo: any = document.getElementById('dibujo');
    this.canvasCopy = this.canvasRef;
    const canvasEl = this.canvasRef.nativeElement;
    this.image.src = canvasEl.toDataURL('img/png');
    dibujo!.href = this.image.src;
    dibujo!.download = 'Mi dibujo en la luna.png';
    console.log(this.image);
  }

  salir() {
    /* this.hiddenGame=false; */
  }

  /**Calcula las coordenadas del canvas*/
  private write(res): any {
    const canvasEl: any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top,
    };
    /**lama al metodo que dibuja en el canvas*/
    this.writeSingle(prevPos);
  }

  /**Crea un arreglo donde va ir insertando las coordenadas para general el dibujo*/
  private writeSingle(prevPos) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPos = this.points[this.points.length - 1];
      const currentPos = this.points[this.points.length - 2];
      this.drawOnCanvas(prevPos, currentPos);
    }
  }

  /**Genera las lineas y las dibuja en el canvas de acuerdo a la posicion obtenida*/
  private drawOnCanvas(prevPos: any, currentPos: any) {
    if (!this.cx) {
      return;
    }
    this.cx.beginPath();
    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  /**btiene el color seleccionado del input y cambia el color del pincel del canvas y Grosor de pincel*/
  configSelected() {
    let color: any = document.getElementById('selectorColor');
    this.color = color.value;
    console.log(this.color);
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

  /* borrar() {
    this.color = '#09112B';
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  } */
}
