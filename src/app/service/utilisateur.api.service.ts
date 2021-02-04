import { LoginInfo } from './../models/LoginInfo.model';
import { Utilisateur } from './../models/Utilisateur.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilisateurApiService {

  apiURL: string = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {
   }

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  addUtilisateur(utilisateur: Utilisateur): any {
    return this.httpClient.post<Utilisateur>(this.apiURL + '/utilisateur', utilisateur, {responseType: 'type' as 'json'})
  }

  login(loginInfo: LoginInfo): Observable<Utilisateur>{
    let params = new HttpParams().set('email',loginInfo.email);
    return this.httpClient.get<Utilisateur>(this.apiURL + '/utilisateur/login', {params})
  }

}
