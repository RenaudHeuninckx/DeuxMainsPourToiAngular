import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public isAuth = false;
  public isAdmin = false;
  authSubject = new Subject<boolean>();
  adminSubject = new Subject<boolean>();
  public username: string;
  public password: string;

constructor(private http: HttpClient) { }

authenticationService(username: string, password: string){
  return this.http.get(`http://localhost:8081/api/v1/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
        this.emitAuthStatus();
        console.log(res);
      }));
}

createBasicAuthToken(username: string, password: string){
  return 'Basic ' + window.btoa(username + ":" + password);
}

registerSuccessfulLogin(username, password){
  sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
}

logout() {
  sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  this.username = null;
  this.password = null;
  this.emitAuthStatus();
}

isUserloggedIn(){
  return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME) !== null
}

getLoggedInUserName() {
  let username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  if (username === null) return '';
  return username;
}

emitAuthStatus() {
  this.isAuth = this.isUserloggedIn();
  this.authSubject.next(this.isAuth);
  this.adminSubject.next(this.isAdmin);
}

}
