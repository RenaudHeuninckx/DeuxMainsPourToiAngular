import { Utilisateur } from './../models/Utilisateur.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class utilisateurService {

  utilisateurData: any;
  private utilisateur: Utilisateur;
  utilisateurSubject = new Subject<Utilisateur>();

  constructor(){}

  emitUser(){
    this.utilisateurSubject.next(this.utilisateur);
  }

  emitProvidedUtilisateur(utilisateur: Utilisateur){
    this.utilisateur = utilisateur;
    this.utilisateurSubject.next(this.utilisateur);
  }
}
