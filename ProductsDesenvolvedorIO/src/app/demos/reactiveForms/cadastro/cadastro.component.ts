import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from './models/usuario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  usuario!: Usuario;
  formResult!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }
  
  adicionarUsuario() {
    // retorna todos os valores do formulário, INCLUINDO campos desabilitados
    // this.usuario = this.cadastroForm.getRawValue();

    if(this.cadastroForm.valid){
      // copia os valores do formulário para this.usuario, IGNORANDO campos desabilitados
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    }else{
      this.formResult = "Formulário inválido!"
    }
    
  }
}
