import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'src/app/shared/components/form';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileDetailsEditComponent } from './profile-details/profile-details-edit/profile-details-edit.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountSidebarComponent,
    ProfileDetailsComponent,
    ProfileDetailsEditComponent,
    ProfilePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule
  ]
})
export class AccountModule {}
