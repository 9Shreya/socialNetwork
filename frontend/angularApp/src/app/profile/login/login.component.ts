import {ServiceService} from './../../service.service';
import {Component,OnInit} from '@angular/core';
import {SESSION_STORAGE} from './../../content';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SocialAuthService,FacebookLoginProvider,SocialUser} from 'angularx-social-login';

declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService,private service: ServiceService,private routes: Router,private toastr: ToastrService) {}
  password: any;
  email: any;
  ngOnInit(): void {
  }
  loggin(login: any) {
    console.log(login);

    this.service.login(login.value).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem('token',response.data);

        sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
        this.routes.navigate(['/user_profile']);
        this.service.getCoustomer(response.id).subscribe((responsee: any) => {
          localStorage.setItem('coustomerID',response.id);
          console.log(responsee);
        })
        this.toastr.success(response.message)
        // M.toast({html: 'Login Succesfully',classes: 'rounded'})
        this.service.getUserPayload();

      } else {
        this.toastr.error(response.message)
      }



    },(error) => {
      console.log(error);
      this.toastr.error(error.message)
    })
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(

      (userData) => {
        console.log(userData.response);
        this.logginin(userData)
        // this.googleToken = userData.token;
        // this.socialLogin(this.googleToken,"facebook");
        // this.freshSaleStatus = true;
        // this.facebookLoginStatus = true;

      },
      (err) => {}
    );
  }

  logginin(userData: any) {
    this.service.register(
      {
        fullName: userData.response.name,
        email: userData.response.email,
        password: 'facebook'
      }).subscribe((response: any) => {
        console.log(response);

        if (response.status == 200) {

          this.service.postCoustomer(
            {
              name: userData.response.name,
              coustomerId: response.result._id,
              image: userData.response.picture.data.url
            }).subscribe((response: any) => {
              console.log(response);
            })
          localStorage.setItem('token',response.data);
          sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
          // this.routes.navigate(['/user_profile']);
          // this.toastr.success(response.message)
          this.loggin({
            email: userData.response.email,
            password: 'facebook'
          })

        } else {

          console.log(response.error[0]);

        }

      },(error) => {
        // this.toastr.error(error.error[0])

        console.log(error.error[0],userData.response.email);
        if (error.error[0] == 'Duplicate email adrress found.') {
          this.logginSign({
            email: userData.response.email,
            password: 'facebook'
          })
        }

      })
  }

  logginSign(login: any) {
    console.log(login);

    this.service.login(login).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem('token',response.data);

        sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
        this.routes.navigate(['/user_profile']);
        this.service.getCoustomer(response.id).subscribe((responsee: any) => {
          localStorage.setItem('coustomerID',response.id);
          console.log(responsee);
        })
        this.toastr.success(response.message)
        // M.toast({html: 'Login Succesfully',classes: 'rounded'})
        this.service.getUserPayload();

      } else {
        this.toastr.error(response.message)
      }



    },(error) => {
      console.log(error);
      this.toastr.error(error.message)
    })
  }


}
