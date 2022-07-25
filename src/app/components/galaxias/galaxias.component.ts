import { Component, Input, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { Router } from '@angular/router';
import galaxias from '../../files/galaxias.json'

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.scss']
})
export class GalaxiasComponent implements OnInit {

  @Input() galaxiaSelected:any;
  galaxiasDatos:any;

  constructor(private router:Router,private cctService:CctServiceService) { }

  ngOnInit(): void {
    this.galaxiasDatos=galaxias;
    console.log(galaxias);
  }

  irSistema(){
    this.router.navigate(['/sistema-solar']);
  }

  irUniverso(){
    this.cctService.$universo.emit(true);
    //this.router.navigate(['/sistema-solar']);
  }
}
