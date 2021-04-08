import { Router } from '@angular/router';
import { Utilisateur } from './../models/Utilisateur.model';
import { MassageApiService } from './../service/massage.api.service';
import { Component, OnInit } from '@angular/core';
import { Massage } from '../models/massage.model';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss']
})
export class MassageComponent implements OnInit {

  listMassage: Massage[];
  countMassage: number;
  utilisateur: Utilisateur;
  isAdmin: boolean = false;

  constructor(
    public massageApiService: MassageApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.massageApiService.getAllMassage().subscribe(
      data =>{
        this.listMassage = data.list;
        this.countMassage = data.count;
      }
    )
    if(sessionStorage.getItem("utilisateur") !== null) {
      this.utilisateur = JSON.parse(sessionStorage.getItem("utilisateur"));
      this.isAdmin = this.utilisateur.admin;
    }
  }

  supprimerMassage(id: number){
    this.massageApiService.deleteMassage(id);
    location.reload();
  }

}
