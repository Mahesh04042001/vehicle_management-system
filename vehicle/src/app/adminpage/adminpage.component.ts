import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
// @Output() toggleSidebarforMe:EventEmitter<any>=new EventEmitter()
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  // toggleSidebar(){
  //   this.toggleSidebarforMe.emit();
  // }

}
