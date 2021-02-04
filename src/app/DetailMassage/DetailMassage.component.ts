import { CommentMassageApiService } from './../service/commentMassage.api.service';
import { UtilisateurService } from './../service/utilsateur.service';
import { Utilisateur } from './../models/Utilisateur.model';
import { CommentMassage } from './../models/commentMassage';
import { Massage } from './../models/massage.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { MassageApiService } from '../service/massage.api.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-DetailMassage',
  templateUrl: './DetailMassage.component.html',
  styleUrls: ['./DetailMassage.component.scss']
})
export class DetailMassageComponent implements OnInit {

  massage: Massage;
  commentMassageList: CommentMassage[];
  commentMassageCount: number;
  isAuth: boolean;
  isAuthSubscription: Subscription;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;
  commentaire: string;
  id: number;
  currentDate: Date;
  dateToAdd: string;
  timeToAdd: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private massageApiService: MassageApiService,
    private location: Location,
    private utilisateurService: UtilisateurService,
    private commentMassageApiService: CommentMassageApiService
    ) { }

  ngOnInit() {
    this.isAuthSubscription = this.loginService.authSubject.subscribe(
      (isAuth: boolean) =>{ this.isAuth = isAuth; });
    this.utilisateurSubscription = this.utilisateurService.utilisateurSubject.subscribe(
      (utilisateur: Utilisateur) =>{ this.utilisateur = utilisateur; });
    this.utilisateurService.emitUtilisateur();
    this.loginService.emitAuthStatus();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMassage(this.id);
    this.getCommentMassage(this.id);
  }

  getMassage(id: number) {
    this.massageApiService.getOneMassage(id).subscribe( data => {this.massage = data;});
  }

  getCommentMassage(id: number){
    this.massageApiService.getMassageComment(id).subscribe( data => {this.commentMassageList = data.list; this.commentMassageCount = data.count;} );
  }

  postComment(){
    let comment = new CommentMassage();
    comment.massage = this.massage;
    comment.description = this.commentaire;
    comment.utilisateur = this.utilisateur;
    this.getCurrentDate();
    comment.date = this.dateToAdd;
    this.commentMassageApiService.addComment(comment).toPromise();
  }

  getCurrentDate(){
    this.currentDate = new Date()
    let dateToday = new Date(this.currentDate.getUTCFullYear(),this.currentDate.getUTCMonth(),
                    this.currentDate.getUTCDate()+1,this.currentDate.getUTCHours(),this.currentDate.getUTCMinutes(), this.currentDate.getSeconds())
    this.dateToAdd = formatDate(dateToday,'yyyy-MM-dd','en')
    this.timeToAdd = formatDate(dateToday,'HH:mm:ss','en')
   }

  goBack() {
    this.location.back();
  }

}
