import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from './models/usuario.interface';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CpfValidator } from './validators/cpf-validator';
import { matchPasswordValidator } from './validators/match-password-validator';
import { DisplayMessage, GenericValidator, ValidationMessages } from './validators/generic-form-validation';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class CadastroComponent implements OnInit, AfterViewInit {
  // Obtém as referências para os inputs do template
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  cadastroForm!: FormGroup;
  usuario!: Usuario;
  formResult!: string;
  wasSaved: boolean = false;

  validationMessages!: ValidationMessages;
  genericValidator: GenericValidator = new GenericValidator(this.validationMessages);
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      nome: {
        required: "O Nome é requerido",
        minlength: "O Nome precisa ter no mínimo 2 caracteres",
        maxlength: "O Nome precisa ter no máximo 150 caracteres",
      },
      cpf: {
        required: "Informe o CPF",
        invalidCPF: "CPF em formato inválido",
      },
      email: {
        required: "Informe o e-mail",
        email: "Email inválido",
      },
      senha: {
        required: "Informe a senha",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres",
      },
      senhaConfirmacao: {
        required: "Informe a senha novamente",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres",
        equalTo: "As senhas não conferem",
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    // Retorna uma lista de Observable referente a cada input do template disparado pelo evento blur
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    // realiza um subscribe numa lista de Observable chamando o método que processa as mensagens de validação
    merge(...controlBlurs).subscribe(
      () => this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm)
    );
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group(
      {
        nome: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(150),
          ],
        ],
        cpf: ["", [Validators.required, CpfValidator]],
        email: ["", [Validators.required, Validators.email]],
        senha: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        senhaConfirmacao: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      { validator: matchPasswordValidator("senha", "senhaConfirmacao") }
    );
  }

  adicionarUsuario() {
    if (this.cadastroForm.valid) {
      // retorna todos os valores do formulário, INCLUINDO campos desabilitados
      // this.usuario = this.cadastroForm.getRawValue();

      // copia os valores do formulário para this.usuario, IGNORANDO campos desabilitados
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
      this.wasSaved = true;
    } else {
      this.formResult = "Formulário inválido!";
    }
  }

  formControlTemErro(nome: string, tipoErro?: string): boolean {
    const campo = this.cadastroForm.get(nome);
    const foiMexido: boolean = !!(campo?.touched || campo?.dirty);

    if (tipoErro === undefined) return !!(campo?.errors && foiMexido);
    else return !!(campo?.getError(tipoErro) && foiMexido);
  }
}
