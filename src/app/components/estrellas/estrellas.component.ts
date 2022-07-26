import { Component, OnInit } from '@angular/core';
import estrellas from '../../files/estrellas.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.scss']
})
export class EstrellasComponent implements OnInit {

  estrellasDatos:any;

  constructor(private router:Router) { }


  ngOnInit(): void {
    this.estrellasDatos=estrellas;
  }

  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }
}
