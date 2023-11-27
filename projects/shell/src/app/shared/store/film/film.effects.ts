import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Film } from '@shared/models/film';

import * as FilmActions from './film.actions';
import { FilmService } from '@shared/services/film/film.service';

@Injectable()
export class FilmEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.fetchFilms),
      switchMap(() => {
        return this.filmService.convertResults();
      }),
      map((films: Film[]) => {
        console.debug('films', films);
        return FilmActions.setFilms({ films });
      })
    )
  );
}
