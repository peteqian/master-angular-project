import { Action, createReducer, on } from '@ngrx/store';
import { Film } from '@shared/models/film';
import * as FilmActions from './film.actions';

export interface FilmState {
  films: Film[];
}

const initialState: FilmState = {
  films: [],
};

const _filmReducer = createReducer(
  initialState,

  on(FilmActions.addFilm, (state, action) => ({
    ...state,
    films: state.films.concat({ ...action.film }),
  })),

  on(FilmActions.updateFilm, (state, action) => ({
    ...state,
    films: state.films.map((film, index) =>
      index === action.index ? { ...action.film } : film
    ),
  })),

  on(FilmActions.deleteFilm, (state, action) => ({
    ...state,
    films: state.films.filter((_, index) => index !== action.index),
  })),

  on(FilmActions.setFilms, (state, action) => ({
    ...state,
    films: [...action.films],
  }))
);

export function filmReducer(state: FilmState, action: Action) {
  return _filmReducer(state, action);
}
