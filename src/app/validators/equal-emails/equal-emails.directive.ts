import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEqualEmails]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualEmailsDirective, multi: true }]
})
export class EqualEmailsDirective {
  constructor() {}

  validate(emailForm: AbstractControl): ValidationErrors | null {
    if (emailForm.value) {
      const email1 = emailForm.value.email;
      const email2 = emailForm.value.email2;

      if (email1 === email2) {
        return null;
      }
    }
    return { equalEmails: true };
  }
}
