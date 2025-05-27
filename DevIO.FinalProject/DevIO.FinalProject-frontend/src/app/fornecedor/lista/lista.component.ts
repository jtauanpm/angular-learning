import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fornecedor } from '../models/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';
import { DocumentoFormatPipe, DocumentoPipe } from 'src/app/shared/pipes/documento.pipe';

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
      .subscribe(
        fornecedores => this.fornecedores = fornecedores,
        error => this.errorMessage);
  }
}
