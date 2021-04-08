import { element, promise } from 'protractor';
import { Router } from '@angular/router';
import { CommentMassageContainer } from './../models/commentMassageContainer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Massage } from '../models/massage.model';
import { MassageContainer } from '../models/massageContainer.model';

@Injectable({
  providedIn: 'root'
})
export class MassageApiService {

  apiURL: string = 'http://localhost:8081';

constructor(private httpClient: HttpClient,
            private router: Router
            ) { }

  getAllMassage(): Observable<MassageContainer>{
      return this.httpClient.get<MassageContainer>(this.apiURL + '/massage');
  }

  getOneMassage(id: number){
    return this.httpClient.get<Massage>(this.apiURL + "/massage/" + id);
  }

  getMassageComment(id: number){
    return this.httpClient.get<CommentMassageContainer>(this.apiURL + "/comment_massage/massage/" + id);
  }

  deleteMassage(id: number){
    this.httpClient.delete(this.apiURL + "/massage/" + id, {responseType: 'text'})
    .toPromise()
      .then( data => alert(data) )
      .catch( (error) => alert(error.error));
  }

  addMassage(massage: Massage): any{
    this.httpClient.post(this.apiURL + "/massage", massage, {responseType: 'text'})
      .toPromise()
      .then( data => {this.router.navigate(['/massage']); alert(data);} )
      .catch( (error) => alert(error.error));
  }

  updMassage(massage: Massage){
      this.httpClient.put(this.apiURL + "/massage", massage, {responseType: 'text'})
      .toPromise()
      .then( data => {this.router.navigate(['/massage']); alert(data);} )
      .catch( (error) => alert(error.error));
  }

}
