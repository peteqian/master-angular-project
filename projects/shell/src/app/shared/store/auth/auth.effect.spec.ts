import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { environment } from '@environment';
import { AuthService } from '@shared/services/auth';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'setLogoutTimer',
            'clearLogoutTimer',
          ]),
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('WITH - authSignup$', () => {
    it('GIVEN - pre-condition - WHEN - a successful sign up is performed - THEN - it should dispatch authenticateSuccess on successful signup', fakeAsync(() => {
      // ARRANGE
      const action = AuthActions.signupStart({
        email: 'test@example.com',
        password: 'password',
      });
      const completion = AuthActions.authenticateSuccess({
        email: 'test@example.com',
        userId: 'userId',
        token: 'token',
        expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        redirect: true,
      });

      actions$ = of(action);
      const response = {
        expiresIn: 3600,
        email: 'test@example.com',
        localId: 'userId',
        idToken: 'token',
      };
      const authServiceSpy = spyOn(effects['http'], 'post').and.returnValue(
        of(response)
      );

      // ACT
      effects.authSignup$.subscribe((result) => {
        expect(result).toEqual(completion);
      });

      // ASSERT
      tick(); // Ensure that asynchronous operations complete
      expect(authServiceSpy).toHaveBeenCalledWith(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          environment.firebase.apiKey,
        {
          email: 'test@example.com',
          password: 'password',
          returnSecureToken: true,
        }
      );
      expect(authService.setLogoutTimer).toHaveBeenCalled();
    }));

    it('GIVEN - pre-condition - WHEN - an unsuccessful sign up is performed - THEN - it should dispatch authenticateFail on signup error', fakeAsync(() => {
      // ARRANGE
      const action = AuthActions.signupStart({
        email: 'test@example.com',
        password: 'password',
      });
      const completion = AuthActions.authenticateFail({
        errorMessage: 'An unknown error occurred!',
      });

      actions$ = of(action);
      const errorResponse = { error: { error: { message: 'ERROR_MESSAGE' } } };
      const authServiceSpy = spyOn(effects['http'], 'post').and.returnValue(
        throwError(errorResponse)
      );

      // ACT
      effects.authSignup$.subscribe((result) => {
        expect(result).toEqual(completion);
      });

      // ASSERT
      tick(); // Ensure that asynchronous operations complete
      expect(authServiceSpy).toHaveBeenCalledWith(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          environment.firebase.apiKey,
        {
          email: 'test@example.com',
          password: 'password',
          returnSecureToken: true,
        }
      );
      expect(authService.setLogoutTimer).not.toHaveBeenCalled();
    }));
  });
});
