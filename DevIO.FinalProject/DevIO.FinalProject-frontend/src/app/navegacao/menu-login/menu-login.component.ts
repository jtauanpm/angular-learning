import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageUtils } from '../../utils/local-storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MenuLoginComponent {

  token: string | null = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();
  private router = inject(Router);


  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user) {
      this.email = this.user.email;
    }

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }
}
