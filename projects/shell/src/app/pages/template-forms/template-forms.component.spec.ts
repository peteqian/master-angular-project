import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormsComponent } from './template-forms.component';
import { FormsModule } from '@angular/forms';

describe('TemplateFormsComponent', () => {
  let component: TemplateFormsComponent;
  let fixture: ComponentFixture<TemplateFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormsComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(TemplateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
