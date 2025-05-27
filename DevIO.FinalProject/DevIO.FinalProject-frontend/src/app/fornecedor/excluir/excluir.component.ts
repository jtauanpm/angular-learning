import { Component, OnInit, inject, signal } from '@angular/core';
import { Fornecedor } from '../models/fornecedor.model';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ExcluirComponent implements OnInit {
  private fornecedorService = inject(FornecedorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  fornecedor = signal<Fornecedor>({} as Fornecedor);

  constructor() {
    this.fornecedor.set(this.route.snapshot.data['fornecedor']);
  }

  ngOnInit() {
    // ... rest of the code ...
  }

  excluir() {
    this.fornecedorService.excluirFornecedor(this.fornecedor().id)
      .subscribe({
        next: () => this.processarSucesso(),
        error: (falha) => this.processarFalha(falha)
      });
  }

  processarSucesso() {
    const toast = this.toastr.success('Fornecedor excluído com sucesso!', 'Sucesso!', {
      progressBar: true
    });
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
