import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit.component';
import * as fromApp from '@shared/store/app.reducer';
import * as RecipeActions from '@shared/store/recipes/recipe.actions';
import { of } from 'rxjs';

describe('RecipeEditComponent - WITH - an index', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let router: Router;
  let store: Store<fromApp.GlobalState>;

  const mockIndex = '1';

  // Executes first
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot(fromApp.appReducer)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: mockIndex }) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch'); // Spy on the store.dispatch method
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should create the component', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(component).toBeTruthy();
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should set edit mode to true', fakeAsync(() => {
    // ARRANGE
    // ACT
    flushMicrotasks();
    fixture.detectChanges();
    // ASSERT
    expect(component.editMode).toBeTruthy();
  }));

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should set edit mode to true', fakeAsync(() => {
    // ARRANGE
    // ACT
    flushMicrotasks();
    fixture.detectChanges();
    // ASSERT
    expect(component.editMode).toBeTruthy();
  }));

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should set the form', fakeAsync(() => {
    // ARRANGE
    // ACT
    flushMicrotasks();
    fixture.detectChanges();
    // ASSERT
    expect(component.recipeForm).toBeTruthy();
  }));

  it('GIVEN - some form values - WHEN - submitting - THEN - it should dispatch the updateRecipe action', fakeAsync(() => {
    // ARRANGE
    // ACT
    flushMicrotasks();
    fixture.detectChanges();
    component.onSubmit();
    // ASSERT
    expect(store.dispatch).toHaveBeenCalledWith(
      RecipeActions.updateRecipe({
        index: +mockIndex,
        recipe: component.recipeForm.value,
      })
    );
  }));

  it('GIVEN - a form - WHEN - adding an ingredient - THEN - it should update the form', fakeAsync(() => {
    // ARRANGE
    // ACT
    flushMicrotasks();
    fixture.detectChanges();
    component.onAddIngredient();
    // ASSERT
    expect(component.ingredientsControls.length).toBe(1);
  }));
});
