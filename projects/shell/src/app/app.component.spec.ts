import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {
    films: {},
    auth: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`GIVEN - a title - WHEN - rendering - it should have as title 'all-in-one-angular'`, () => {
    // ARRANGE
    // ACT
    fixture.detectChanges();
    // ASSERT
    expect(component.title).toEqual('all-in-one-angular');
  });
});
