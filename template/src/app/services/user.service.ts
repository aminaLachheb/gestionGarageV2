import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url_config } from '../config/url_config';
import { user } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<user[]>{
    return this.http.get<user[]>(`${url_config.users}`);
  }
  getUserByEmail(email: string): Observable<user[]>{
    return this.http.get<user[]>(`${url_config.users}`+`/${email}`);
  }
  
  deleteUser(id : string): Observable<any>{    
    return this.http.delete<any>(`${url_config.users}`+`/${id}`);
  }
  updateUser(id: string, user:user): Observable<any>{
    return this.http.put<any>(`${url_config.users}`+`/${id}`, user);
  }


  validateEmailNotTaken(control: AbstractControl) {
    return this.checkEmailNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { emailTaken: true };
      })
    );
  }

  //Fake API call -- You can have this in another service
  checkEmailNotTaken(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map((emailList: Array<any>) =>
        emailList.filter(user => user.email === email)
      ),
      map(users => !users.length)
    );
  }
   match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }


}
