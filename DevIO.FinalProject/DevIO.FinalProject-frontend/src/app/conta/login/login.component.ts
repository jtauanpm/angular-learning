import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, viewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { LocalStorageUtils } from '../../utils/local-storage';
import { ContaService } from '../services/conta.service';


@Component({
  selector: 'app-login',
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup;
  displayMessages: DisplayMessage = {};
  errors: any[] = [];
  formInputElements = viewChildren(FormControlName, { read: ElementRef });
  
  private readonly validationMessages: ValidationMessages = {
    email: {
      required: 'Informe o e-mail',
      email: 'Email inválido'
    },
    password: {
      required: 'Informe a senha',
      rangeLength: 'A senha deve possuir entre 6 e 15 caracteres '
    }
  };
  
  private readonly genericValidator!: GenericValidator;
  private returnUrl!: string;
  
  private fb = inject(FormBuilder);
  private contaService = inject(ContaService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  
  constructor() {
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  ngOnInit(): void {
    this.initForm();
  }

  public login() {
    if(this.loginForm.valid && this.loginForm.dirty) {
      const input = this.loginForm.getRawValue();

      this.contaService.login(input)
      .subscribe({
        next: response => this.processarSucesso(response),
        error: error => this.processarErro(error)
      });
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements()
      .map((formControl: ElementRef) => fromEvent (formControl.nativeElement, 'blur'));
      
    merge(...controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  private processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    LocalStorageUtils.salvarDadosLocaisUsuario(response);

    this.router.navigate(this.returnUrl ? [this.returnUrl] : ['/home']);
  }

  private processarErro(error: any) {
    this.errors = error.error.errors
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
