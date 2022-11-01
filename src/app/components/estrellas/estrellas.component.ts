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
  mostrarEstrellas: Boolean = true;
  mostrarResumen: Boolean = false;
  estrellasDatos: any;
  estrellasSelec: any;
  nombre: string = 'Mi estrella';
  randNumber: number = 0;
  typeStar: any;
  telescopeMyStar: Array<any> = [];
  abrirTelescopio: Boolean = false;

  constructor(private router: Router, private service: CctServiceService) {}

  ngOnInit(): void {
    this.service.$estrella.subscribe((res: any) => {
      this.mostrarEstrellas = res;
      if (this.mostrarEstrellas == true) {
        this.mostrarResumen = false;
      }
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
      this.telescopeMyStar.push(
        misestrellas[7].image,
        misestrellas[7].clase,
        misestrellas[7].desc
      );
    } else {
      this.randNumber = Number(rand);
      this.typeStar = misestrellas[this.randNumber];
      this.telescopeMyStar.push(
        misestrellas[this.randNumber].image,
        misestrellas[this.randNumber].clase,
        misestrellas[this.randNumber].desc
      );
      console.log(this.telescopeMyStar);
    }
  }

  irSistema() {
    this.router.navigate(['/sistema-solar']);
  }

  seleccion(event: any) {
    this.estrellasSelec = event;
    this.mostrarEstrellas = false;
    this.mostrarResumen = true;
  }

  naveMiEstrella() {
    this.service.$loader.emit(true);
    setTimeout(() => {
      this.service.$loader.emit(false);
      this.router.navigate(['mi-estrella']);
    }, 1500);
  }

  mostrarTelescopio() {
    this.abrirTelescopio = true;
    this.mostrarEstrellas = false;
  }
  ocultarTelescopio() {
    this.abrirTelescopio = false;
    this.mostrarEstrellas = true;
  }
}
