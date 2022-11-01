import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-ventana',
  templateUrl: './control-ventana.component.html',
  styleUrls: ['./control-ventana.component.scss'],
})
export class ControlVentanaComponent implements OnInit {
  @Input() dark: Boolean = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.dark);
  }
}
