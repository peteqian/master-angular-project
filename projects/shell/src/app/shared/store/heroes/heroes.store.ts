import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '@shared/models';
import { ManagedStore } from '@shared/libs/store';

export interface HeroState {
  heroes: Hero[];
}

export const initialHeroState: HeroState = {
  heroes: [],
};

@Injectable({
  providedIn: 'root',
})
export class HeroStore extends ManagedStore<HeroState> {
  public readonly heroes$: Observable<Hero[]> = this.select(
    (state) => state.heroes
  );

  constructor() {
    super(initialHeroState);
  }

  public getHeroes(): Hero[] | null {
    return this.state.heroes;
  }

  public setHeroes(heroes: Hero[]): void {
    this.setState((state) => ({ ...state, heroes }));
  }
}
