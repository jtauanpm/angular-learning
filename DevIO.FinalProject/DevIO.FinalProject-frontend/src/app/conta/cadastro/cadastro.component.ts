import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';

import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { DisplayMessage } from '../../utils/generic-form-validation';
import { LocalStorageUtils } from '../../utils/local-storage';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  cadastroForm!: FormGroup;
  errors: any[] = [];
  formInputElements = viewChildren(FormControlName, { read: ElementRef });
  
  private fb = inject(FormBuilder);
  private contaService = inject(ContaService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  constructor() {
    super();
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres '
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public registrarUsuario() {
    if(this.cadastroForm.valid && this.cadastroForm.dirty) {
      const input = this.cadastroForm.getRawValue();

      this.contaService.registrarUsuario(input)
      .subscribe({
        next: response => this.processarSucesso(response),
        error: error => this.processarErro(error)
      });

      this.mudancasNaoSalvas = false;
    }
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase([...this.formInputElements()], this.cadastroForm);
  }

  private initForm() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
      confirmPassword: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  private processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    LocalStorageUtils.salvarDadosLocaisUsuario(response);
    let toast = this.toastr.success('Registro realizado com sucesso!', 'Bem vindo!', { progressBar: true });

    if(toast) {
      toast.onHidden?.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  private processarErro(error: any) {
    this.errors = error.error.errors
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ equalTo: true });
    }
    
    return null;
  }
}
