import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModifierComponent } from 'src/app/component/utilisateurs/modifier/modifier.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { LoginService } from 'src/app/services/login.service';
import { AjouterUserComponent } from '../ajouter-user/ajouter-user.component';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {
  users: user[];
  error = '';
  totalLength: any;
  pageSize = 5;
  page:number = 1;
  dataSource:any = [] ;
  user: user;
  constructor(private userService: UserService,
    private loginService: LoginService,
    public translate: TranslateService,
    public languageService: LanguageService,
    private dialogRef: MatDialog) { }

  ngOnInit(): user[] {
    this.userService.getUsers().subscribe(
      res => {
         this.users = res;  
         this.dataSource = new MatTableDataSource(this.users);
         this.totalLength = this.dataSource.length;  
      },
      error => {
        this.error = error ? error : '';
      });
      return this.users;
}
/*recherche(){
    if(this.rech === ''){
      this.ngOnInit();      
        }
        else{
          this.users = this.users.filter(res => 
            {              
              return res.email.toLocaleLowerCase().match(this.rech.toLocaleLowerCase());
            })
        }
}*/
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  //console.log(filterValue);
  this.dataSource.filter = filterValue.trim().toLowerCase();
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
      this.userService.deleteUser(id.toString()).subscribe(
        res =>{
          Swal.fire(
            'Supprimé!',
            'L utilisateur a été supprimé.',
            'success'
          )
          //this.router.navigateByUrl('dashboard');
          //window.location.reload();
          this.ngOnInit();
        },
        err => {
          console.error(err); 
        }
      );}
  })
}

modifier(email: string){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.maxHeight = "800px";
  dialogConfig.width = "1000px";
  this.userService.getUserByEmail(email).subscribe((res: user[]) => {    
    //console.log(res[0]);
    dialogConfig.data = {      
      id: res[0].id,
      prenom: res[0].prenom,
      nom: res[0].nom,
      tel: res[0].tel,
      email: res[0].email,
      role: res[0].role
    };
    //console.log(dialogConfig.data);
    this.dialogRef.open(ModifierComponent, dialogConfig);
  });
}

Ajouter(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.maxHeight = "800px";
  dialogConfig.width = "1000px";

    //console.log(dialogConfig.data);
    this.dialogRef.open(AjouterUserComponent, dialogConfig);
}

key: string ;
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;

}

}