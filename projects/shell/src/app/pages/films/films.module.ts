import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FilmsComponent } from './films.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { FilmsRoutingModule } from './films-routing.module';

@NgModule({
  declarations: [FilmsComponent, FilmListComponent, FilmItemComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class FilmsModule {}
