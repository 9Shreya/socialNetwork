import {Component,OnInit} from '@angular/core';
import {ServiceService} from 'src/app/service.service';
import {Router} from '@angular/router';
import {SESSION_STORAGE} from './../../content';
import {ToastrService} from 'ngx-toastr';

declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private service: ServiceService,private routes: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
  }
  fullName: any;
  email: any;
  password: any;
  confirmPassword: any;
  loggin(login: any) {
    this.service.register(
      {
        fullName: login.value.fullName,
        email: login.value.email,
        password: login.value.password
      }).subscribe((response: any) => {
        console.log(response);

        if (response.status == 200) {

          this.service.postCoustomer(
            {
              name: login.value.fullName,
              coustomerId: response.result._id
            }).subscribe((response: any) => {
              console.log(response);
            })
          localStorage.setItem('token',response.data);
          sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
          this.routes.navigate(['/login']);
          this.toastr.success(response.message)
        } else {

          console.log(response.error[0]);

        }

      },(error) => {
        this.toastr.error(error.error[0])

        console.log(error.error[0]);

      })
  }

}
