import { Component, input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Produto } from '../../produto/models/produto';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lista-produto',
  templateUrl: './lista-produtos.component.html',
  imports: [CommonModule, RouterModule, CurrencyPipe]
})
export class ListaProdutosComponent {

  imagens: string = environment.imagesUrl;

  produtos = input<Produto[]>();
}