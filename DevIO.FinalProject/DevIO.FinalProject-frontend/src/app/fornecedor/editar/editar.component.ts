import { ElementRef, OnInit, viewChildren, signal, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { FormControlName, FormGroup } from "@angular/forms";
import { DisplayMessage, GenericValidator, ValidationMessages } from "../../utils/generic-form-validation";
import { Fornecedor } from "../models/fornecedor.model";
import { Endereco, CepConsulta } from "../models/endereco.model";
import { FornecedorService } from "../services/fornecedor.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { NgxMaskDirective } from "ngx-mask";
import { CpfValidator } from "../../utils/cpf-validator";
import { CnpjValidator } from "../../utils/cnpj-validator";
import { fromEvent, merge, Observable } from "rxjs";
import { StringUtils } from "../../utils/string-utils";
import { EnderecoEditarComponent } from "../endereco/endereco-editar.component";
import { CepPipe } from "../../utils/cep.pipe";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { DocumentoPipe } from "../../shared/pipes/documento.pipe";
import { ListaProdutosComponent } from "../produtos/lista-produtos.component";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RouterModule,
    CepPipe,
    NgxSpinnerModule,
    DocumentoPipe, 
    ListaProdutosComponent
  ]
})
export class EditarComponent implements OnInit {

  formInputElements = viewChildren(FormControlName, { read: ElementRef });

  errors: any[] = [];
  fornecedorForm!: FormGroup;
  fornecedor!: Fornecedor;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento = signal<string>('CPF (requerido)');
  
  tipoFornecedor: number;
  formResult: string = '';

  enderecoForm!: FormGroup;
  errorsEndereco: any[] = [];
  displayMessageEndereco: DisplayMessage = {};
  validationMessagesEndereco!: ValidationMessages;
  genericValidatorEndereco!: GenericValidator;

  private fb = inject(FormBuilder);
  private fornecedorService = inject(FornecedorService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private spinner = inject(NgxSpinnerService);

  constructor() {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        invalidCPF: 'CPF em formato inválido',
        invalidCNPJ: 'CNPJ em formato inválido'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.fornecedor = this.route.snapshot.data['fornecedor'];
    this.tipoFornecedor = this.fornecedor.tipoFornecedor;

    this.validationMessagesEndereco = {
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
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidatorEndereco = new GenericValidator(this.validationMessagesEndereco);
  }

  ngOnInit() {
    this.spinner.show();

    this.fornecedorForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: [''],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fornecedorId: ['']
    });

    this.preencherForm();
    this.preencherFormEndereco();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {
    this.fornecedorForm.patchValue({
      id: this.fornecedor.id,
      nome: this.fornecedor.nome,
      ativo: this.fornecedor.ativo,
      tipoFornecedor: this.fornecedor.tipoFornecedor.toString(),
      documento: this.fornecedor.documento
    });

    if (this.tipoFornecedorForm().value === "1") {
      this.documento().setValidators([Validators.required, CpfValidator]);
    }
    else {
      this.documento().setValidators([Validators.required, CnpjValidator]);
    }

    this.documento().updateValueAndValidity();
  }

  preencherFormEndereco() {
    this.enderecoForm.patchValue({
      id: this.fornecedor.endereco.id,
      logradouro: this.fornecedor.endereco.logradouro,
      numero: this.fornecedor.endereco.numero,
      complemento: this.fornecedor.endereco.complemento,
      bairro: this.fornecedor.endereco.bairro,
      cep: this.fornecedor.endereco.cep,
      cidade: this.fornecedor.endereco.cidade,
      estado: this.fornecedor.endereco.estado,
      fornecedorId: this.fornecedor.endereco.fornecedorId
    });
  }

  ngAfterViewInit() {
    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });

    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements()
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  trocarValidacaoDocumento() {
    if (this.tipoFornecedorForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, CpfValidator]);
      this.textoDocumento.set('CPF (requerido)');
    }else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, CnpjValidator]);
      this.textoDocumento.set('CNPJ (requerido)');
    }
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento') as AbstractControl;
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor') as AbstractControl;
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
  }

  editarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

      this.fornecedorService.atualizarFornecedor(this.fornecedor)
        .subscribe({
          next: (sucesso) => this.processarSucesso(sucesso),
          error: (falha) => this.processarFalha(falha)
        });
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
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

  abrirModalEndereco() {
    const modalRef = this.modalService.open(EnderecoEditarComponent, {});
    const component = modalRef.componentInstance as EnderecoEditarComponent;
    component.endereco.set(this.fornecedor.endereco);
    
    modalRef.componentInstance.enderecoAtualizado.subscribe(
      (endereco: Endereco) => {
        this.fornecedor.endereco = endereco;
        this.modalService.dismissAll();
      }
    );
  }

  abrirModal(content: any) {
    this.preencherFormEndereco();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  buscarCep(cep: string) {
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe({
        next: (cepRetorno) => this.preencherEnderecoConsulta(cepRetorno),
        error: (erro) => this.errorsEndereco.push(erro)
      });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });
  }

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      const endereco = Object.assign({}, this.fornecedor.endereco, this.enderecoForm.value);
      endereco.fornecedorId = this.fornecedor.endereco.fornecedorId;
      endereco.cep = StringUtils.somenteNumeros(endereco.cep);

      this.fornecedorService.atualizarEndereco(endereco)
        .subscribe({
          next: (enderecoAtualizado) => this.processarSucessoEndereco(enderecoAtualizado),
          error: (falha) => this.processarFalhaEndereco(falha)
        });
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errorsEndereco = [];
    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.fornecedor.endereco = endereco;
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  validarFormularioEndereco() {
    this.displayMessageEndereco = this.genericValidatorEndereco.processarMensagens(this.enderecoForm);
  }
}