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
    return this.httpClient.post<CommentProduit>(this.apiURL + "/comment_produit", comment, {headers: {'Content-type': 'application/json'}});
  }

  delComment(id: number){
    this.httpClient.delete(this.apiURL + "/comment_produit/" + id, {responseType: 'text'}).subscribe();
  }
}
