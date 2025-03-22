import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarItem } from '../../interfaces/navbar-item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-navbar",
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  public navbarItems: NavbarItem[] = [
    { name: "Sobre", path: "/about", exact: true },
    { name: "Cadastro", path: "/cadastro" },
    { name: "Contato", path: "/contact" },
    { name: "Produtos", path: "/products" },
    { name: "Data Binding", path: "/databinding" },
    { name: "RxJS", path: "/rxjs" }
  ];
}