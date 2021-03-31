import { CommentProduit } from './../models/commentProduit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentProduitApiService {

  apiURL: string = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  addComment(comment: CommentProduit): any{
    return this.httpClient.post<CommentProduit>(this.apiURL + "/comment_produit", comment, {responseType: 'type' as 'json'});
  }
}
