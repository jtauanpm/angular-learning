import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MenuLoginComponent } from '../menu-login/menu-login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [CommonModule, NgbModule, RouterModule, MenuLoginComponent]
})
export class MenuComponent {
  public isCollapsed = signal<boolean>(true);
}
