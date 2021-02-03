import { catchError } from 'rxjs/operators';
import { Utilisateur } from './../models/Utilisateur.model';
import { Injectable } from '@angular/core';
import { UtilisateurApiService } from './utilisateur.api.service';
import { Router } from '@angular/router';
import { EncdDecrService } from './EncdDecr.service';
import { promise } from 'protractor';

@Injectable()
export class RegisterService {

  constructor(private utilisateurApiService: UtilisateurApiService,
              private router: Router,
              private encDecr: EncdDecrService) { }

  register(utilisateur: Utilisateur){
    utilisateur.password = this.encDecr.set('ei2*$ZhxL*%cqb5',utilisateur.password);
    this.utilisateurApiService.addUtilisateur(utilisateur)
        .toPromise()
        .then( () => this.router.navigate(['/home']) )
        .catch( (error) => alert(error.error));
  }

}
