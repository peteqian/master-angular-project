import { Component, ContentChild } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @ContentChild(FormControlName) control?: AbstractControl;
}
