import { Injectable } from '@angular/core';
import { delay, of, Observable, tap, map, throwError, catchError } from 'rxjs';

import { HEROES } from '@shared/mock/mock-heroes';
import { Hero } from '@shared/models';
import { HeroStore } from '@shared/store/heroes/heroes.store';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private heroStore: HeroStore) {}

  getHeroes(): Observable<Hero[]> {
    this.heroStore.setLoading('heroes');
    return of(HEROES).pipe(
      delay(2000),
      map((heroes) => {
        this.heroStore.setLoaded('heroes');
        return heroes;
      })
    );
  }

  updateHero(hero: Hero): Observable<boolean | Error> {
    return this.heroStore.heroes$.pipe(
      tap(() => this.heroStore.setLoading('heroes')),
      map((heroes: Hero[] | null) => {
        if (!heroes) {
          return Error('Heroes not found');
        }

        const index = heroes.findIndex((h) => h.id === hero.id);

        if (index >= 0) {
          heroes[index] = hero;
          this.heroStore.setHeroes(heroes);
        }

        return true;
      }),
      catchError((error) => {
        return throwError(() => {
          this.heroStore.setLoaded('heroes');
          return error;
        });
      })
    );
  }
}
