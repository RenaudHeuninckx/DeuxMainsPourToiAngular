import { MassageApiService } from '../service/massage.api.service';
import { Massage } from '../models/massage.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-massageDetail',
  templateUrl: './massageDetail.component.html',
  styleUrls: ['./massageDetail.component.scss']
})
export class MassageDetailComponent implements OnInit {

  massage: Massage;

  constructor(
    private route: ActivatedRoute,
    private massageApiService: MassageApiService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMassage();
  }

  getMassage() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.massageApiService.getOneMassage(id).subscribe( data => this.massage = data);
  }

  getCommentMassage(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.massageApiService.
  }

  goBack() {
    this.location.back();
  }
}
