import { Component, ElementRef, OnInit, viewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { Fornecedor } from '../models/produto';
import { ProdutoFormBaseComponent } from '../produto-form.base.component';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyDirective, ImageCropperComponent]
})
export class NovoComponent extends ProdutoFormBaseComponent implements OnInit {
  formInputElements = viewChildren(FormControlName, { read: ElementRef })

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation: number = 0;
  rotation: number = 0;
  scale: number = 1;
  showCropper: boolean = false;
  containWithinAspectRatio: boolean = false;
  transform: ImageTransform = {};
  imageUrl!: string;
  imagemNome!: string;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {

    this.produtoService.obterFornecedores()
      .subscribe({
        next: (fornecedores: Fornecedor[]) => this.fornecedores = fornecedores,
        error: (error: any) => this.processarFalha(error)
      });

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario([...this.formInputElements()]);
  }

  adicionarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
      this.produto.imagemUpload = this.croppedImage.split(',')[1];

      this.produtoService.novoProduto(this.produto)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error?.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Image ready', sourceImageDimensions);
  }

  loadImageFailed() {
    this.errors.push('Não foi possível carregar a imagem:' + this.imagemNome);
  }
  
}

