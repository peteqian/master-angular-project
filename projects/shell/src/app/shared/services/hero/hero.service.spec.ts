import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HeroStore } from '@shared/store/heroes/heroes.store';
import { of } from 'rxjs';
import { HEROES } from '@shared/mock/mock-heroes';

describe('HeroService', () => {
  let heroService: HeroService;
  let heroStoreSpy: jasmine.SpyObj<HeroStore>;
  heroStoreSpy = jasmine.createSpyObj('HeroStore', ['setLoading', 'setLoaded']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, { provide: HeroStore, useValue: heroStoreSpy }],
    });

    heroService = TestBed.inject(HeroService);
    heroStoreSpy = TestBed.inject(HeroStore) as jasmine.SpyObj<HeroStore>;
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('GIVEN - a hero - WHEN - getting heroes - THEN - it should return heroes', fakeAsync(() => {
    let heroes: any;
    spyOn(heroService, 'getHeroes').and.returnValue(of(HEROES));

    heroService.getHeroes().subscribe((data) => (heroes = data));

    flush();

    expect(heroes).toEqual(HEROES);
  }));
});
