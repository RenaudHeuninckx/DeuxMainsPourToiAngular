import { CommentProduitApiService } from './../service/commentProduit.api.service';
import { UtilisateurService } from './../service/utilsateur.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './../service/login.service';
import { Utilisateur } from './../models/Utilisateur.model';
import { Subscription } from 'rxjs';
import { CommentProduit } from './../models/commentProduit';
import { Produit } from './../models/Produit.model';
import { Component, OnInit } from '@angular/core';
import { ProduitApiService } from '../service/produit.api.service';
import { formatDate, Location } from '@angular/common';

@Component({
  selector: 'app-DetailProduit',
  templateUrl: './DetailProduit.component.html',
  styleUrls: ['./DetailProduit.component.css']
})
export class DetailProduitComponent implements OnInit {

  produit: Produit = new Produit;
  commentProduitList: CommentProduit[];
  commentProduitCount: number;
  isAuth: boolean;
  isAuthSubscription: Subscription;
  utilisateur: Utilisateur = new Utilisateur;
  utilisateurSubscription: Subscription;
  commentaire: string = '';
  id: number;
  currentDate: Date;
  dateToAdd: string;
  timeToAdd: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private produitApiService: ProduitApiService,
    private location: Location,
    private commentProduitApiService: CommentProduitApiService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem("utilisateur") !== null){
      this.utilisateur = JSON.parse(sessionStorage.utilisateur);
      this.isAuth = true;
    }else{
      this.isAuthSubscription = this.loginService.authSubject.subscribe(
        (isAuth: boolean) =>{
          this.isAuth = isAuth;
        }
      )
    }
    this.loginService.emitAuthStatus();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduit(this.id);
    this.getCommentProduit(this.id);
  }

  getProduit(id: number){
    this.produitApiService.getOneProduit(id).subscribe(data => {this.produit = data})
  }

  getCommentProduit(id: number){
    this.produitApiService.getProduitComment(id).subscribe( data => {this.commentProduitList = data.list; this.commentProduitCount = data.count;})
  }

  postComment(){
    let comment = new CommentProduit();
    comment.produit = this.produit;
    comment.description = this.commentaire;
    comment.utilisateur = this.utilisateur;
    comment.date = formatDate(new Date(),'yyyy-MM-dd','en');
    this.commentProduitApiService.addComment(comment).toPromise();
    location.reload();
  }

  deleteContent(){
    this.commentaire = '';
  }

  deleteComment(id: number){
    this.commentProduitApiService.delComment(id);
    location.reload();
  }

  goBack(){
    this.location.back();
  }

}
