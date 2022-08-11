import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-estrella',
  templateUrl: './mi-estrella.component.html',
  styleUrls: ['./mi-estrella.component.scss']
})
export class MiEstrellaComponent implements OnInit {
  nombreEstrella='';
  miEstrella=false;
  mostrarEstrella=false;
  constructor() { }

  ngOnInit(): void {
  }

  mostrarMiEstrella(){
    this.miEstrella=true;
  }
  irEstrella(){
    if(this.nombreEstrella===''){
      Swal.fire({
        icon: 'error',
        title: 'Ups',
        text: 'Aun no se ha escrito nada',
      })
    }else{
      this.miEstrella=false;
      this.mostrarEstrella=true;

    }
  }
}
