import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fornecedor } from '../models/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';
import { DocumentoFormatPipe } from '../../shared/pipes/documento.pipe';
import { catchError, first, tap } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  imports: [
    CommonModule,
    RouterModule,
    DocumentoFormatPipe
  ]
})
export class ListaComponent implements OnInit {

  public fornecedores!: Fornecedor[];
  errorMessage!: string;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.obterTodos()
    .pipe(
      first(),
      tap(result => this.fornecedores = result), 
      catchError(error => this.errorMessage)
    )
    .subscribe();
  }
}
