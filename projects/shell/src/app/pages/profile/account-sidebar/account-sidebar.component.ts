import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './account-sidebar.component.html'
})
export class AccountSidebarComponent {
  private router = inject(Router);

  public currentRoute: string;
  public routes = [
    { path: '/account/profile', label: 'Profile Details' },
    { path: '/account/security', label: 'Password' }
  ];

  constructor() {
    this.router.events
      .pipe(
        tap((event) => {
          this.currentRoute = this.router.url;
        })
      )
      .subscribe();
  }
}
