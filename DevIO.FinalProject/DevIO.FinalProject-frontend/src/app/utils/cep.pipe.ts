import { Pipe, PipeTransform } from '@angular/core';
import { StringUtils } from './string-utils';

@Pipe({
  name: 'cep',
  standalone: true
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const cep = StringUtils.somenteNumeros(value);
    if (cep.length !== 8) return value;
    
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
} 