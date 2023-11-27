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
import { Recipe } from '../../models/recipes/recipe.model';
import * as RecipesActions from '../../store/recipes/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<{ recipes: Recipe[] }> {
  constructor(
    private store: Store<fromApp.GlobalState>,
    private actions$: Actions
  ) {}

  // Resolve wants to return an observable.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipesService.getRecipes();

    // Select part of the store and return as an Observable
    return this.store.select('recipes').pipe(
      take(1),
      // Make an Observable returning the recipes array from the store.
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          // Dispatch the action to fetch the recipes.
          console.debug('RecipesResolverService: dispatching fetchRecipes');
          this.store.dispatch(RecipesActions.fetchRecipes());
          // Return the observable that will be subscribed to by the component that is using this resolver service
          return this.actions$.pipe(ofType(RecipesActions.setRecipes), take(1));
        } else {
          return of({ recipes });
        }
      })
    );
  }
}
