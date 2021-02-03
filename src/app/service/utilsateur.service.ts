import { Utilisateur } from './../models/Utilisateur.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UtilisateurService {

  utilisateurData: any;
  private utilisateur: Utilisateur;
  utilisateurSubject = new Subject<Utilisateur>();

  constructor(){}

  emitUtilisateur(){
    this.utilisateurSubject.next(this.utilisateur);
  }

  emitProvidedUtilisateur(utilisateur: Utilisateur){
    this.utilisateur = utilisateur;
    this.utilisateurSubject.next(this.utilisateur);
  }
}
