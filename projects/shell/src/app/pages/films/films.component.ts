import { Component } from '@angular/core';

import { films } from '@shared/mock/mock-films';
import { Film } from '@shared/models/film';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent {
  public films: Film[] = films;

  editFilm(film: Film): void {
    this.films = this.films.map((f) => (f === film ? film : f));
  }

  deleteFilm(film: Film): void {
    this.films = this.films.filter((f) => f !== film);
  }
}
