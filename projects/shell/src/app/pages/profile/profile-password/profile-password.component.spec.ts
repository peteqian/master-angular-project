import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '@shared/services';
import { User } from '@shared/models';
import { ProfilePasswordComponent } from './profile-password.component';

describe('ProfilePasswordComponent', () => {
  let component: ProfilePasswordComponent;
  let fixture: ComponentFixture<ProfilePasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  // let usersService: jasmine.SpyObj<UsersService>;
  let formBuilder: FormBuilder;

  const mockUser: User = { id: 'testUser' } as User;

  beforeEach(() => {
    // authService = jasmine.createSpyObj('AuthService', ['user']);
    // authService.user = of(mockUser);

    // usersService = jasmine.createSpyObj('UsersService', [
    //   'requestChangePassword',
    // ]);

    TestBed.configureTestingModule({
      declarations: [ProfilePasswordComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        // { provide: UsersService, useValue: usersService },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(ProfilePasswordComponent);
    component = fixture.componentInstance;
    // formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - default providers - WHEN - instantiated - THEN - it should initialize passwordForm with expected controls', () => {
    //   expect(component.passwordForm instanceof FormGroup).toBeTruthy();
    //   expect(component.passwordForm.get('oldPassword')).toBeTruthy();
    //   expect(component.passwordForm.get('newPassword')).toBeTruthy();
    //   expect(component.passwordForm.get('confirmPassword')).toBeTruthy();
    // });
    // it('GIVEN - a toggle - WHEN - toggleShowx() is called - THEN - it should toggle showCurrent property', () => {
    //   const initialValue = component.showCurrent;
    //   component.toggleShowCurrent();
    //   expect(component.showCurrent).toEqual(!initialValue);
  });

  it('GIVEN - valid input - WHEN - savePassword - THEN - it should save password successfully', fakeAsync(() => {
    // const newPassword = 'newPassword123';
    // usersService.requestChangePassword.and.returnValue(of('success'));
    // // Set form values
    // component.passwordForm.setValue({
    //   oldPassword: 'oldPassword',
    //   newPassword: newPassword,
    //   confirmPassword: newPassword,
    // });
    // component.savePassword();
    // tick();
    // expect(usersService.requestChangePassword).toHaveBeenCalledWith(
    //   changePasswordRequest
    // );
    // expect(component.error).toBeFalsy();
    // expect(component.message).toEqual('Password changed successfully!');
  }));

  it('GIVEN - invalid input - WHEN - savePassword is called - THEN - it should handle error when saving password', fakeAsync(() => {
    // const errorMessage = 'Error changing password';
    // usersService.requestChangePassword.and.returnValue(
    //   throwError({ message: errorMessage })
    // );
    // // Set form values
    // component.passwordForm.setValue({
    //   oldPassword: 'oldPassword',
    //   newPassword: 'newPassword123',
    //   confirmPassword: 'newPassword123',
    // });
    // component.savePassword();
    // tick();
    // expect(usersService.requestChangePassword).toHaveBeenCalled();
    // expect(component.error).toBeTruthy();
    // expect(component.message).toEqual(errorMessage);
  }));
});
