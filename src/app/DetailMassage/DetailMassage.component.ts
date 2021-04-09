import { CommentMassageApiService } from './../service/commentMassage.api.service';
import { Utilisateur } from './../models/Utilisateur.model';
import { CommentMassage } from './../models/commentMassage';
import { Massage } from './../models/massage.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { MassageApiService } from '../service/massage.api.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-DetailMassage',
  templateUrl: './DetailMassage.component.html',
  styleUrls: ['./DetailMassage.component.scss']
})
export class DetailMassageComponent implements OnInit {

  massage: Massage = new Massage;
  commentMassageList: CommentMassage[];
  commentMassageCount: number;
  isAuth: boolean;
  isAuthSubscription: Subscription;
  utilisateur: Utilisateur =new Utilisateur;
  utilisateurSubscription: Subscription;
  commentaire: string = '';
  id: number;
  currentDate: Date;
  dateToAdd: string;
  timeToAdd: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private massageApiService: MassageApiService,
    private location: Location,
    private commentMassageApiService: CommentMassageApiService
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
      );
    }
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
    comment.date = formatDate(new Date(),'yyyy-MM-dd','en');
    this.commentMassageApiService.addComment(comment).toPromise();
    location.reload();
  }

  deleteContent(){
    this.commentaire = '';
  }

  deleteComment(id: number){
    this.commentMassageApiService.delComment(id);
    location.reload();
  }

  goBack() {
    this.location.back();
  }

}
