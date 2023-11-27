import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinLengthDirective,
      multi: true,
    },
  ],
})
export class MinLengthDirective implements Validator {
  @Input('appMinLength') minLength: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value;

    if (value && value.length < +this.minLength) {
      return { 'appMinLength': { requiredLength: this.minLength, actualLength: value.length } };
    }

    return null; // Validation passed
  }
}