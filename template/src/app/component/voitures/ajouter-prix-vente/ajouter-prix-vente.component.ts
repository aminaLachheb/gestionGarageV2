import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-prix-vente',
  templateUrl: './ajouter-prix-vente.component.html',
  styleUrls: ['./ajouter-prix-vente.component.scss']
})
export class AjouterPrixVenteComponent implements OnInit {

  infoForm: FormGroup;
  voiture: voiture = new voiture();
  submitted = false;
  error = '';
  successmsg = false;

  constructor(private voitureService: VoitureService,
    private dialogRef: MatDialogRef<AjouterPrixVenteComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.voiture.id = data.id;
      this.voiture.model = data.model;
      this.voiture.marque= data.marque;
      this.voiture.prix = data.prix;
      this.voiture.annee = data.annee;
      this.voiture.lien = data.lien;
      this.voiture.status = data.status;
      this.voiture.employe = data.employe;
      this.voiture.prixVente = data.prixVente;
    }
  ngOnInit(): void {
   this.infoForm = new FormGroup({
    model: new FormControl(this.voiture.model,[]),
    marque: new FormControl(this.voiture.marque,[]),
    prix: new FormControl(this.voiture.prix),
    annee: new FormControl(this.voiture.annee, []),
    prixVente: new FormControl(this.voiture.prixVente, [])
  },
  {
    validators: [this.voitureService.match('prix', 'prixVente')]
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
      title: 'Ajout prix',
      text: "Vous êtes sûr ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non, annuler!',
      confirmButtonText: 'Oui, ajouter!'
    }).then((result) => {
      if (result.isConfirmed && this.voiture.prixVente > this.voiture.prix) {
     this.voitureService.updateVoiture(this.voiture.id, this.voiture).subscribe(
      res =>{
        this.successmsg = true;
        Swal.fire(
          'ajouté!',
          'Le prix a été ajouté.',
          'success'
        )
        this.fermer();
        location.reload();
      },
      err => {
        console.error(err); 
      }
    );
  }
  // 
  })
}
  }



}
