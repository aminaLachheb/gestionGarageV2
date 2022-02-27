import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resetPasswordInit } from 'src/app/models/resetPasswordInit';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 The password-reset functionality will be split into 2 parts: 
(a) the first part is where a user will submit their email address.
 If it exists in our database, we will send them a password-reset link with a unique reset key. 
 Otherwise we will deny them the ability to reset their password.
(b) The second part will be where a user with the reset key provides and confirms a new password. 
If the password meets our security standards and the reset key is valid upon querying from the database, 
the password will be reset accordingly.
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  resetPwd: resetPasswordInit = new resetPasswordInit();
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }
  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }else{

      this.resetPwd.email  = this.resetForm.controls.email.value;

      console.log(' this.resetPwd.email ',  this.resetPwd.email );
      
      this.loginService.resetPassword(this.resetPwd).subscribe(res=>{   
        localStorage.setItem('resetKey' ,JSON.stringify(res));
        Swal.fire({
          icon: 'success',
          title: 'Email',
          text: 'Email est envoyé veuillez vérifier votre boîte de réception! Vous pouvez fermer cette fenêtre',
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('https://accounts.google.com/');
            location.reload();
            }
        });
      },error=>{
        if(HttpErrorResponse){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email inexistant!',
          });
          this.resetForm.reset();
        }
      
    }
       
      );
    }
  }
}
