import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  societe, } from 'src/app/models/societe';
import { SocieteService } from 'src/app/services/societe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss']
})
export class ModifierProfileComponent implements OnInit {
   societe: societe = new societe();
   ProfileForm: FormGroup;
   submitted = false;
  constructor(private fb: FormBuilder,
    private societeService : SocieteService,
    private dialogRef: MatDialogRef<ModifierProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.societe.id = data.id,
      this.societe.nomSociete = data.nomSociete,
      this.societe.rib= data.rib,
      this.societe.formeJuridique= data.formeJuridique,
      this.societe.respCivile= data.respCivile,
      this.societe.codeTVA= data.codeTVA,
      this.societe.address= data.address,
      this.societe.site= data.site,
      this.societe.tel= data.tel,
      this.societe.fax= data.fax
    }

  ngOnInit(): void {    
    
   this.ProfileForm = this.fb.group({
      nom: new FormControl('',[]),
      rib: new FormControl('',[]),
      formeJuridique: ['',[]],
      rc: ['',[]],
      tva: ['',[]],
      description: ['',[Validators.required]],
      rue: ['',[Validators.required]],
      city: ['',[Validators.required]],
      code: ['',[Validators.required]],
      pays: ['',[Validators.required]],
      site: ['',[Validators.required]],
      tel: ['',[Validators.required]],
      fax: ['',[Validators.required]],
  });
      this.f.nom.disable();
      this.f.rib.disable();
      this.f.formeJuridique.disable();
      this.f.rc.disable();
      this.f.tva.disable();
  }
  get f() { return this.ProfileForm.controls; }


  fermer() {
    this.dialogRef.close();
    
}

modifier(id:string){
  this.submitted = true;
  this.ProfileForm.enable();
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
   this.societeService.putProfile(id,this.societe).subscribe(res=>{
   },error =>{
     console.log(error);
     
   }
   );
      Swal.fire(
        'modifié!',
        'L utilisateur a été modifié.',
        'success'
      )
  this.fermer();
  location.reload();
   }else{
    this.dialogRef.close();
   }
})
}

}
