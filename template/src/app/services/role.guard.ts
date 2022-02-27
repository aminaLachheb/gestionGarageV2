import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router
  ){
         
  }
  canActivate(){
      let Role = localStorage.getItem('userRole');
      if(Role == "admin"){
          return true;
      }
      alert("Désolé vous n'êtes pas un administrateur!");
      this.router.navigate(['dashboard']);
          return false;
  }
  
}
