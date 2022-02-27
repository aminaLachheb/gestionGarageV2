import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-voiture',
  templateUrl: './modifier-voiture.component.html',
  styleUrls: ['./modifier-voiture.component.scss']
})
export class ModifierVoitureComponent implements OnInit {
    infoForm: FormGroup;
    voiture: voiture = new voiture();
    submitted = false;
    error = '';
    successmsg = false;

    constructor(private voitureService: VoitureService,
      private dialogRef: MatDialogRef<ModifierVoitureComponent>,
      @Inject(MAT_DIALOG_DATA) data) { 
        this.voiture.id = data.id;
        this.voiture.model = data.model;
        this.voiture.marque= data.marque;
        this.voiture.prix = data.prix;
        this.voiture.annee = data.annee;
        this.voiture.status = data.status;
        this.voiture.lien = data.lien;
      }
    ngOnInit(): void {
     console.log(this.voiture);
      
     this.infoForm = new FormGroup({
      model: new FormControl(this.voiture.model,[]),
      marque: new FormControl(this.voiture.marque,[]),
      prix: new FormControl(this.voiture.prix),
      annee: new FormControl(this.voiture.annee, []),
      status: new FormControl(this.voiture.status, []),
      lien: new FormControl(this.voiture.lien, [])

    });
  
    }
    get f() { return this.infoForm.controls; }
  
    fermer() {
      this.dialogRef.close();
      
  }
    onSubmit(){
      
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
       this.voitureService.updateVoiture(this.voiture.id, this.voiture).subscribe(
        res =>{
          this.successmsg = true;
          console.log(res);
          Swal.fire(
            'modifié!',
            'La voiture a été modifié.',
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
