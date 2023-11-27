import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero } from '@shared/models/hero/hero';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.scss'],
})
export class TemplateFormsComponent {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model: Hero = {
    id: 18,
    name: 'Dr. IQ',
  };
  submitted = false;

  constructor() {}

  onSubmit(form: NgForm) {
    console.log('DEBUG Form Values', form.value);
    console.log('DEBUG Hero Values', this.model);
    // console.log('DEBUG', form.submit);
    this.submitted = true;
  }

  newHero() {
    this.model = {
      id: 42,
      name: 'This is a new model that inputs data to data',
    };
  }
}
