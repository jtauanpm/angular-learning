import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DocumentoFormatPipe } from '../../shared/pipes/documento.pipe';
import { Fornecedor } from '../models/fornecedor.model';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    DocumentoFormatPipe
]
})
export class DetalhesComponent {
  fornecedor = signal<Fornecedor>({} as Fornecedor);
  enderecoMap = signal<SafeResourceUrl>({} as SafeResourceUrl);

  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.fornecedor.set(this.route.snapshot.data['fornecedor']);    
    const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${this.enderecoCompleto()}&key=${environment.googleMapsApiKey}`;
    this.enderecoMap.set(this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl));
  }

  public enderecoCompleto(): string {
    if(this.fornecedor()?.endereco) {
      return `${this.fornecedor().endereco}, ${this.fornecedor().endereco.numero} - ${this.fornecedor().endereco.bairro} - ${this.fornecedor().endereco.cidade} - ${this.fornecedor().endereco.estado}`;
    }
    return '';
  }

  tipoFornecedorForm(): string {
    return this.fornecedor().tipoFornecedor.toString();
  }
}
