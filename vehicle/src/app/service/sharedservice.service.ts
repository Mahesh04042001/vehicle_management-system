import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  searchText:any;
  showTag:any;
  primaryCheck:number=0;
  storeValidation:any=[];
  constructor() { }
}
