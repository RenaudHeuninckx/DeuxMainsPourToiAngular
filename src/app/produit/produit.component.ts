import { Utilisateur } from './../models/Utilisateur.model';
import { ProduitApiService } from './../service/produit.api.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/Produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  listProduit: Produit[];
  countProduit: number;
  utilisateur: Utilisateur;
  isAdmin: boolean = false;

  constructor(
    public produitApiService: ProduitApiService
  ) { }

  ngOnInit() {
    this.produitApiService.getAllProduit().subscribe(
      data => {
        this.listProduit = data.list;
        this.countProduit = data.count;
      }
    )
    if (sessionStorage.getItem("utlisateur") !== null){
      this.utilisateur = JSON.parse(sessionStorage.getItem("utilisateur"));
      this.isAdmin = this.utilisateur.admin;
    }
  }

  supprimerProduit(id: number){
    this.produitApiService.deleteProduit(id);
    location.reload();
  }

}
