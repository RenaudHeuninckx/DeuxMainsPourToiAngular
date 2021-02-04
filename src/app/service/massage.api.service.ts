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

constructor(private httpClient: HttpClient) { }

getAllMassage(): Observable<MassageContainer>{
    return this.httpClient.get<MassageContainer>(this.apiURL + '/massage');
}

getOneMassage(id: number){
  return this.httpClient.get<Massage>(this.apiURL + "/massage/" + id);
}

getMassageComment(id: number){
  return this.httpClient.get<CommentMassageContainer>(this.apiURL + "/comment_massage/massage/" + id);
}

}
