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
  }

}
