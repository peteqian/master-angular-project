import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '@shared/models/hero/hero';
import { HeroService } from '@shared/services/hero';
import { HeroStore } from '@shared/store/heroes/heroes.store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  private heroService: HeroService = inject(HeroService);
  private heroStore: HeroStore = inject(HeroStore);

  isLoading$: Observable<boolean> = this.heroStore.selectLoading('heroes');
  heroes$: Observable<Hero[]> = this.heroService.getHeroes();
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
