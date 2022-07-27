import { Component, Input, OnInit } from '@angular/core';
import estrellas from '../../files/estrellas.json';
import { CctServiceService } from 'src/app/service/cct-service.service';

@Component({
  selector: 'app-tipo-estrella',
  templateUrl: './tipo-estrella.component.html',
  styleUrls: ['./tipo-estrella.component.scss']
})
export class TipoEstrellaComponent implements OnInit {

  @Input() selecEstrella:any;
  estrellaSelecDatos:any;

  constructor(private service:CctServiceService) { }

  ngOnInit(): void {
    this.estrellaSelecDatos=estrellas;
  }

  irEstrellas(){
    this.service.$estrella.emit(true);
  }

}
