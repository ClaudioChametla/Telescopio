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
  imageDraw: any = new Image();
  //Copia del Canvas
  canvasCopy: any;
  //Variable para color
  color: string = '#FFFFFF';
  grosor: number = 5;

  //Obtiene el elemento canvas
  //El elemento no es estatico
  //Asignamos la variable canvasRef de tipo 'any'
  @ViewChild('canvasRef', { static: false }) canvasRef: any;
  canvasEl: any;
  canvasId: any;
  base64: any;
  isAvaible: Boolean;
  width: any;
  height: any;
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

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    /**Llama al metodo que renderiza el canvas en este
     * ciclo de vida para que primero cargue la vista
     * y asi obtener luego el elemento*/
    this.render();
  }

  /**Renderiza el canvas*/
  render() {
    this.canvasEl = this.canvasRef.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    var canvas = document.getElementById('canvasId');
    this.canvasId = canvas.id;

    this.cx.fillStyle = '#09112B';
    var s = getComputedStyle(this.canvasEl);
    let xwidth = s.width;
    let xheight = s.height;

    xwidth = this.canvasEl.width = xwidth.split('px')[0];
    xheight = this.canvasEl.height = xheight.split('px')[0];
    let x: number = +xwidth;
    let y: number = +xheight;
    console.log(x);
    console.log(y);

    this.cx.fillStyle = '#09112B';
    this.cx.fillRect(0, 0, x, y);
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
    console.log(this.color);
    if (this.base64 != null) {
      this.imageDraw.src = this.base64;
      this.cx.drawImage(this.imageDraw, 0, 0, x, y);
    }
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
        this.render();
      } else if (result.isDenied) {
      }
    });
  }

  /**escarga lo que esta dibujado en el canvas*/
  descargar(e: any) {
    e.stopPropagation();
    let dibujo: any = document.getElementById('dibujo');
    this.canvasCopy = this.canvasRef;
    this.canvasEl = this.canvasRef.nativeElement;
    this.image.src = this.canvasEl.toDataURL('img/png');
    dibujo!.href = this.image.src;
    dibujo!.download = 'Mi dibujo en la luna.png';
    console.log(this.image);
  }

  /**Calcula las coordenadas del canvas*/
  write(res): any {
    this.canvasEl = this.canvasRef.nativeElement;
    const rect = this.canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top,
    };
    /**lama al metodo que dibuja en el canvas*/
    this.writeSingle(prevPos);
  }

  /**Crea un arreglo donde va ir insertando las coordenadas para general el dibujo*/
  writeSingle(prevPos) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPos = this.points[this.points.length - 1];
      const currentPos = this.points[this.points.length - 2];
      this.drawOnCanvas(prevPos, currentPos);
    }
  }

  /**Genera las lineas y las dibuja en el canvas de acuerdo a la posicion obtenida*/
  drawOnCanvas(prevPos: any, currentPos: any) {
    if (!this.cx) {
      return;
    }
    this.cx.beginPath();
    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
      this.cx.save();
      this.canvasEl = this.canvasRef.nativeElement;
      this.base64 = this.canvasEl.toDataURL('image/png', 1);
      //console.log(this.base64);
    }
  }

  /**btiene el color seleccionado del input y cambia el color del pincel del canvas y Grosor de pincel*/
  configSelected() {
    let color: any = document.getElementById('selectorColor');
    this.color = color.value;
    console.log(this.color);
    this.canvasEl = this.canvasRef.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

  onResize(event) {
    this.render();
  }

  /* borrar() {
    this.color = '#09112B';
    const this.canvasEl = this.canvasRef.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  } */

  /**Color de pincel */
  setColor(event) {
    let colorSelected = event.target.id;
    switch (colorSelected) {
      case 'verde':
        this.color = '#BAD616';
        break;
      case 'azul':
        this.color = '#28BEF9';
        break;
      case 'morado':
        this.color = '#7A54FF';
        break;
      case 'rosa':
        this.color = '#E2338F';
        break;
      case 'melon':
        this.color = '#FF5E85';
        break;
      default:
        this.color = '#ffffff';
        break;
    }
    this.canvasEl = this.canvasRef.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }
  /**Grosor de pincel */
  setGrosor(event) {
    let grosorSelected = event.target.id;
    switch (grosorSelected) {
      case 'xsmall':
        this.grosor = 2;
        break;
      case 'small':
        this.grosor = 5;
        break;
      case 'mid':
        this.grosor = 10;
        break;
      case 'big':
        this.grosor = 15;
        break;
      default:
        this.grosor = 2;
        break;
    }
    this.canvasEl = this.canvasRef.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.lineWidth = this.grosor;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }
}
