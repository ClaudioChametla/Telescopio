import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';

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
  public width: number = 500;
  public height: number = 500;
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
  @HostListener('mouseup', ['$event'])
  outClick = (e: any) => {
    this.points = [];
    this.isAvaible = false;
  };

  constructor() {}

  ngOnInit(): void {
    console.log(this.color);
  }
  ngAfterViewInit(): void {
    //Llama al metodo que renderiza el canvas en este ciclo
    //de vida para que primero cargue la vista y asi
    //obtener luego el elemento
    this.render();
  }

  //Renderiza el canvas
  render() {
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.fillStyle = '#09112B';
    this.cx.fillRect(0, 0, this.width, this.height);
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

  //Limpia lo que esta en el canvas y vuelve a poner el fondo
  limpiarCanvas() {
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.fillRect(0, 0, this.width, this.height);
  }

  //Descarga lo que esta dibujado en el canvas
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

  //Calcula las coordenadas del canvas
  private write(res): any {
    const canvasEl: any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top,
    };
    //Llama al metodo que dibuja en el canvas
    this.writeSingle(prevPos);
  }

  //Crea un arreglo donde va ir insertando las coordenadas para general el dibujo
  private writeSingle(prevPos) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPos = this.points[this.points.length - 1];
      const currentPos = this.points[this.points.length - 2];
      this.drawOnCanvas(prevPos, currentPos);
    }
  }

  //Genera las lineas y las dibuja en el canvas de acuerdo a la posicion obtenida
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

  //Obtiene el color seleccionado del input y cambia el color del pincel del canvas y Grosor de pincel
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
}
