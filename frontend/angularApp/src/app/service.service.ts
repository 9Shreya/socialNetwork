import {environment} from './../environments/environment';
import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService {

  constructor(protected http: HttpClient,private route: ActivatedRoute) {super(http);}

  urll = environment.urll

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      console.log(JSON.parse(userPayload));
      let valueToken = JSON.parse(userPayload);
      console.log(valueToken.email);
      sessionStorage.setItem("email",valueToken.email)


      if (valueToken.email == 'admin@gmail.com') {
        sessionStorage.setItem("role",'admin')
      }
      else if (valueToken.email == 'agent@gmail.com') {
        sessionStorage.setItem("role",'agent')
      }
      else {
        sessionStorage.setItem("role",'coustomer')
      }

      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  id: any
  getCoustomer(id: any) {
    return this.get(this.urll + 'coustomer' + '/' + id)
  }
  getAllCoustomers() {
    return this.get(this.urll + 'coustomer')
  }
  deleteCoustomer(val: any) {
    return this.delete(this.urll + 'coustomer' + `/${val._id}`)
  }
  editCoustomer(val: any) {
    return this.http.put(this.urll + 'coustomer' + `/${val._id}`,val)
  }
  login(val: any) {
    return this.post(this.urll + 'api/login',val)
  }
  register(val: any) {
    return this.http.post(this.urll + 'api/register',val)
  }
  postCoustomer(form: any) {
    return this.post(this.urll + 'coustomer',form)
  }
}
