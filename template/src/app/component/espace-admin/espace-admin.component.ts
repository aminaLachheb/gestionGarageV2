import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { url_config } from 'src/app/config/url_config';
import { voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture.service';
import { AjouterPrixVenteComponent } from '../voitures/ajouter-prix-vente/ajouter-prix-vente.component';

@Component({
  selector: 'app-espace-admin',
  templateUrl: './espace-admin.component.html',
  styleUrls: ['./espace-admin.component.scss']
})
export class EspaceAdminComponent implements OnInit {

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

  ajouterPrixVente(id: string){
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
          annee: voiture['annee'],
          employe: voiture['employe'],
          prixVente: voiture['prixVente']
        };
        console.log(dialogConfig.data);

        this.dialogRef.open(AjouterPrixVenteComponent, dialogConfig);
      });
  }


}
