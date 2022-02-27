import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { url_config } from '../config/url_config';
import { resetPasswordInit } from '../models/resetPasswordInit';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string;
  logged: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      
    } ),responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router:Router,
    private userService : UserService) { 
    }
  
  login(data):Observable<any>{
    return this.http.post(`${url_config.login}`,data);
  }

  getCurrentUser():Observable<string>{
    return this.http.get<string>(`${url_config.getCurrentUser}`);
  }

  getUserById(id: string):Observable<any>{
    return this.http.get(`${url_config.getUserById}`+`${id}`);
  }

  isUserLoggedIn(){
    if(this.token){
    return this.logged;
  }
    else {
      return this.logged = true;
    }
  }
  saveToken(jwt:string){
    this.logged = true;
    localStorage.setItem('token', JSON.stringify(jwt));
    this.token = jwt;
  }
 
  saveInfo(email: string){
    this.userService.getUserByEmail(email).subscribe( res => {
      localStorage.setItem('userRole', res[0].role);
    });     
  }
 

  signup(data):Observable<any>{
    return this.http.post<any>(`${url_config.signup}`,data);
  }

  resetPassword(data):Observable<any>{
    return this.http.post<any>(`${url_config.resetPassword}`,data,this.httpOptions);
  }

  resetPasswordFinish(data):Observable<any>{
    return this.http.put<any>(`${url_config.resetPasswordFinish}`,data, this.httpOptions);
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.cookieService.delete('name');
    this.router.navigate(['account/login']);
  }
  
}
