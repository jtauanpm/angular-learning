import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from './models/usuario.interface';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  usuario!: Usuario;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }
  
  adicionarUsuario() {
    // retorna todos os valores do formulário, INCLUINDO campos desabilitados
    this.usuario = this.cadastroForm.getRawValue();

    // copia os valores do formulário para this.usuario, IGNORANDO campos desabilitados
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    
    console.log(this.usuario);
  }
}
