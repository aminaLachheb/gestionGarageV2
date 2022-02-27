import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  user: user = new user;
  users: user[];
  //exist: number = 0;

  //users : any;
  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor( private router: Router,
    private loginService: LoginService,
    private userService: UserService) { }

  ngOnInit() {
    //this.userExist(this.user.email);    

    this.signupForm = new FormGroup({
      prenom: new FormControl('',[Validators.required]),
      nom: new FormControl('',[Validators.required]),
      tel: new FormControl('',[Validators.required, Validators.minLength(8)]),
      email: new FormControl('',[Validators.required, Validators.email],
      [this.userService.validateEmailNotTaken.bind(this.userService)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('',[Validators.required])
    },
    {
      validators: [this.userService.match('password', 'confirm')]
    });
  }
  

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  confirmPassword(password: string, confirmPassword: string): boolean{
   let confirm : boolean = false;
   if(password === confirmPassword){
     confirm = true;
   }
   return confirm;
  }
     
  /**
   * On submit form
   */
  async onSubmit() {
    //console.log('submit');

    this.submitted = true;
     this.user.role = "admin";
     this.user.status = "CREATED";
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.signupForm.reset();
      return;
    }
   
      if(this.confirmPassword (this.user.password, this.user.confirm)=== true){
        this.loginService.signup(this.user)
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {                
                this.router.navigate(['']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
          }else{    
            if(this.confirmPassword (this.user.password, this.user.confirm)=== false){
            this.signupForm.controls.password.reset();
            this.signupForm.controls.confirm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Mot de passe non confirmée!',
            });
          }
          
            }
          
        
      } 
  
}

