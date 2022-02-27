import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { document } from 'src/app/models/Document';
import { DocumentService } from 'src/app/services/document.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { AfficherPDFComponent } from '../afficher-pdf/afficher-pdf.component';
import { HttpClient } from '@angular/common/http';
import {saveAs} from 'file-saver/dist/FileSaver';
import { ngFileUpload } from 'src/app/models/ngFileUpload';
import { activite} from 'src/app/models/activite';
import jwt_decode from "jwt-decode";
import { LoginService } from 'src/app/services/login.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';
import axios from 'axios';
@Component({
  selector: 'app-table-documents',
  templateUrl: './table-documents.component.html',
  styleUrls: ['./table-documents.component.scss']
})
export class TableDocumentsComponent implements OnInit {
  pdfsrc: string;
  documents: document[];
  error = '';
  totalLength: any;
  pageSize = 5;
  page:number = 1;
  dataSource:any = [] ;
  ngDoc: ngFileUpload = new ngFileUpload();
  activite : activite = new activite();
  constructor(private documentService: DocumentService,
    private loginService : LoginService,
    private http: HttpClient,
    private dialogRef: MatDialog,
    public translate: TranslateService,
    public languageService: LanguageService,
    private  dashboardService : DashboardService ,
    ) { }

  ngOnInit(): document[] {
    this.documentService.getDocuments().subscribe(
      res => {
         this.documents = res;  
         for (let doc of this.documents) {
          doc.size = parseFloat(doc.size.toFixed(3)); 
          
        }
         this.dataSource = new MatTableDataSource(this.documents);
         this.totalLength = this.dataSource.length;  
         
      },
      error => {
        this.error = error ? error : '';
      });
     
      return this.documents;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  //console.log(filterValue);
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
key: any ;
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}

onFileSelected(name: string) {
  var src = "http://[::1]:3000/storage/"+name+".pdf";
  /*const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.width="50%";
  dialogConfig.maxHeight="700px";
  dialogConfig.data = {      
    pdfsrc: src,
    pdfname:name
  };
  this.dialogRef.open(AfficherPDFComponent, dialogConfig);*/
  window.open(src);
}

download(name: string){
  this.http.get("http://[::1]:3000/storage/"+name+".pdf", {responseType:"blob"})
  .subscribe(pdf=>{
    const fileName = name+'.pdf';
    saveAs(pdf, fileName);
  }, 
  err=>{
    console.error(err);
  })
}

signer(document:document, action:string){
  var url: string ;
  var newwindow ;
this.documentService.signer(document.name).subscribe(res=>{
  url = 'https://app.ng-sign.com.tn/pds/#/transaction/sign/' + res.nextSigner + '?uuid=' + res.uuid;
  newwindow = window.open(url, "_blank");
  Swal.fire({
    title: 'SRA-Sign',
    text: "Re-bienvenue à SRA-Sign",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: '#008000',
    confirmButtonText: 'Merci',   
  }).then((result) => {
    if (result.isConfirmed) {
  
this.documentService.postSign(res.uuid, document.identifier).subscribe(response=>{
  console.log(response);
 newwindow.close();
  if(response === 'signed'){
    
  let tokenInfo = this.getDecodedAccessToken(localStorage.getItem('token'));
     this.loginService.getUserById(tokenInfo.id).subscribe(
       res=>{      
         this.activite.nom  = res.nom +' '+res.prenom;
         this.activite.docName = document.name;
         this.activite.date = new Date();
         this.activite.action = action;
         this.dashboardService.postActivite(this.activite).subscribe(res=>{
           console.log(res);
           location.reload();

         })
       });
      }
})
     
    }
  })
   
  })
 
}
getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
} 
ajouterActivite(name:string, action:string){
  let tokenInfo = this.getDecodedAccessToken(localStorage.getItem('token'));
  this.loginService.getUserById(tokenInfo.id).subscribe(
    res=>{      
      this.activite.nom  = res.nom +' '+res.prenom;
      this.activite.docName = name;
      this.activite.date = new Date();
      this.activite.action = action;
      this.dashboardService.postActivite(this.activite).subscribe(res=>{
        console.log(res);
        location.reload();

      })
    });
 
}


}
