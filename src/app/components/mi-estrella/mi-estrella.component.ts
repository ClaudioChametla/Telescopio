import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-estrella',
  templateUrl: './mi-estrella.component.html',
  styleUrls: ['./mi-estrella.component.scss']
})
export class MiEstrellaComponent implements OnInit {
  miEstrella=false;
  constructor() { }

  ngOnInit(): void {
  }

  mostrarMiEstrella(){
    this.miEstrella=true;
  }
}
