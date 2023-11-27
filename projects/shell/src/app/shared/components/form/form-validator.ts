import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNotInTheFutureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value == '') {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate > today) {
      return { dateInTheFuture: true };
    }
    return null;
  };
}

export function checkPasswords(
  controlName: string,
  checkControlName: string
): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ matching: true });
      return { matching: true };
    } else {
      return null;
    }
  };
}
