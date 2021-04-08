import { Router } from '@angular/router';
import { CommentProduitContainer } from '../models/commentProduitContainer';
import { Produit } from '../models/Produit.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitContainer } from '../models/ProduitContainer.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitApiService {

  apiURL: string = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }

  getAllProduit(): Observable<ProduitContainer>{
    return this.httpClient.get<ProduitContainer>(this.apiURL + '/produit');
  }

  getOneProduit(id: number){
  return this.httpClient.get<Produit>(this.apiURL + "/produit/" + id);
  }

  getProduitComment(id: number){
  return this.httpClient.get<CommentProduitContainer>(this.apiURL + "/comment_produit/produit/" + id);
  }

  deleteProduit(id: number){
    this.httpClient.delete(this.apiURL + "/produit/" + id, {responseType: 'text'})
    .toPromise()
      .then( data => alert(data) )
      .catch( (error) => alert(error.error));
  }

  addProduit(produit: Produit): any{
    this.httpClient.post(this.apiURL + "/produit", produit, {responseType: 'text'})
      .toPromise()
      .then( data => {this.router.navigate(['/produit']); alert(data);} )
      .catch( (error) => alert(error.error));
  }

  updMassage(produit: Produit){
      this.httpClient.put(this.apiURL + "/produit", produit, {responseType: 'text'})
      .toPromise()
      .then( data => {this.router.navigate(['/produit']); alert(data);} )
      .catch( (error) => alert(error.error));
  }

}
