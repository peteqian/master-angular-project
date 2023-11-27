import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent {
  public profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = this.formBuilder.group({
      username: [{ value: '' }],
    });

    this.profileForm.patchValue({
      username: 'testUser',
    });
  }

  public editProfile(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
