import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_config } from '../config/url_config';
import { activite } from '../models/activite';
import { transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTransactions():Observable<transaction[]>{
    return this.http.get<transaction[]>(`${url_config.getTransactions}`);
  }

  postActivite(data:activite):Observable<any>{
    return this.http.post<any>(`${url_config.postActivite}`, data)
  }

  getActivites():Observable<activite[]>{
    return this.http.get<activite[]>(`${url_config.getActivites}`);
  }
}
