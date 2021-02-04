import { CommentMassage } from './../models/commentMassage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentMassageApiService {

  apiURL: string = 'http://localhost:8081';

constructor(private httpClient: HttpClient) { }

addComment(comment: CommentMassage): any{
  return this.httpClient.post<CommentMassage>(this.apiURL + "/comment_massage", comment, {responseType: 'type' as 'json'});
}

}
