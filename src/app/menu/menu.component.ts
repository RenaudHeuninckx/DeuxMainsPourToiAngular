import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAuth = false;
  isAuthSubscription: Subscription;
  isAdmin: boolean;
  isAdminSubscription: Subscription;

  constructor(private loginService: LoginService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.isAuthSubscription = this.loginService.authSubject.subscribe(
    //   (isAuth: boolean) => {
    //     this.isAuth = isAuth;
    //   }
    // )
    // this.isAdminSubscription = this.loginService.adminSubject.subscribe(
    //   (isAdmin: boolean) =>{
    //     this.isAdmin = isAdmin;
    //   }
    // )
    this.isAuth = this.authService.isUserloggedIn();
    this.authService.emitAuthStatus();
  }

  logOut(){
    this.authService.logout();
  }

}
