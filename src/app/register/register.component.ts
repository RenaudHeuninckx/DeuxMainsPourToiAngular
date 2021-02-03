import { RegisterService } from './../service/register.service';
import { Utilisateur } from './../models/Utilisateur.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../service/mustMatch';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  pseudoOk: string;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      pseudo: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8), this.hasUpperCase, this.hasLowerCase, this.hasDigit, this.hasSpecialChar]],
      confPassword: ['',Validators.required],
      tel: [''],
      mob: [''],
      adresse: ['',Validators.required],
      cp: ['',Validators.required],
      loc: ['',Validators.required],
      complAdr: [''],
      dateNaiss: ['']
    }, {
      validator: MustMatch('password', 'confPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    const formValue = this.registerForm.value;
    let toCreate = new Utilisateur();
    toCreate.nom = formValue['nom'];
    toCreate.prenom = formValue['prenom'];
    toCreate.pseudo = formValue['pseudo'];
    toCreate.email = formValue['email'];
    toCreate.password = formValue['password'];
    toCreate.tel = formValue['tel'];
    toCreate.gsm = formValue['gsm'];
    toCreate.adresse = formValue['adresse'];
    toCreate.cp = formValue['cp'];
    toCreate.loc = formValue['loc'];
    toCreate.complAdr = formValue['complAdr'];
    toCreate.dateNaiss = formValue['dateNaiss']
    toCreate.admin = false;
    toCreate.inscrit = new Date();
    toCreate.supprime = null;
    this.registerService.register(toCreate);
  }

  onReset() {
    this.registerForm.reset();
    this.submitted = false;
  }

  createPseudo(){
    this.pseudoOk = this.registerForm.value['prenom'] + " " + this.registerForm.value['nom'];
    this.registerForm.patchValue({pseudo: this.pseudoOk});
  }

  hasUpperCase(control: FormControl){
    var upperLetter = /[A-Z]/g;
    return upperLetter.test(control.value) ? null : {
      hasUpperCase: {
        valid: false
      }
    }
  }

  hasLowerCase(control: FormControl){
    var lowerLetter = /[a-z]/g;
    return lowerLetter.test(control.value) ? null : {
      hasLowerCase: {
        valid: false
      }
    }
  }

  hasDigit(control: FormControl){
    var digit = /[0-9]/g
    return digit.test(control.value) ? null : {
      hasDigit: {
        valid: false
      }
    }
  }

  hasSpecialChar(control: FormControl){
    var specChar = /[!@#&()$]/g;
    return specChar.test(control.value) ? null : {
      hasSpecChar: {
        valid: false
      }
    }
  }



}
