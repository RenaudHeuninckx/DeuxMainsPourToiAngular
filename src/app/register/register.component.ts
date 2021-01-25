import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      password: ['',[Validators.required,Validators.minLength(8)]],
      confPassword: ['',Validators.required],
      tel: [''],
      mob: [''],
      rue: ['',Validators.required],
      num: [''],
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
      alert('Pas bon');
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
    this.nomPseudo = this.registerForm.value['nom'];
    this.prenomPseudo = this.registerForm.value['prenom'];
    this.pseudoOk = this.nomPseudo + this.prenomPseudo;
    console.log(this.pseudoOk);
    document.getElementById("pseudo").value = this.pseudoOk;
  }
}
