import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericErrorComponent } from './generic-error.component';

@NgModule({
  declarations: [GenericErrorComponent],
  imports: [CommonModule],
  exports: [GenericErrorComponent]
})
export class GenericErrorModule {}
