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
  nombreEstrella: string = '';
  nombre: string = '';
  miEstrella: Boolean = false;
  mostrarEstrella: Boolean = false;
  rand: Number = 0;

  modalState: Boolean = false;

  lockKey: Boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //Recibe el nombre de la estrella lo valida
  //Seleccionara un numero aleatorio y mostrara la estrella
  irEstrella() {
    let input = document.getElementById('input-nombre');
    if (this.nombreEstrella === '') {
      input.classList.add('is-invalid');
    } else {
      this.nombre = this.nombreEstrella;
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      this.lockKey = true;
      this.cerrarModal();

      setTimeout(() => {
        input.classList.remove('is-valid');
        this.frase();
        this.lockKey = false;
      }, 500);
    }
  }

  frase() {
    this.mostrarEstrella = true;
    this.rand = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('rand', this.rand.toString());
  }
  salirFrase() {
    let modal = document.getElementById('modal-nombre');
    modal.classList.remove('animate__fadeInDown');
    modal.classList.add('animate__backOutUp');
    setTimeout(() => {
      modal.classList.remove('animate__backOutUp');
      this.mostrarEstrella = false;
    }, 1000);
  }

  //Muesta el componente estrellas
  irEstrellas() {
    this.router.navigate(['/estrellas']);
  }

  mostrarModal() {
    this.modalState = !this.modalState;
  }
  cerrarModal() {
    let modal = document.getElementById('modal-nombre');
    modal.classList.remove('animate__fadeInDown');
    modal.classList.add('animate__bounceOutUp');
    setTimeout(() => {
      modal.classList.remove('animate__bounceOutUp');
      this.nombreEstrella = '';
      this.modalState = !this.modalState;
    }, 1000);
  }
}
