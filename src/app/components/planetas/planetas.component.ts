import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import planetas from '../../files/planetas.json'


@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.scss']
})
export class PlanetasComponent implements OnInit {

  @Input() planetaSelected:any;
  planeta:any;


  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.planeta=planetas;
  }

  irSistema(){
    this.cctService.$sistemaSolar.emit(false);
  }

}
