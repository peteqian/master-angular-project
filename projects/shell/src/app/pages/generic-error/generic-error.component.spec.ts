import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { GenericErrorComponent } from './generic-error.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenericErrorComponent', () => {
  let component: GenericErrorComponent;
  let fixture: ComponentFixture<GenericErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericErrorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(GenericErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('GIVEN - default provider - WHEN - instantiated - THEN - it should create a component', () => {
    expect(component).toBeTruthy();
  });
});
