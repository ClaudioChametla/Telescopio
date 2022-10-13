import { Component, OnInit } from '@angular/core';
import estrellas from '../../files/estrellas.json';
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

  constructor(private router: Router, private service: CctServiceService) {}

  ngOnInit(): void {
    this.service.$estrella.subscribe((res: any) => {
      this.mostrarEstrellas = res;
    });
    this.estrellasDatos = estrellas;
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
