import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import * as fromApp from '@shared/store/app.reducer';
import * as FilmActions from '@shared/store/film/film.actions';
import { Film } from '@shared/models/film';

@Injectable({ providedIn: 'root' })
export class FilmsResolver implements Resolve<{ films: Film[] }> {
  constructor(
    private store: Store<fromApp.GlobalState>,
    private actions$: Actions
  ) {}
  // Resolve wants to return an observable.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Select part of the store and return as an Observable
    return this.store.select('films').pipe(
      take(1),
      // Make an Observable returning the recipes array from the store.
      map((filmsState) => {
        return filmsState.films;
      }),
      switchMap((films) => {
        if (films.length === 0) {
          // Dispatch the action to fetch the recipes.
          this.store.dispatch(FilmActions.fetchFilms());
          // Return the observable that will be subscribed to by the component that is using this resolver service
          return this.actions$.pipe(ofType(FilmActions.setFilms), take(1));
        } else {
          return of({ films });
        }
      })
    );
  }
}
