import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPasswordValidator(senhaKey: string, senhaConfirmacaoKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const senha = formGroup.get(senhaKey)?.value;
    const senhaConfirmacao = formGroup.get(senhaConfirmacaoKey)?.value;
    
    return senha !== senhaConfirmacao ? { passwordsMismatch: true } : null;
  };
}
