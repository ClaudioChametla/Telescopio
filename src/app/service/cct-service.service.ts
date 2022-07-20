import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CctServiceService {

  constructor() {}

  $sistemaSolar = new EventEmitter<any>();

}
