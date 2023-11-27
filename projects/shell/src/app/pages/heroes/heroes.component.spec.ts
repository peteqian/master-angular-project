import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  flushMicrotasks,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroStore } from '@shared/store';
import { of } from 'rxjs';
import { HeroService } from '@shared/services/hero';
import { Hero } from '@shared/models';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  let heroStore: HeroStore;
  let heroService: HeroService;

  const testHeroes: Hero[] = [
    { id: 1, name: 'Hero1' },
    { id: 2, name: 'Hero2' },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [HeroStore, HeroService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    heroService = TestBed.inject(HeroService);
    heroStore = TestBed.inject(HeroStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - a hero - WHEN - onSelect is called - THEN - selectedHero is set', () => {
    // Arrange
    const hero = { id: 1, name: 'Superman' };

    // Act
    component.onSelect(hero);

    // Assert
    expect(component.selectedHero).toEqual(hero);
  });

  it('GIVEN - heroStore is loading - WHEN - rendering - THEN - it should set isLoading based on HeroStore', fakeAsync(() => {
    spyOn(heroStore, 'selectLoading').and.returnValue(of(true));

    fixture.detectChanges();

    flush();

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
  }));

  it('GIVEN - a hero - WHEN - selecting - THEN - it should set selectedHero on onSelect', () => {
    const testHero: Hero = { id: 1, name: 'Hero1' };

    component.onSelect(testHero);

    expect(component.selectedHero).toEqual(testHero);
  });
});
