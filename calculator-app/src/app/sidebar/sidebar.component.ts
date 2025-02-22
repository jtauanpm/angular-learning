import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() linkClicked = new EventEmitter(); 

  functionLinkClicked(mode:string){
    this.linkClicked.emit(mode);
  }

  constructor() { }

  ngOnInit(): void { }

}
