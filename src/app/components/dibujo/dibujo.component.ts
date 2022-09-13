import { Component, OnInit,AfterViewInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-dibujo',
  templateUrl: './dibujo.component.html',
  styleUrls: ['./dibujo.component.scss']
})
export class DibujoComponent implements OnInit, AfterViewInit {


  image= new Image();
  canvasCopy:any;
  color='#FFFFFF';

  @ViewChild('canvasRef',{static:false}) canvasRef:any;
  isAvaible:Boolean;
  public width = 700;
  public height= 700;
  private points:Array<any> = [];
  cx: CanvasRenderingContext2D;

  @HostListener('document:mousemove',['$event'])
  onMoveMouse=(e:any)=>{
    if(e.target.id === 'canvasId' && (this.isAvaible)){
      this.write(e);
    }
  }

  @HostListener('click',['$event'])
  onClick=(e:any)=>{
    this.points=[];
    if(e.target.id === 'canvasId'){
      this.isAvaible = !this.isAvaible;
    }
  }


  constructor() { }

  ngOnInit(): void {
    console.log(this.color);

  }
  ngAfterViewInit():void{
    this.render();
  }

  render(){
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

  limpiarCanvas(){
    this.cx.clearRect(0,0,this.width,this.height);
  }


  descargar(e:any){
    e.stopPropagation();
    let dibujo: any = document.getElementById('dibujo');
    this.canvasCopy=this.canvasRef;
    const canvasEl = this.canvasRef.nativeElement;
    this.image.src = canvasEl.toDataURL('img/png');
    dibujo!.href = this.image.src;
    dibujo!.download = "ElLadoOscuroDeLaLuna.png"
    console.log(this.image);

  }

  salir(){
    /* this.hiddenGame=false; */
  }



  private write(res):any{
    const canvasEl:any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    };
    this.writeSingle(prevPos);
  }
  private writeSingle(prevPos){
    this.points.push(prevPos);
    if(this.points.length>3){
      const prevPos =  this.points[this.points.length -1];
      const currentPos = this.points[this.points.length -2];
      this.drawOnCanvas(prevPos, currentPos);

    }
  }
  private drawOnCanvas(prevPos:any, currentPos:any){
    if(!this.cx){
      return;
    }
    this.cx.beginPath();
    if(prevPos){
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  colorSelected(){
    let color:any = document.getElementById('selectorColor');
    this.color = color.value;
    console.log(this.color);

    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;
  }

}
