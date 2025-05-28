import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documento',
  standalone: true
})
export class DocumentoPipe implements PipeTransform {
  transform(tipoFornecedor: string): string {
    return tipoFornecedor === '1' ? '000.000.000-00' : '00.000.000/0000-00';
  }
} 

@Pipe({
  name: 'documentoFormat',
  standalone: true
})
export class DocumentoFormatPipe implements PipeTransform {
  transform(value: string, tipoFornecedor: string): string {
    if (!value) return '';
    
    const documento = value.replace(/\D/g, '');
    
    if (tipoFornecedor === '1') {
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  }
} 