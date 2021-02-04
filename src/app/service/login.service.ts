import { EncdDecrService } from './EncdDecr.service';
import { LoginInfo } from '../models/LoginInfo.model';
import { UtilisateurService } from './utilsateur.service';
import { UtilisateurApiService } from './utilisateur.api.service';
import { Utilisateur } from '../models/Utilisateur.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    public isAuth = false;
    public isAdmin = false;
    authSubject = new Subject<boolean>();
    adminSubject = new Subject<boolean>();
    public utilisateur: Utilisateur;
    utilisateurSubscription: Subscription;

    constructor(private utilisateurApiService: UtilisateurApiService,
      private router: Router,
      private utilisateurService: UtilisateurService,
      private encDecr: EncdDecrService){}


    ngOnInit() {
      this.utilisateurSubscription = this.utilisateurService.utilisateurSubject.subscribe(
        (utilisateur: Utilisateur) =>{ this.utilisateur = utilisateur; });
      this.utilisateurService.emitUtilisateur();
    }

    emitAuthStatus() {
      this.authSubject.next(this.isAuth);
      this.adminSubject.next(this.isAdmin);
    }

    signIn(loginInfo: LoginInfo) {
      let utilisateurProm: Utilisateur;
      loginInfo.password = this.encDecr.set('ei2*$ZhxL*%cqb5',loginInfo.password);
      new Promise((resolve,rej) =>{
        this.utilisateurApiService.login(loginInfo).subscribe((data: Utilisateur)=>{
          utilisateurProm = data;
          if(utilisateurProm !== null && utilisateurProm.password === loginInfo.password){
            utilisateurProm.password = null;
            this.utilisateurService.emitProvidedUtilisateur(utilisateurProm);
            this.router.navigate(['/home']);
            this.isAuth = true;
            this.isAdmin = utilisateurProm.admin;
            this.emitAuthStatus();
          }else console.log("Problème d'identification");
          resolve(utilisateurProm);
        })
      })
    }

    signOut(){
      this.isAuth = false;
      this.isAdmin = false;
      this.emitAuthStatus();
      this.utilisateur = null;
      this.utilisateurService.emitProvidedUtilisateur(this.utilisateur);
    }

}
