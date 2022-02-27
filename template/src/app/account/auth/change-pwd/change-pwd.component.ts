import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { keyAndPassword } from 'src/app/models/keyAndPassword';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  year: number = new Date().getFullYear();
  keyPwd:keyAndPassword= new keyAndPassword();
  showPassword : boolean;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private loginService: LoginService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirm: new FormControl('',[Validators.required])
    },
    {
      validators: [this.userService.match('password', 'confirm')]
    });
  }
  get f() { return this.resetForm.controls; }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
   

    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }else{
      this.keyPwd.password = this.f.password.value;
      this.keyPwd.confirmPassword = this.f.confirm.value;
      this.keyPwd.resetKey = JSON.parse(localStorage.getItem('resetKey'));      
      this.loginService.resetPasswordFinish(this.keyPwd).subscribe(res=>{
        localStorage.removeItem('resetKey');
        this.router.navigate(['/']);
      },
      error=>{
        if(HttpErrorResponse){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Entrées invalid!',
          });
          this.resetForm.reset();
      }});
    }
  }

}
