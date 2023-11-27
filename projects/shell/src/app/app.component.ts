import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '@shared/store/app.reducer';
import * as AuthActions from '@shared/store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private store: Store<fromApp.GlobalState> = inject(Store);

  title = 'all-in-one-angular';

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
