import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../../models/recipes/recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from './recipe.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://all-in-one-angular-default-rtdb.europe-west1.firebasedatabase.app/.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        // array destructuring syntax to get the recipes from the store and the action payload from the action that is being dispatched
        switchMap(([actionData, recipesState]) => {
          const recipes: Recipe[] = recipesState.recipes;
          console.debug(
            '[DEBUG-RECIPES-EFFECTS] Recipes - actionData ',
            actionData
          );
          console.debug(
            '[DEBUG-RECIPES-EFFECTS] Recipes - storeRecipes with ',
            recipes
          );
          return this.http.put(
            'https://all-in-one-angular-default-rtdb.europe-west1.firebasedatabase.app/.json',
            recipes
          );
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.GlobalState>
  ) {}
}
