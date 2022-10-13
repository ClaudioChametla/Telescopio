import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import miEstrella from '../../files/miEstrella.json';

@Component({
  selector: 'app-mi-estrella',
  templateUrl: './mi-estrella.component.html',
  styleUrls: ['./mi-estrella.component.scss'],
})
export class MiEstrellaComponent implements OnInit {
  //Json imagenes de estrellas y frase de atrofisicos
  miEstrellaDatos: any = miEstrella;
  nombreEstrella: String = '';
  miEstrella: Boolean = false;
  mostrarEstrella: Boolean = false;
  rand: Number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //Muestra la estrella
  mostrarMiEstrella() {
    this.miEstrella = true;
  }

  //Recibe el nombre de la estrella lo valida
  //Seleccionara un numero aleatorio y mostrara la estrella
  irEstrella() {
    if (this.nombreEstrella === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ups',
        text: 'Aun no se ha escrito nada',
      });
    } else {
      this.miEstrella = false;
      this.mostrarEstrella = true;
      this.rand = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    }
  }
  //Mesyta el componente estrellas
  irEstrellas() {
    this.router.navigate(['/estrellas']);
  }
}
