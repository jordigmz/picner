import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualPassDirective } from './equal-pass/equal-pass.directive';
import { EqualEmailsDirective } from './equal-emails/equal-emails.directive';

@NgModule({
  declarations: [
    EqualPassDirective,
    EqualEmailsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualPassDirective,
    EqualEmailsDirective
  ]
})
export class ValidatorsModule { }
