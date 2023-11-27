import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { checkPasswords } from '@shared/components/form';

import * as fromApp from '@shared/store/app.reducer';
import * as AuthActions from '@shared/store/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store<fromApp.GlobalState> = inject(Store);

  public registerForm: FormGroup;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [checkPasswords('password', 'confirmPassword')],
      }
    );

    // DEBUG
    // this.registerForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    this.store.dispatch(AuthActions.signupStart({ email, password }));
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
