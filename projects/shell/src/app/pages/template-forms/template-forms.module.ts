import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormsComponent } from './template-forms.component';
import { TemplateFormsRoutingModule } from './template-forms-routing.module';
import { FormsModule } from '@angular/forms';
import { MinLengthDirective } from '@shared/directive';

@NgModule({
  declarations: [TemplateFormsComponent, MinLengthDirective],
  imports: [CommonModule, TemplateFormsRoutingModule, FormsModule],
})
export class TemplateFormsModule {}
