import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDetailsComponent } from './profile-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, { provide: ActivatedRoute, useValue: {} }],
    });

    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - route - WHEN - editProfile is called - THEN - it should navigate to edit profile', () => {
    // ARRANGE
    const navigateSpy = spyOn(router, 'navigate');

    // ACT
    component.editProfile();

    // ARRANGE
    expect(navigateSpy).toHaveBeenCalledWith(['edit'], {
      relativeTo: jasmine.any(Object),
    });
  });

  it('GIVEN - default provider with user - WHEN - instantiated - THEN - it should apply the user', () => {
    // Trigger change detection to update the form
    fixture.detectChanges();

    expect(component.profileForm.value).toEqual({ username: 'testUser' });
  });
});
