import { Component, ElementRef, OnInit, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { environment } from '../../../environments/environment';
import { GenericValidator } from '../../utils/generic-form-validation';
import { ProdutoFormBaseComponent } from '../produto-form.base.component';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoFormBaseComponent implements OnInit {

  formInputElements = viewChildren(FormControlName, { read: ElementRef });
  imagesUrl: string = environment.imagesUrl;

  imageBase64: any;
  imagemPreview = signal<string>('');
  imagemNome: string = '';
  imagemOriginalSrc: string = '';

  formResult: string = '';

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

      super();

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit(): void {

    this.produtoService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0]
    });

    this.produtoForm.patchValue({
      fornecedorId: this.produto.fornecedorId,
      id: this.produto.id,
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      ativo: this.produto.ativo,
      valor: this.produto.valor
    });

    this.imagemOriginalSrc = `${this.imagesUrl}/${this.produto.imagem}`;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario([...this.formInputElements()]);
  }

  editarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
     
      if (this.imageBase64) {
        this.produto.imagemUpload = this.imageBase64;
        this.produto.imagem = this.imagemNome;
      }

     this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  } 

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsArrayBuffer(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview.set("data:image/jpeg;base64," + this.imageBase64);
    console.log(this.imagemPreview());
  }
}

