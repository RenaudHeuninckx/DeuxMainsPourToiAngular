import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiURL: string = 'http://localhost:3306';

constructor(private httpClient: HttpClient){};

httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'}) }

}
