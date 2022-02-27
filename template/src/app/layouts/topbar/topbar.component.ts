import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { user } from 'src/app/models/User';
import { DetailsComponent } from 'src/app/component/utilisateurs/details/details.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  configData;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  name;
  email;
  completeName;
  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService,
              private loginService : LoginService,
              private userService: UserService,
              private dialogRef: MatDialog) {}

  listLang = [
    { text: 'Français', flag: 'assets/images/flags/france_flag.jpeg', lang: 'fr' },
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {  
    let tokenInfo = this.getDecodedAccessToken(localStorage.getItem('token'));
    this.loginService.getUserById(tokenInfo.id).subscribe(
      res=>{
        this.email = res.email;        
        this.name = res.nom;
        this.completeName = res.nom +' '+res.prenom;
      }
    );
    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };

    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { 
        this.valueset = 'assets/images/flags/france_flag.jpeg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  getUser(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.maxHeight = "600px";
  this.userService.getUserByEmail(this.email).subscribe((res: user[]) => {    
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
    this.dialogRef.open(DetailsComponent, dialogConfig);
  });
  }
  refresh(){
    location.reload();
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
    //location.reload();
  }

  /**
   * Toggles the right sidebar
   */

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  } 
  

  /**
   * Logout the user
   */
  logout() {
    this.loginService.logout();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
