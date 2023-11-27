import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-details-edit.component.html',
})
export class ProfileDetailsEditComponent {
  public profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      username: [{ value: '' }],
    });

    this.profileForm.patchValue({
      username: 'userTest',
    });
  }

  saveProfile(): void {
    console.error('Functionality for this is not implemented');
  }
}
