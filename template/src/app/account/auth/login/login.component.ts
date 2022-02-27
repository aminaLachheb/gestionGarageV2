import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { user } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
 
  formGroup: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  showPassword : boolean;
  remember:boolean = false;
  check: string ;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private loginService: LoginService, 
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService){

  }
  ngOnInit(){
    this.check = localStorage.getItem('remember');
    this.initForm();
 }
 initForm(){
  
  var credentials = JSON.parse(localStorage.getItem('credentials'));

 if(localStorage.getItem('remember') === 'true'){
    this.formGroup = new FormGroup({
      email: new FormControl(atob(credentials.split(".")[0])
      ,[Validators.required, Validators.email]),
      password: new FormControl(atob(credentials.split(".")[1]),[Validators.required]),
    });
  }
   else{
  this.formGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });}
    
}

toggleShow() {
  this.showPassword = !this.showPassword;
}
 
  get f() { return this.formGroup.controls; }

  
  onSubmit() {
    this.submitted = true;
    let jwtToken:any;
      if (this.formGroup.invalid) {
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Information manquante!',
        });
      } else {                        
          this.loginService.login(this.formGroup.value)
           .subscribe(
             data => {    
               jwtToken = data.token;
               this.loginService.saveToken(jwtToken);
               this.loginService.saveInfo(this.formGroup.value.email);
                this.router.navigate(['dashboard']);   
              },
              error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Information invalid!',
                });
                this.error = error ? error : '';
              });
        }
    }

    onCheckboxChange(e) {
      if (e.target.checked && this.formGroup.valid) {
        this.remember = true;
        localStorage.setItem('remember',JSON.stringify(this.remember));
        localStorage.setItem('credentials',JSON.stringify(btoa(this.f.email.value)+'.'+btoa(this.f.password.value)));
      } else {
        this.check = "false";
        this.remember = false;
        localStorage.setItem('remember',JSON.stringify(this.remember));
        localStorage.removeItem('credentials');
      }
    }
  }
  