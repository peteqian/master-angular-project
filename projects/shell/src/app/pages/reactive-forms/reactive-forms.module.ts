import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsComponent } from './reactive-forms.component';
import { ReactiveFormsRoutingModule } from './reactive-forms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReactiveFormsComponent],
  imports: [CommonModule, ReactiveFormsRoutingModule, ReactiveFormsModule],
})
export class ReactiveFormModule {}
