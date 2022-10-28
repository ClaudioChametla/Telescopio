import { Component, OnInit } from '@angular/core';
import estrellas from '../../files/estrellas.json';
import misestrellas from '../../files/misestrellas.json';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.scss'],
})
export class EstrellasComponent implements OnInit {
  mostrarEstrellas = true;
  estrellasDatos: any;
  estrellasSelec: any;
  nombre: string = 'Mi estrella';
  randNumber: number = 0;
  typeStar: any;

  constructor(private router: Router, private service: CctServiceService) {}

  ngOnInit(): void {
    this.service.$estrella.subscribe((res: any) => {
      this.mostrarEstrellas = res;
    });
    this.estrellasDatos = estrellas;
    this.revisarMiEstrella();
  }

  revisarMiEstrella() {
    this.nombre = localStorage.getItem('nombre');
    let rand = localStorage.getItem('rand');

    if (this.nombre == undefined || rand == undefined) {
      this.nombre = 'Mi estrella';
      this.typeStar = misestrellas[7];
    } else {
      this.randNumber = Number(rand);
      this.typeStar = misestrellas[this.randNumber];
      console.log(this.typeStar);
    }
  }

  irSistema() {
    this.router.navigate(['/sistema-solar']);
  }

  seleccion(event: any) {
    this.estrellasSelec = event;
    this.mostrarEstrellas = false;
  }

  naveMiEstrella() {
    this.service.$loader.emit(true);
    setTimeout(() => {
      this.service.$loader.emit(false);
      this.router.navigate(['mi-estrella']);
    }, 1500);
  }
}
