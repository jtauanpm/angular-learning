import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, signal, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';
import { CpfValidator } from '../../utils/cpf-validator';
import { NgxMaskDirective } from 'ngx-mask';
import { CnpjValidator } from '../../utils/cnpj-validator';
import { CepConsulta } from '../models/endereco.model';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective
  ]
})
export class NovoComponent implements OnInit {
  private formInputElements = viewChildren(FormControlName, { read: ElementRef });

  errors: any[] = [];
  fornecedorForm!: FormGroup;
  fornecedor!: Fornecedor;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento = signal<string>('CPF (requerido)');

  formResult: string = '';

  mudancasNaoSalvas!: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        invalidCPF: 'CPF inválido',
        invalidCNPJ: 'CNPJ inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        minlength: 'O CEP deve ter 8 caracteres'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, CpfValidator]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, Validators.minLength(8)]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      })
    });

    this.fornecedorForm.patchValue({
      tipoFornecedor: '1',
      ativo: true
    });
  }

  ngAfterViewInit(): void {
    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });

    this.configurarElementosValidacao();
  }

  private configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements()
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  private validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  buscarCep(cep: string) {
    if(cep.length < 8)
      return;

    this.fornecedorService.consultarCep(cep)
    .subscribe({
      next: (cepConsulta: CepConsulta) => this.preencherEnderecoConsulta(cepConsulta),
      error: (error: any) => this.errors.push(error)
    });
  }

  private preencherEnderecoConsulta(cepConsulta: CepConsulta): void {
    return this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        complemento: cepConsulta.complemento,
        bairro: cepConsulta.bairro,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  trocarValidacaoDocumento() {
    if (this.tipoFornecedorForm().value === '1') {
      this.documentoForm().clearValidators();
      this.documentoForm().setValidators([Validators.required, CpfValidator]);
      this.textoDocumento.set('CPF (requerido)');
    } else {
      this.documentoForm().clearValidators();
      this.documentoForm().setValidators([Validators.required, CnpjValidator]);
      this.textoDocumento.set('CNPJ (requerido)');
    }
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor')!;
  }

  documentoForm(): AbstractControl {
    return this.fornecedorForm.get('documento')!;
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}