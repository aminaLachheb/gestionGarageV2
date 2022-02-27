import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {
  infoForm: FormGroup;
  user: user = new user();
  completeName;
  submitted = false;
  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<ModifierComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.user.id = data.id;
      this.user.prenom = data.prenom;
      this.user.nom = data.nom;
      this.user.tel = data.tel;
      this.user.email = data.email;
      this.user.role = data.role;
      this.completeName = data.nom +' '+data.prenom;
    }
  ngOnInit(): void {
   // console.log(this.user);
    
   this.infoForm = new FormGroup({
    prenom: new FormControl(this.user.prenom,[]),
    nom: new FormControl(this.user.nom,[]),
    tel: new FormControl(this.user.tel,[Validators.required, Validators.minLength(8)]),
    email: new FormControl(this.user.email, []),
    role: new FormControl(this.user.role, [])
  });

  }
  get f() { return this.infoForm.controls; }

  fermer() {
    this.dialogRef.close();
    
}
  modifier(){
    this.submitted = true;
    if(this.infoForm.invalid){
      return;
    }else{
    Swal.fire({
      title: 'Modification',
      text: "Vous êtes sûr ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non, annuler!',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.isConfirmed) {
     this.userService.updateUser(this.user.id.toString(), this.user).subscribe(
      res =>{
        console.log(this.user.role);
        console.log(res);
        Swal.fire(
          'modifié!',
          'L utilisateur a été modifié.',
          'success'
        )
        this.fermer();
        location.reload();
      },
      err => {
        console.error(err); 
      }
    );}
  })
}
}

}
