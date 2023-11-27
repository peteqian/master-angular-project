import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { Recipe } from '@shared/models/recipes';
import { RecipeListComponent } from './recipe-list.component';

import * as fromApp from '@shared/store/app.reducer';
import * as RecipeActions from '@shared/store/recipes/recipe.actions';

// Mock recipe data
const mockRecipes: Recipe[] = [
  { name: 'Recipe 1', description: 'description 1', imagePath: 'path 1' },
  { name: 'Recipe 2', description: 'description 2', imagePath: 'path 2' },
];

describe('RecipeListComponent - WITH - recipes in initial state', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let router: Router;
  let store: Store<fromApp.GlobalState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      imports: [StoreModule.forRoot(fromApp.appReducer)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
        {
          provide: Store,
          // Use Value Mock
          useValue: {
            select: () => of({ recipes: mockRecipes }),
            dispatch: () => {},
          },
        },
      ],
    });

    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    // Spy Mock
    // spyOn(store, 'select').and.returnValue(of({ recipes: mockRecipes }));

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock the store select method to return observable of mockRecipes
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should create the component', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(component).toBeTruthy();
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should set recipes on initialization', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(component.recipes).toEqual(mockRecipes);
  });

  it('GIVEN - subscription - WHEN - fixture destroy is called - THEN - it should unsubscribe on component destroy', () => {
    // ARRANGE
    spyOn(component.subscription, 'unsubscribe');

    // ACT
    fixture.detectChanges(); // Trigger ngOnInit
    fixture.destroy(); // Trigger ngOnDestroy

    // ASSERT
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('GIVEN - router - WHEN - new recipe is called - THEN - it should navigate to new recipe on onNewRecipe', () => {
    // ARRANGE
    const navigateSpy = spyOn(router, 'navigate');

    // ACT
    component.onNewRecipe();

    // ASSERT
    expect(navigateSpy).toHaveBeenCalledWith(['new'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('GIVEN - default set up - WHEN - onSaveData() is called - THEN - it should dispatch storeRecipes action on onSaveData', () => {
    // ARRANGE
    const dispatchSpy = spyOn(store, 'dispatch');

    // ACT
    component.onSaveData();

    // ASSERT
    expect(dispatchSpy).toHaveBeenCalledWith(RecipeActions.storeRecipes());
  });

  it('GIVEN - default set up - WHEN - onFetchData() is called - THEN - it should dispatch fetchRecipes action on onFetchData', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onFetchData();

    expect(dispatchSpy).toHaveBeenCalledWith(RecipeActions.fetchRecipes());
  });
});

describe('RecipeListComponent - WITH - no recipes in initial state', () => {
  it('GIVEN - a state change with recipes - WHEN - rendering the component - THEN - it should update the recipes', () => {
    // ARRANGE
    let component: RecipeListComponent;
    let fixture: ComponentFixture<RecipeListComponent>;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
        {
          provide: Store, // Your service or value
          useValue: {
            select: () => of({ recipes: [] }),
            dispatch: () => {},
          }, // The initial value
        },
      ],
    });

    // ACT
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // ASSERT
    expect(component.recipes).toEqual([]);
  });
});
