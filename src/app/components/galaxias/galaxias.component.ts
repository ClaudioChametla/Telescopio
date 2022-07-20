import { Component, Input, OnInit } from '@angular/core';
import galaxias from '../../files/galaxias.json'

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.scss']
})
export class GalaxiasComponent implements OnInit {

  @Input() galaxiaSelected:any;
  galaxiasDatos:any;
  //galaxiaMostrada:any;


  constructor() { }

  ngOnInit(): void {
    this.galaxiasDatos=galaxias;
    console.log(galaxias);
  }


}
