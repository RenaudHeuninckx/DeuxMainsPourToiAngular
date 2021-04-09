import { AuthService } from './../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  errorMessage = 'Invalid credentials';
  succesMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService
              ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      //email: ['',[Validators.required,Validators.email]],
      login: ['',Validators.required],
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
    logInfo.email = formValue["login"];
    //logInfo.email = formValue["email"];
    logInfo.password = formValue["password"];
    console.log("ici")
    this.handleLogin(logInfo.email, logInfo.password);
    //this.loginService.signIn(logInfo);
  }

  onReset(){
    this.submitted = false;
    this.loginForm.reset();
  }

  handleLogin(login, password) {
    this.authService.authenticationService(login, password).subscribe((res) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.succesMessage = 'Login successful.';
      this.router.navigate(["/home"]);
      console.log("bien");
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      console.log("pas bien")
    });
  }

}
