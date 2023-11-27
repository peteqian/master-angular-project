import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';

@NgModule({
  imports: [CommonModule, HeroesRoutingModule, FormsModule, HttpClientModule],
  declarations: [HeroesComponent],
})
export class HeroesModule {}
