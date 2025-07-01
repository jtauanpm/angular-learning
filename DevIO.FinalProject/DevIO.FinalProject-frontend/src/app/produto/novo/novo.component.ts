import { Component, ElementRef, OnInit, viewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { Fornecedor, Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyDirective]
})
export class NovoComponent implements OnInit {
  formInputElements = viewChildren(FormControlName, { read: ElementRef })

  produto!: Produto;
  fornecedores!: Fornecedor[];
  errors: any[] = [];
  produtoForm!: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  formResult: string = '';

  mudancasNaoSalvas!: boolean;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      imagem: {
        required: 'Informe a Imagem',
      },
      valor: {
        required: 'Informe o Valor',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.produtoService.obterFornecedores()
      .subscribe({
        next: (fornecedores: Fornecedor[]) => this.fornecedores = fornecedores,
        error: (error: any) => this.processarFalha(error)
      });

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements()
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
      this.mudancasNaoSalvas = true;
    });
  }

  adicionarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
      this.formResult = JSON.stringify(this.produto);

      this.produtoService.novoProduto(this.produto)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error?.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }  
}

