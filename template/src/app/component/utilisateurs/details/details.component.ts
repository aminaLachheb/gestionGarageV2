import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from 'src/app/models/User';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
user: user = new user();
infoForm: FormGroup;
completeName;

  constructor(    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.user.id = data.id;
      this.user.prenom = data.prenom;
      this.user.nom = data.nom;
      this.user.tel = data.tel;
      this.user.email = data.email;
      this.user.role = data.role;
      this.completeName = data.nom+ ' '+ data.prenom;

    }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      prenom: [this.user.prenom, []],
      nom: [this.user.nom, []],
      tel: [this.user.tel, []],
      email: [this.user.email, []],
      role: [this.user.role, []]
  });    
  }

  fermer() {
    this.dialogRef.close();
    
}

}
