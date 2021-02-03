import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAuth: boolean;
  isAuthSubscription: Subscription;
  isAdmin: boolean;
  isAdminSubscription: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isAuthSubscription = this.loginService.authSubject.subscribe(
      (isAuth: boolean) =>{
        this.isAuth = isAuth;
      }
    )
    this.isAdminSubscription = this.loginService.adminSubject.subscribe(
      (isAdmin: boolean) =>{
        this.isAdmin = isAdmin;
      }
    )
    this.loginService.emitAuthStatus();
  }

  logOut(){
    this.loginService.signOut();
  }

}
