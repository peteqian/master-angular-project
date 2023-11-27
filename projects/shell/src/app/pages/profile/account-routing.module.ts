import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/shared/components/layouts/main-layout';

import { AccountComponent } from './account.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileDetailsEditComponent } from './profile-details/profile-details-edit/profile-details-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          {
            path: 'profile',
            component: ProfileDetailsComponent
          },
          {
            path: 'profile/edit',
            component: ProfileDetailsEditComponent
          },
          {
            path: 'security',
            component: ProfilePasswordComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
