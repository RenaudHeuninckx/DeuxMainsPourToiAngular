import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { MassageApiService } from './../service/massage.api.service';
import { Massage } from './../models/massage.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-massage',
  templateUrl: './modifier-massage.component.html',
  styleUrls: ['./modifier-massage.component.css']
})
export class ModifierMassageComponent implements OnInit {

  massage: Massage = new Massage;
  id: number;
  massageForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private massageApiService: MassageApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
  }

  initForm() {
    this.setDefaultMassage();
  }

  get f() { return this.massageForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.massageForm.invalid){
      return;
    }
    const formValue = this.massageForm.value;
    this.massage.nom = formValue["nom"];
    this.massage.description = formValue["description"];
    this.massage.duree = formValue["duree"];
    this.massage.prix = formValue["prix"];
    this.massage.type = formValue["type"];
    if ( this.id === 0 ) this.massageApiService.addMassage(this.massage);
    else this.massageApiService.updMassage(this.massage);
  }

  onReset(){
    this.submitted = false;
    this.setDefaultMassage();
  }

  getMassage(id: number) {
    this.massageApiService.getOneMassage(id).subscribe( data => {this.massage = data;});
  }

  setDefaultMassage(){
    if ( this.id === 0 ){
      this.massage.nom = 'nom';
      this.massage.type = 'type';
      this.massage.duree = '00:00:00';
      this.massage.prix = 0;
      this.massage.description = 'description';
    }else{
      this.getMassage(this.id);
    }
    this.massageForm = this.formBuilder.group({
      nom: [this.massage.nom, Validators.required],
      type: [this.massage.type],
      duree: [this.massage.duree, Validators.required],
      prix: [this.massage.prix, Validators.required],
      description: [this.massage.description, Validators.required]
    });
  }

  goBack(){
    this.location.back();
  }

}
