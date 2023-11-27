import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header';
import { LayoutsModule } from './layouts';

@NgModule({
  imports: [CommonModule, HeaderModule, LayoutsModule],
  exports: [HeaderModule, LayoutsModule],
})
export class ComponentModule {}
