import { AbstractControl, ValidationErrors } from "@angular/forms";

export function CnpjValidator(control: AbstractControl): ValidationErrors | null {
  const cnpj = control.value?.replace(/\D/g, "");
  if (!cnpj) return null;

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return { invalidCNPJ: true };
  }

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return { invalidCNPJ: true };
  }

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return { invalidCNPJ: true };
  }

  return null;
} 