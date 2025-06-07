import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { catchError, first, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  produtos!: Produto[];
  errorMessage!: string;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.obterTodos()
    .pipe(
      first(), 
      tap(produtos => this.produtos = produtos), 
      catchError(() => this.errorMessage)
    ).subscribe();
  }
}
