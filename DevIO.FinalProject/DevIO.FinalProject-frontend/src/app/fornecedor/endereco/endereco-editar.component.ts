import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, model, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { StringUtils } from '../../utils/string-utils';
import { CepConsulta, Endereco } from '../models/endereco.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-endereco-editar',
  templateUrl: './endereco-editar.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ]
})
export class EnderecoEditarComponent implements OnInit {
  public endereco = model.required<Endereco>();
  public enderecoAtualizado = output<Endereco>();

  enderecoForm!: FormGroup;
  errors: any[] = [];
  displayMessage: DisplayMessage = {};
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;

  private fb = inject(FormBuilder);
  private fornecedorService = inject(FornecedorService);
  private toastr = inject(ToastrService);
  private modalRef = inject(NgbActiveModal);

  constructor() {
    this.validationMessages = {
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

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
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
  }

  preencherForm() {
      if (!this.endereco()) 
      return;

    this.enderecoForm.patchValue({
      id: this.endereco().id,
      logradouro: this.endereco().logradouro,
      numero: this.endereco().numero,
      complemento: this.endereco().complemento,
      bairro: this.endereco().bairro,
      cep: this.endereco().cep,
      cidade: this.endereco().cidade,
      estado: this.endereco().estado,
      fornecedorId: this.endereco().fornecedorId
    });
  }

  buscarCep(cep: string) {
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe({
        next: (cepRetorno) => this.preencherEnderecoConsulta(cepRetorno),
        error: (erro) => this.errors.push(erro)
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
      const endereco = Object.assign({}, this.endereco(), this.enderecoForm.value);
      endereco.fornecedorId = this.endereco().fornecedorId;
      endereco.cep = StringUtils.somenteNumeros(endereco.cep);

      this.fornecedorService.atualizarEndereco(endereco)
        .subscribe({
          next: (enderecoAtualizado) => this.processarSucesso(enderecoAtualizado),
          error: (falha) => this.processarFalha(falha)
        });
    }
  }

  fecharModal() {
    this.modalRef.dismiss();
  }

  processarSucesso(endereco: Endereco) {
    this.errors = [];
    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.enderecoAtualizado.emit(endereco);
    this.fecharModal();
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.enderecoForm);
  }
} 