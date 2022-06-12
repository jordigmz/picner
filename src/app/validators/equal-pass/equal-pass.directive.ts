import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEqualPass]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualPassDirective, multi: true }]
})
export class EqualPassDirective {
  constructor() {}

  validate(passForm: AbstractControl): ValidationErrors | null {
    if (passForm.value) {
      const pass1 = passForm.value.password;
      const pass2 = passForm.value.password2;

      if (pass1 === pass2) {
        return null;
      }
    }
    return { equalPasswords: true };
  }
}
