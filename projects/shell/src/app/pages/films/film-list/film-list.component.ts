import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Film } from '@shared/models/film';
import { Subscription, map, Observable } from 'rxjs';

import * as fromApp from '@shared/store/app.reducer';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store: Store<fromApp.GlobalState> = inject(Store);

  public films: Observable<Film[]> = this.store
    .select('films')
    .pipe(map((filmsState) => filmsState.films));

  onNewFilm() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
