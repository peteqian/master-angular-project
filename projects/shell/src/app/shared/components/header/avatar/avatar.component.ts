import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromAuthState from '@shared/store/auth';
import { selectAuthUser } from '@shared/store/auth';
import { User } from '@shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private store: Store<fromAuthState.AuthState> = inject(Store);
  private router: Router = inject(Router);

  public initials: string = '';
  public showDropdownMenu: boolean = false;
  public user: User | null = null;

  ngOnInit() {
    this.userSub = this.store
      .select(selectAuthUser)
      .subscribe((user: User | null) => {
        // console.debug('[DEBUG-AVATAR-COMP] User', user);
        if (user) {
          this.initials = this.getInitials(user.id);
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe(); // potential memory leak if we don't unsubscribe
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  public toggleDropdown(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  public logout(): void {
    this.store.dispatch(fromAuthState.logout());
  }

  private getInitials(fullName: string): string {
    const names = fullName.split(' ');

    if (names.length >= 2) {
      const firstInitial = names[0].charAt(0);
      const lastInitial = names[names.length - 1].charAt(0);

      const initials = firstInitial + lastInitial;

      return initials.toUpperCase();
    }

    if (names.length == 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return '';
  }
}
