import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '@shared/store/app.reducer';
import * as RecipesActions from '../../../shared/store/recipes/recipe.actions';
import * as ShoppingListActions from '../../../shared/store/shopping-list/shopping-list.actions';
import { Recipe } from '../../../shared/models/recipes/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  showDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.GlobalState>
  ) {}

  ngOnInit() {
    // This is a similar case when editing a recipe, cancelling then deleting.
    // However, we do not need to manually unsubscribe as the route.params is handled by Angular (i.e.) it will unsubscribe automatically.
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe: Recipe, index: number) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        if (!recipe) {
          return;
        }

        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    if (!this.recipe?.ingredients) {
      console.debug('No ingredients to add to shopping list');
      return;
    }

    this.store.dispatch(
      ShoppingListActions.addIngredients({
        ingredients: this.recipe.ingredients,
      })
    );
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
