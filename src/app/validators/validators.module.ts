import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualMailDirective } from './equal-mail/equal-mail.directive';

@NgModule({
  declarations: [
    EqualMailDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatorsModule { }
