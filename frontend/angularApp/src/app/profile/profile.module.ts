import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {CommonComponent} from './common/common.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import { CreatpostComponent } from './creatpost/creatpost.component';
import { FollowComponent } from './follow/follow.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CommonComponent,
    LoginComponent,
    SignupComponent,
    ViewProfileComponent,
    CreatpostComponent,
    FollowComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule {}
