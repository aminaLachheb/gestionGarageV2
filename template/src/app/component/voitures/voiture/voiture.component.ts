import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { voiture } from 'src/app/models/voiture';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VoitureService } from 'src/app/services/voiture.service';
import { MatTableDataSource } from '@angular/material/table';
import { AjouterVoitureComponent } from '../ajouter-voiture/ajouter-voiture.component';
import { ModifierVoitureComponent } from '../modifier-voiture/modifier-voiture.component';
import { url_config } from 'src/app/config/url_config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})
export class VoitureComponent implements OnInit {

  constructor(private voitureService: VoitureService,
    private dialogRef: MatDialog) { }
    voitures: voiture[];
    error = '';
    totalLength: any;
    pageSize = 5;
    page:number = 1;
    dataSource:any = [] ;
    ngOnInit(): voiture[] {
      this.voitureService.getVoitures().subscribe(
        res=>{
          this.voitures = res; 
          this.dataSource = new MatTableDataSource(this.voitures);
        }
      )
      // this.voitureService.getVoitures().subscribe(
      //   res => {
      //      this.voitures = res; 
      //      this.dataSource = new MatTableDataSource(this.voitures);
      //      this.totalLength = this.dataSource.length;  
           
      //   },
      //   error => {
      //     this.error = error ? error : '';
      //   });
       
        return this.voitures;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  key: any ;
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  ajouter(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "1000px";

      this.dialogRef.open(AjouterVoitureComponent, dialogConfig);
  }

    modifier(id: string){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.maxHeight = "800px";
      dialogConfig.width = "1000px";
      console.log(`${url_config.voiture}`+'/'+id);
      this.voitureService.getVoitureById(id).subscribe(res => {  
        var voiture:  voiture []= res;
        dialogConfig.data = {      
          id: voiture['id'],
          model: voiture['model'],
          marque: voiture['marque'],
          prix: voiture['prix'],
          status: voiture['status'],
          lien: voiture['lien'],
          annee: voiture['annee']
        };
        this.dialogRef.open(ModifierVoitureComponent, dialogConfig);
      });
  }

  supprimer(id: any){
  
    Swal.fire({
      title: 'Suppression',
      text: "Vous êtes sûr ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non, annuler!',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voitureService.deleteVoiture(id).subscribe(
          res =>{
            Swal.fire(
              'Supprimé!',
              'La voiture a été supprimé.',
              'success'
            )
            this.ngOnInit();
          },
          err => {
            console.error(err); 
          }
        );}
    })
  }
  
}
