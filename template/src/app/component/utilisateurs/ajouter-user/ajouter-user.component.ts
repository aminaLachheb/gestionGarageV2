import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { user } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajouter-user',
  templateUrl: './ajouter-user.component.html',
  styleUrls: ['./ajouter-user.component.scss']
})
export class AjouterUserComponent implements OnInit {

  AjoutForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  user: user = new user();
  exist: boolean = true;

  constructor( private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AjouterUserComponent>) { }

  ngOnInit(): void {
    this.AjoutForm = new FormGroup({
      prenom: new FormControl('',[Validators.required]),
      nom: new FormControl('',[Validators.required]),
      tel: new FormControl('',[Validators.required, Validators.minLength(8)]),
      email: new FormControl('',[Validators.required, Validators.email],
      [this.userService.validateEmailNotTaken.bind(this.userService)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)]),
      confirm: new FormControl('',[Validators.required]),
    },
    {
      validators: [this.userService.match('password', 'confirm')]
    })
  }
  get f() { return this.AjoutForm.controls; }

  fermer() {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.submitted = true;
     this.user.role = "personnel";
     this.user.status = "CREATED";
     
    // stop here if form is invalid
    if (this.AjoutForm.invalid) {
      return;
      }else{
      if(this.user.password != this.user.confirm){
        alert("Mot de passe non confirmée");
        this.AjoutForm.controls.password.reset();
        this.AjoutForm.controls.confirm.reset();
      }
      else{
        if(this.user.password === this.user.confirm){
        this.loginService.signup(this.user)
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {                
                this.fermer();
                location.reload();
              }
            },
            error => {
              this.error = error ? error : '';
            });
          }else{
            return;
          }
      }
    }
  }
}