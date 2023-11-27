import { FormFieldComponent } from './form-field.component';
import { render, screen } from '@testing-library/angular';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

const flashMicrotasks = () => new Promise((resolve) => setTimeout(resolve));

// Simple Component Testing
describe('FormFieldComponent', () => {
  it('GVIEN - default set up - WHEN - instantiating - THEN - it should be created', async () => {
    const component = await render(FormFieldComponent, {
      declarations: [FormErrorComponent],
    });

    expect(component).toBeDefined();
  });

  it('GIVEN - form field with label and control - WHEN - rendering component - THEN - label and input control should be displayed', async () => {
    await render(
      '<form-field><label data-testid="label" for="field">Field Name</label><input data-testid="input" type="text" id="field" formControlName="field"></form-field>',
      {
        componentProperties: {
          field: new FormControl(),
        } as Partial<AbstractControl>,
        declarations: [FormFieldComponent, FormErrorComponent],
      }
    );

    await flashMicrotasks();

    expect(screen.getByTestId('label').innerText).toContain('Field Name');
    expect(screen.getByTestId('input')).not.toBeNull();
  });
});
