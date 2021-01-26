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
  nomPseudo: string;
  prenomPseudo: string;
  pseudoOk: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    this.submitted = true;

    alert('OK \n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  createPseudo(){
    this.nomPseudo =
    this.prenomPseudo =
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
