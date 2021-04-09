import { Utilisateur } from './../models/Utilisateur.model';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';


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
  utilisateur: Utilisateur;
  pseudo: string ="pas connecter";
  pseudoSubscription: Subscription;

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    if (sessionStorage.getItem("utilisateur") !== null){
      this.utilisateur = JSON.parse(sessionStorage.utilisateur);
      this.isAuth = true;
      this.isAdmin = this.utilisateur.admin;
      this.pseudo = this.utilisateur.pseudo;
    }else{
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
      this.pseudoSubscription = this.loginService.pseudoSubject.subscribe(
        (pseudo: string) =>{
          this.pseudo = pseudo;
        }
      )
    }
    this.loginService.emitAuthStatus();
  }

  logOut(){
    this.loginService.signOut();
    this.router.navigate(['/home']);
    location.reload;
  }

}
