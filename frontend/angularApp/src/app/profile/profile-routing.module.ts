import {ViewProfileComponent} from './view-profile/view-profile.component';
import {AuthGuard} from './../auth.guard';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {CommonComponent} from './common/common.component';

const routes: Routes = [
  {
    path: '',component: CommonComponent,
    children: [
      {
        path: 'login',component: LoginComponent
      },{
        path: 'signup',component: SignupComponent
      }
    ]
  },

  {
    path: 'profile',component: ProfileComponent,canActivate: [AuthGuard]
  },
  {
    path: 'user_profile',component: ViewProfileComponent,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
