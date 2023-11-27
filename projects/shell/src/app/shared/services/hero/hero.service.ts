import { Injectable } from '@angular/core';
import { delay, of, Observable, tap, map } from 'rxjs';

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
}
