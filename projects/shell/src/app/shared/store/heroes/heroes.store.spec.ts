import { TestBed, fakeAsync } from '@angular/core/testing';
import { HeroStore } from './heroes.store';

describe('HeroStore', () => {
  let store: HeroStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroStore],
    });

    store = TestBed.inject(HeroStore);
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should be created', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(store).toBeTruthy();
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should have an initial state', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(store.state).toEqual({ heroes: [] });
  });

  it('GIVEN - a hero - WHEN - setting a hero - THEN - it should set the hero', () => {
    // ARRANGE
    const hero = { id: 1, name: 'test' };

    // ACT
    store.setHeroes([hero]);

    // ASSERT
    expect(store.state).toEqual({ heroes: [hero] });
  });

  it('GIVEN - a hero - WHEN - getting a hero - THEN - it should get the hero', () => {
    // ARRANGE
    const hero = { id: 1, name: 'test' };
    store.setHeroes([hero]);

    // ACT
    const result = store.getHeroes();

    // ASSERT
    expect(result).toEqual([hero]);
  });

  it('GIVEN - a hero - WHEN - setting a hero - THEN - the selector should have the hero', fakeAsync(() => {
    // ARRANGE
    const hero = { id: 1, name: 'test' };

    // ACT
    store.setHeroes([hero]);

    // ASSERT
    store.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual([hero]);
    });
  }));
});
