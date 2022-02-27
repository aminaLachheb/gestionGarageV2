import { Component, Inject, OnInit,HostListener  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {saveAs} from 'file-saver/dist/FileSaver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-afficher-pdf',
  templateUrl: './afficher-pdf.component.html',
  styleUrls: ['./afficher-pdf.component.scss']
})
export class AfficherPDFComponent implements OnInit {
  pdfsrc: string ;
  pdfname: string;

  constructor(
    private http: HttpClient,
   private dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) data) { 
    this.pdfname = data.pdfname;
    this.pdfsrc = "http://[::1]:3000/storage/"+this.pdfname+".pdf";    
  } 
  
  ngOnInit(): void {
  }
  
  fermer(){
    this.dialog.closeAll();
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
  @HostListener('beforeunload', ['$event'])
   onWindowClose(event: any): void {
    alert('closed'); 
     event.preventDefault();
     event.returnValue = false;

  }
  
  openWindow(){
    /*let newWindow = open('http://www.google.com', 'example', 'width=300,height=300');
    newWindow.onload = function(){
      alert('closed'); 
    }*/
  }


 
}
