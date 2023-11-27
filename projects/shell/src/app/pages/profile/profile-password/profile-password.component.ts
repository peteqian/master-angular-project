import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService, ChangePasswordRequest, User } from 'src/app/shared';
import { checkPasswords } from 'src/app/shared/components/form';
// import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
})
export class ProfilePasswordComponent {
  // private user: User;
  public passwordForm: FormGroup;
  public showCurrent: boolean = false;
  public showNew: boolean = false;
  public showConfirm: boolean = false;

  public error: boolean = false;
  public message: string = '';

  constructor(
    private formBuilder: FormBuilder // private usersService: UsersService, // private authService: AuthService
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [checkPasswords('newPassword', 'confirmPassword')],
      }
    );

    // this.authService.user.subscribe((user) => {
    //   this.user = user;
    // });

    console.log('ProfilePasswordComponent', this.passwordForm);
  }

  savePassword(): void {
    this.clearOldMessage();

    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      return;
    }

    // const changeRequest: ChangePasswordRequest = {
    //   username: this.user.username,
    //   currentPassword: this.passwordForm.get('oldPassword').value,
    //   newPassword: this.passwordForm.get('newPassword').value
    // };

    // this.usersService.requestChangePassword(changeRequest).subscribe({
    //   next: (response) => {
    //     this.error = false;
    //     this.message = 'Password changed successfully!';
    //     console.log('Password changed successfully!', response);
    //   },
    //   error: (err) => {
    //     this.error = true;
    //     this.message = err.message;
    //   }
    // });
  }

  public toggleShowCurrent(): void {
    this.showCurrent = !this.showCurrent;
  }

  public toggleShowNew(): void {
    this.showNew = !this.showNew;
  }

  public toggleShowConfirm(): void {
    this.showConfirm = !this.showConfirm;
  }

  private clearOldMessage(): void {
    this.message = '';
    this.error = false;
  }
}
