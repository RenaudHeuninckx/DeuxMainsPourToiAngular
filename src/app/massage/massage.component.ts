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

  constructor(
    public massageApiService: MassageApiService
  ) { }

  ngOnInit() {
    this.massageApiService.getAllMassage().subscribe(
      data =>{
        this.listMassage = data.list;
        this.countMassage = data.count;
      }
    )
  }

}
