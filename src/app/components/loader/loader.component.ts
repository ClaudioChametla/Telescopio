import { Component, OnInit } from '@angular/core';
import { CctServiceService } from 'src/app/service/cct-service.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  show: Boolean = false;

  constructor(private router: Router, private service: CctServiceService) {}

  ngOnInit(): void {
    this.service.$loader.subscribe((res: any) => {
      this.show = res;
    });
    /* this.router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this.show = true;
      }else if(event instanceof NavigationEnd){
        this.show=false;
      }
    }) */
  }
}
