import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProduitApiService } from './../service/produit.api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produit } from './../models/Produit.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {

  produit: Produit = new Produit;
  id: number;
  produitForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private produitApiService: ProduitApiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
  }

  initForm() {
    this.setDefaultProduit();
  }

  get f() { return this.produitForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.produitForm.invalid){
      return;
    }
    const formValue = this.produitForm.value;
    this.produit.type = formValue["type"];
    this.produit.prix = formValue["prix"];
    this.produit.description = formValue["description"];
    if ( this.id === 0 ) this.produitApiService.addProduit(this.produit);
    else this.produitApiService.updMassage(this.produit);
  }

  onReset(){
    this.submitted = false;
    this.setDefaultProduit();
  }

  getProduit(id: number) {
    this.produitApiService.getOneProduit(id).subscribe( data => {this.produit = data;});
  }

  setDefaultProduit(){
    if ( this.id === 0 ){
      this.produit.type = 'type';
      this.produit.prix = 0;
      this.produit.description = 'description';
    }else{
      this.getProduit(this.id);
    }
    this.produitForm = this.formBuilder.group({
      type: [this.produit.type, Validators.required],
      prix: [this.produit.prix, Validators.required],
      description: [this.produit.description, Validators.required]
    });
  }

  goBack(){
    this.location.back();
  }

}
