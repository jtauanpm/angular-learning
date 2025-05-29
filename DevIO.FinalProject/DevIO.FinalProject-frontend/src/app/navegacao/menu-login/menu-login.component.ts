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
  private router = inject(Router);


  usuarioLogado(): boolean {
    this.token = LocalStorageUtils.obterTokenUsuario();
    this.user = LocalStorageUtils.obterUsuario();

    if (this.user) {
      this.email = this.user.email;
    }

    return this.token !== null;
  }

  logout() {
    LocalStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }
}
