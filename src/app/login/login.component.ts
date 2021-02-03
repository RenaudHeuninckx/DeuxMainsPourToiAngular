import { LoginService } from '../service/login.service';
import { LoginInfo } from './../models/LoginInfo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService
              ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    const formValue = this.loginForm.value;
    let logInfo = new LoginInfo();
    logInfo.email = formValue["email"];
    logInfo.password = formValue["password"];
    this.loginService.signIn(logInfo);
  }

  onReset(){
    this.submitted = false;
    this.loginForm.reset();
  }

}
