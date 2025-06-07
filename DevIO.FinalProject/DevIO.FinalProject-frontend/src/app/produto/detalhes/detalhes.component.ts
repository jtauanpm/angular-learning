import { Component } from '@angular/core';
import { Produto } from '../models/produto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  produto: Produto;

  constructor(private route: ActivatedRoute) {
    this.produto = this.route.snapshot.data['produto'];
  }
}
