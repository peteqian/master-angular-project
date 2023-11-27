import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { FormErrorComponent } from './form-error.component';
import { HttpClientModule } from '@angular/common/http';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FormErrorComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - form control with no value - WHEN - rendering control - THEN - show required error message', () => {
    component.control = new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]);
    component.control.markAsDirty();

    fixture.detectChanges();

    const errorControls = fixture.nativeElement.querySelectorAll('small');

    expect(errorControls.length).toBe(1);
    expect(errorControls[0].innerText).toBe('This field is required');
  });

  it('GIVEN - form control with content having more than maxlength of allowed characters - WHEN - rendering control - THEN - show maxlength error message', () => {
    component.control = new FormControl('1234567890123456', [
      Validators.required,
      Validators.maxLength(15),
    ]);
    component.control.markAsDirty();

    fixture.detectChanges();

    const errorControls = fixture.nativeElement.querySelectorAll('small');

    expect(errorControls.length).toBe(1);
    expect(errorControls[0].innerText).toBe(
      'The max length of this field is 15'
    );
  });

  it('GIVEN - form control with valid content - WHEN - rendering control - THEN - no error messages are displayed', () => {
    component.control = new FormControl('test', [
      Validators.required,
      Validators.maxLength(15),
    ]);
    component.control.markAsDirty();

    fixture.detectChanges();

    const errorControls = fixture.nativeElement.querySelectorAll('small');

    expect(errorControls.length).toBe(0);
  });
});
