import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [CommonModule, NgbModule, RouterModule]
})
export class MenuComponent {
  public isCollapsed = signal<boolean>(true);
}
