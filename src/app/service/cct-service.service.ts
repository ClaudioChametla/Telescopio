import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CctServiceService {
  constructor() {}
  $sistemaSolar = new EventEmitter<any>();
  $universo = new EventEmitter<any>();
  $estrella = new EventEmitter<any>();
  $loader = new EventEmitter<any>();
}
