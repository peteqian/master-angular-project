import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { InterceptorsModule } from './interceptors/interceptors.module';

@NgModule({
  imports: [CommonModule, ComponentModule, PipesModule, InterceptorsModule],
  exports: [CommonModule, ComponentModule, PipesModule, InterceptorsModule],
})
export class SharedModule {}
