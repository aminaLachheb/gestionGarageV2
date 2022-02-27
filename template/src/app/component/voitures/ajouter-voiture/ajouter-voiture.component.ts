import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture.service';
import { LoginService } from 'src/app/services/login.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { activite } from 'src/app/models/activite';
@Component({
  selector: 'app-ajouter-voiture',
  templateUrl: './ajouter-voiture.component.html',
  styleUrls: ['./ajouter-voiture.component.scss']
})
export class AjouterVoitureComponent implements OnInit {

  AjoutForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  voiture: voiture = new voiture();
  exist: boolean = true;
  activite : activite = new activite();

  constructor( private router: Router,
    private voitureService: VoitureService,
    private dialogRef: MatDialogRef<AjouterVoitureComponent>,
    private loginService:LoginService, 
    private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.AjoutForm = new FormGroup({
      model: new FormControl('',[Validators.required]),
      marque: new FormControl('',[Validators.required]),
      prix: new FormControl('',[Validators.required]),
      annee: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      lien: new FormControl('',[Validators.required])
    })
   
  }
  get f() { return this.AjoutForm.controls; }

  fermer() {
    this.dialogRef.close();
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  } 
  onSubmit() {
    
    console.log(this.voiture);

    
    // stop here if form is invalid
    if (this.AjoutForm.invalid && this.voiture.employe == '') {
      return;
      }else{
         let tokenInfo = this.getDecodedAccessToken(localStorage.getItem('token'));
    this.loginService.getUserById(tokenInfo.id).subscribe(
      res=>{
        this.voiture.employe = res.nom +' '+res.prenom;
        this.activite.nom  = res.nom +' '+res.prenom;
        this.activite.docName = this.voiture.marque +' '+ this.voiture.model;
        this.activite.date = new Date();
        this.activite.action = 'ajoute';
        this.dashboardService.postActivite(this.activite).subscribe(res=>{
          console.log(res);
          location.reload();

        })
     
         this.voitureService.addVoiture(this.voiture).subscribe(
          data => {
            console.log('data', data);
            
            this.successmsg = true;
            if (this.successmsg) {                
              this.fermer();
              location.reload();
            }
          })
        });
      }
       
      }
    }
