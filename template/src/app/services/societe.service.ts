import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_config } from '../config/url_config';
import { societe } from '../models/societe';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  private readonly URL: string ='http://localhost:3000/societes';

  constructor(private http: HttpClient) { }

  createProfile(data): Observable<any>{
    return this.http.post<any>(`${url_config.profile}`, data);
  }

  getProfile(id: string): Observable<societe>{
    return this.http.get<societe>(`${url_config.profile}`+`/${id}`);
  }

  getProfiles(): Observable<any>{
    return this.http.get<any>(`${url_config.profile}`);
  }

  putProfile(id,societe:societe): Observable<any>{
    return this.http.put<any>(`${url_config.profile}`+`/${id}`, societe);
  }
}
