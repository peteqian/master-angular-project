import * as fromFilms from './film/film.reducers';
import * as fromAuth from './auth/auth.reducers';
import * as fromRecipes from './recipes/recipe.reducer';
import * as fromShoppingList from './shopping-list/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GlobalState {
  films: fromFilms.FilmState;
  auth: fromAuth.AuthState;
  recipes: fromRecipes.RecipesState;
  shoppingList: fromShoppingList.ShoppingListState;
}

export const appReducer: ActionReducerMap<GlobalState> = {
  films: fromFilms.filmReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
};
