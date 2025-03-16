import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from './models/usuario.interface';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CpfValidator } from './validators/cpf-validator';
import { matchPasswordValidator } from './validators/match-password-validator';

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()]
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  usuario!: Usuario;
  formResult!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ["", Validators.required],
      cpf: ["", CpfValidator],
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
    }, {validator: matchPasswordValidator("senha", "senhaConfirmacao")}
  );
  }

  adicionarUsuario() {
    // this.usuario = this.cadastroForm.getRawValue(); // retorna todos os valores do formulário, INCLUINDO campos desabilitados

    if (this.cadastroForm.valid) {
      // copia os valores do formulário para this.usuario, IGNORANDO campos desabilitados
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
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
