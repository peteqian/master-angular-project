import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@NgModule({
  imports: [CommonModule, HeroesRoutingModule, FormsModule, HttpClientModule],
  declarations: [HeroesComponent, HeroDetailComponent],
})
export class HeroesModule {}
