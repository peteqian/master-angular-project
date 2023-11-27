import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '@shared/models/recipes';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIndex: -1,
};

// tslint:disable-next-line: variable-name
const _shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),

  on(ShoppingListActions.addIngredients, (state, action) => {
    const existingIngredientsMap = new Map<string, Ingredient>();

    // Populate the map with existing ingredients
    state.ingredients.forEach((ingredient) => {
      existingIngredientsMap.set(ingredient.name, { ...ingredient }); // Create a new object
    });

    // Iterate through the new ingredients
    action.ingredients.forEach((newIngredient) => {
      const existingIngredient = existingIngredientsMap.get(newIngredient.name);

      if (existingIngredient) {
        // If the ingredient already exists, update the amount
        existingIngredient.amount += newIngredient.amount;
      } else {
        // If the ingredient doesn't exist, add it to the map
        existingIngredientsMap.set(newIngredient.name, { ...newIngredient });
      }
    });

    // Convert the map back to an array of ingredients
    const updatedIngredients = Array.from(existingIngredientsMap.values());

    return {
      ...state,
      ingredients: updatedIngredients,
    };
  }),

  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    ),
  })),

  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editIndex
    ),
  })),

  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
