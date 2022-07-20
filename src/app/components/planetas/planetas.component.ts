import { Component, Input, OnInit } from '@angular/core';
import planetas from '../../files/planetas.json'

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.scss']
})
export class PlanetasComponent implements OnInit {

  @Input() planetaSelected:any;
  planeta:any;


  constructor() { }

  ngOnInit(): void {
    this.planeta=planetas;


  }

}
