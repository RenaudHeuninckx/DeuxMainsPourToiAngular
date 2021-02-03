import { LoginInfo } from './../models/LoginInfo.model';
import { InfoLogin } from './../models/InfoLogin';
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

  login(loginInfo: LoginInfo): Observable<InfoLogin>{
    console.log(loginInfo.email);
    let params = new HttpParams().set('email',loginInfo.email);
    let headers = new HttpHeaders();
    //params.append('email', loginInfo.email);
    //headers.append('content-type', 'application/JSON');
    return this.httpClient.get<InfoLogin>(this.apiURL + '/utilisateur/login', {params})
  }

}
