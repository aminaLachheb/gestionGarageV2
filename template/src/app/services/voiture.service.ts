import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url_config } from '../config/url_config';
import { voiture } from '../models/voiture';



@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) {}
    getVoitures(): Observable<voiture[]>{
      return this.http.get<voiture[]>(`${url_config.voiture}`);
    }
    addVoiture(data):Observable<any>{
      return this.http.post(`${url_config.voiture}`,data);
    }
    getVoitureById(id: string): Observable<voiture[]>{
      return this.http.get<voiture[]>(`${url_config.voiture}`+'/'+id);
    }
    deleteVoiture(id : string): Observable<any>{    
      return this.http.delete<any>(`${url_config.voiture}`+'/'+id);
    }
    updateVoiture(id: string, voiture:voiture): Observable<any>{      
      return this.http.put<any>(`${url_config.voiture}`+'/'+id, voiture);
    } 
    countVoiture(): Observable<any>{
      return this.http.get<any>(`${url_config.voiture}`+'/count');
    }
    countVoitureDispo(employe:string): Observable<any>{
      return this.http.get<any>(`${url_config.voiture}`+`/dispo/${employe}`);
    }
    countVoitureNonDispo(employe:string): Observable<any>{
      return this.http.get<any>(`${url_config.voiture}`+`/nonDispo/${employe}`);
    }
    countDispo(): Observable<any>{
      return this.http.get<any>(`${url_config.voiture}`+`/dispo`);
    }
    countNonDispo(): Observable<any>{
      return this.http.get<any>(`${url_config.voiture}`+`/nonDispo`);
    }
    
    match(controlName: string, checkControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);
  
        if (checkControl.errors && !checkControl.errors.matching) {
          return null;
        }
  
        if (control.value > checkControl.value) {
          controls.get(checkControlName).setErrors({ matching: true });
          return { matching: true };
        } else {
          return null;
        }
      };
    }
}
