import { createAction, props } from '@ngrx/store';
import { Film } from '@shared/models';

export const addFilm = createAction(
  '[Film] Add Film',
  props<{
    film: Film;
  }>()
);

export const updateFilm = createAction(
  '[Film] Update Film',
  props<{
    index: number;
    film: Film;
  }>()
);

export const deleteFilm = createAction(
  '[Film] Delete Film',
  props<{
    index: number;
  }>()
);

export const setFilms = createAction(
  '[Film] Set Films',
  props<{
    films: Film[];
  }>()
);

export const fetchFilms = createAction('[Film] Fetch Films');

export const storeFilms = createAction('[Film] Store Films');
