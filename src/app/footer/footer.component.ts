import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
