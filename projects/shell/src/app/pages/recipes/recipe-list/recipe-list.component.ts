import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '@shared/store/app.reducer';
import * as RecipeActions from '@shared/store/recipes/recipe.actions';
import { Recipe } from '@shared/models/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.GlobalState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSaveData() {
    console.debug('[DEBUG-RECIPE-LIST-COMP] onSaveData');
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onFetchData() {
    console.debug('[DEBUG-RECIPE-LIST-COMP] onFetchData');
    this.store.dispatch(RecipeActions.fetchRecipes());
  }
}
