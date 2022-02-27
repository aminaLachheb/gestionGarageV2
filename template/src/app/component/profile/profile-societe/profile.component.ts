import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { societe } from 'src/app/models/societe';
import { SocieteService } from 'src/app/services/societe.service';
import Swal from 'sweetalert2';
import { ModifierProfileComponent } from '../modifier-profile/modifier-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  btnDisabled: boolean = false;
  ProfileForm: FormGroup = this.fb.group({
    nom: new FormControl('',[Validators.required]),
    rib: new FormControl('',[Validators.required]),
    formeJuridique: ['',[Validators.required]],
    rc: ['',[Validators.required]],
    tva: ['',[Validators.required]],
    description: ['',[Validators.required]],
    rue: ['',[Validators.required]],
    city: ['',[Validators.required]],
    code: ['',[Validators.required]],
    pays: ['',[Validators.required]],
    site: ['',[Validators.required]],
    tel: ['',[Validators.required]],
    fax: ['',[Validators.required]],
});
  error = '';
  societe: societe = new societe();

  constructor(private router:Router, 
    private societeService: SocieteService,
    private fb: FormBuilder,
    private dialogRef: MatDialog
    ) { }
   

  fermer() {
    this.router.navigate(['dashboard']);
  }
  get f() { return this.ProfileForm.controls; }

  ngOnInit(): void {
    this.societeService.getProfiles().subscribe(res=>{
     if(res.length !== 0){
      this.btnDisabled = !this.btnDisabled;
      this.f.nom.setValue(res[0].nomSociete);
       this.f.rib.setValue(res[0].rib);
       this.f.formeJuridique.setValue(res[0].formeJuridique);
       this.f.rc.setValue(res[0].respCivile);
       this.f.tva.setValue(res[0].codeTVA);
       this.f.description.setValue(res[0].address.description);
       this.f.rue.setValue(res[0].address.street);
       this.f.city.setValue(res[0].address.cityName);
       this.f.code.setValue(res[0].address.cityCode);
       this.f.pays.setValue(res[0].address.country);
       this.f.site.setValue(res[0].site);
       this.f.tel.setValue(res[0].tel);
       this.f.fax.setValue(res[0].fax);
       this.ProfileForm.disable();
    }})
  
}
    onSubmit(): void {    
      this.submitted = true;
      Swal.fire({
        title: 'Confirmation',
        text: "Vous êtes sûr!? Les données sont inchangeables",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Non, annuler!',
        confirmButtonText: 'Oui, confirmer!'
      }).then((result) => {
        if (result.isConfirmed) {
      this.societeService.createProfile(this.societe).subscribe(res => {
          this.ProfileForm.disable();
          this.btnDisabled = !this.btnDisabled;
          Swal.fire(
            'Ajouté!',
            'Le profile a été ajouté.',
            'success'
          )
        }) 
      }
    })
      }

      modifier(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.maxHeight = "800px";
        this.societeService.getProfiles().subscribe(res  => {    
          console.log(res[0]);
          dialogConfig.data = {      
            id: res[0].id,
            nomSociete: res[0].nomSociete,
            rib: res[0].rib,
            formeJuridique: res[0].formeJuridique,
            respCivile: res[0].respCivile,
            codeTVA: res[0].codeTVA,
            address: res[0].address,
            site: res[0].site,
            tel: res[0].tel,
            fax: res[0].fax
          };
          //console.log(dialogConfig.data);
          this.dialogRef.open(ModifierProfileComponent, dialogConfig);
        });
      }
      
      
      key: string ;
      reverse: boolean = false;
      sort(key){
        this.key = key;
        this.reverse = !this.reverse;
      
      }
      
}
