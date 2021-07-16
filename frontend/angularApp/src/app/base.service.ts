import {Injectable} from "@angular/core";
// import { Http, Headers } from "@angular/http";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
@Injectable({
  providedIn: "root",
})
export class BaseService {
  authToken: any;
  userId: any;
  userData: any;
  userRoles: any;

  constructor(protected http: HttpClient) {}

  setActivityTime() {
    let now = new Date().getTime() / 1000;
    sessionStorage.setItem("activityTime",now.toString());
  }

  getLastActivityTime() {

    return parseInt(sessionStorage.getItem("activityTime") || "");
  }

  getTimeDiffernceOfActivity() {
    let now = new Date().getTime() / 1000;
    let inactiveTime = now - this.getLastActivityTime();
    return inactiveTime;
  }



  logout() {
    sessionStorage.clear();
    window.location.href = "login";
  }

  loadToken() {
    if (localStorage.getItem("token")) {
      this.authToken = localStorage.getItem("token");
    } else {
      this.authToken = null;
    }
  }

  getHeaders(method: any): HttpHeaders {
    this.loadToken();
    if (this.authToken) {
      if (method == "get") {
        return new HttpHeaders({
          Authorization: `Bearer ${this.authToken}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        });
      } else {
        return new HttpHeaders({
          Authorization: `Bearer ${this.authToken}`,
        });
      }
    } else {
      return new HttpHeaders();
    }
  }
  post(url: string,body: Object = {},headers?: any): Observable<any> {
    let finalHeaders = this.getHeaders("post");
    if (headers && headers["headers"]) {
      const headerKeys = headers["headers"].keys();
      const headerValues = headers["headers"].values();
      for (let i = 0; i < headerKeys.length; i++) {
        finalHeaders.set(headerKeys[i],headerValues[i][0]);
      }
    }
    return this.http.post(url,body,{headers: finalHeaders});
  }
  get(url: string,headers?: any): Observable<any> {
    let finalHeaders = this.getHeaders("get");
    if (headers && headers["headers"]) {
      const headerKeys = headers["headers"].keys();
      const headerValues = headers["headers"].values();
      for (let i = 0; i < headerKeys.length; i++) {
        finalHeaders.set(headerKeys[i],headerValues[i][0]);
      }
    }
    return this.http.get(url,{headers: finalHeaders});
  }
  delete(url: string,headers?: any): Observable<any> {
    let finalHeaders = this.getHeaders("delete");
    if (headers && headers["headers"]) {
      const headerKeys = headers["headers"].keys();
      const headerValues = headers["headers"].values();
      for (let i = 0; i < headerKeys.length; i++) {
        finalHeaders.set(headerKeys[i],headerValues[i][0]);
      }
    }
    return this.http.delete(url,{headers: finalHeaders});
  }

}
