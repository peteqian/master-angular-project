import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IntegerPattern } from '../constants';

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  IntegerPattern = IntegerPattern;
  @Input() control?: AbstractControl;
}
