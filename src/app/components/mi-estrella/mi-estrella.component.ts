import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import miEstrella from '../../files/miEstrella.json';

@Component({
  selector: 'app-mi-estrella',
  templateUrl: './mi-estrella.component.html',
  styleUrls: ['./mi-estrella.component.scss']
})
export class MiEstrellaComponent implements OnInit {
  miEstrellaDatos=miEstrella;
  nombreEstrella='';
  miEstrella=false;
  mostrarEstrella=false;
  rand:Number=0;
  constructor(private router:Router) { }

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
      this.rand = Math.floor(Math.random()*6);
        console.log(this.rand);
    }
  }
  irEstrellas(){
    this.router.navigate(['/estrellas']);
  }
}
