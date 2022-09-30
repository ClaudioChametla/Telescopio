import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-telescopio',
  templateUrl: './telescopio.component.html',
  styleUrls: ['./telescopio.component.scss']
})
export class TelescopioComponent implements OnInit {

  @Input() datos:any;

  imgID = "https://images8.alphacoders.com/601/601973.jpg";


  constructor() { }

  ngOnInit(): void {
    console.log(this.datos);

    this.magnify("myimage");
  }

  magnify(imgID) {
    let zoom = 3 ;
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /*Crea la lupa*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    /*Inserta la lupa*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + this.datos[0]+ "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    //Se abre o se cierra el circulo
    let open = document.getElementById("open")
    open.addEventListener("click", abrir);
    let close = document.getElementById("close")
    close.addEventListener("click", cerrar);

    //zoom
    let aumentar = document.getElementById("aumentar");
    aumentar.addEventListener("click",zoomMas)

    let disminuir = document.getElementById("disminuir");
    disminuir.addEventListener("click",zoomMenos)


    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
      /*set the position of the magnifier glass:*/
      glass.style.left = x - w + "px";
      glass.style.top = y - h + "px";
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition =
        "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }

    function abrir(){
      glass.style.width="350px"
      glass.style.height="350px"
      glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;

    }
    function cerrar(){
      glass.style.width="250px"
      glass.style.height="250px"
      glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
    }

    function zoomMas(){
      zoom=4;
      glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
    }


    function zoomMenos(){
      zoom=2;
      glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
    }

  }



}
