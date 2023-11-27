import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { AvatarComponent } from './avatar.component';
import * as fromAuthState from '@shared/store/auth';
import { User } from '@shared/models';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let store: MockStore<{ auth: { user: User | null } }>;

  const initialState = {
    auth: {
      user: {} as User,
    },
  };

  const mockUser: User = {
    email: 'test@test.com',
    id: 'userIdTest',
  } as User;

  beforeEach(waitForAsync(() => {
    // Async operation in ngOnInit
    TestBed.configureTestingModule({
      declarations: [AvatarComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: 'selectAuthUser',
              value: [{ mockUser }],
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // Needed for ngOnInit
  });

  afterEach(() => {
    store?.resetSelectors(); // Clean any selectors
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should be created', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - a mock user - WHEN - ngOnInit has begun - THEN - it should initialize the user correctly', fakeAsync(() => {
    // ARRANGE
    spyOn(store, 'select').and.returnValue(of(mockUser));

    // ACT
    flushMicrotasks();
    component.ngOnInit();
    fixture.detectChanges();

    // ASSERT
    expect(component.user).toEqual(mockUser);
    expect(component.initials).toEqual(mockUser.id[0].toUpperCase());
  }));

  it('GIVEN - a route - WHEN - login is called - THEN - it should navigate to login ', () => {
    // ARRANGE
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    // ACT
    component.login();

    // ASSERT
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  describe('WITH - a user already signed in', () => {
    beforeEach(() => {
      component.user = mockUser;
      fixture.detectChanges();
    });

    it('GIVEN - a mock user - WHEN - toggleDropdown is called - THEN - it should toggle the dropdown menu', () => {
      // ARRANGE
      const showDropdownMenu = component.showDropdownMenu;

      // ACT
      component.toggleDropdown();

      // ASSERT
      expect(component.showDropdownMenu).toEqual(!showDropdownMenu);
    });

    it('GIVEN - a mock user - WHEN - logout is called - THEN - it should dispatch logout action', () => {
      // ARRANGE
      spyOn(store, 'dispatch');

      // ACT
      // logoutElement.click();
      component.logout();

      // ASSERT
      expect(store.dispatch).toHaveBeenCalledWith(fromAuthState.logout());
    });
  });
});
