import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '@shared/store/app.reducer';
import * as AuthActions from '@shared/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private closeSub: Subscription;
  private storeSub: Subscription;
  private store: Store<fromApp.GlobalState> = inject(Store);

  error: string | null = null;
  isLoading: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (!form.valid) {
      console.debug('Form Invalid', form);
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(AuthActions.loginStart({ email, password }));
  }

  forgotPassword() {
    console.debug('forgotPassword');
  }
}
