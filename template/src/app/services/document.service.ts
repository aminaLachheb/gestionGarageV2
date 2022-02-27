import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_config } from '../config/url_config';
import { document } from '../models/Document';
import { ngFileUpload } from '../models/ngFileUpload';



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) { }

  getDocuments():Observable<document[]>{
    return this.http.get<document[]>(`${url_config.getDocuments}`);
  }

  countDocuments():Observable<any>{
    return this.http.get<any>(`${url_config.countDocuments}`);
  }

  countSigne():Observable<any>{
    return this.http.get<any>(`${url_config.countSigne}`);
  }

  countNonSigne():Observable<any>{
    return this.http.get<any>(`${url_config.countNonSigne}`);
  }

  countProjetNonSigne(projet: string):Observable<any>{
    return this.http.get<any>(`${url_config.countNonSigne}`+`/${projet}`);
  }

  countProjetSigne(projet: string):Observable<any>{
    return this.http.get<any>(`${url_config.countSigne}`+`/${projet}`);
  }

  updateState(id:string, document:document){
    return this.http.patch<any>(`${url_config.getDocuments}`+`/${id}`, document);
  }

  signer(fileName:string):Observable<any>{
    return this.http.post<any>(`${url_config.signer}`+`${fileName}`, null);
  }

  postSign(uuid:string, fileId:string):Observable<any>{
    return this.http.get<any>(`${url_config.postSign}`+`${uuid}/${fileId}`,{ responseType: 'text' as 'json' });
  }

 
}
