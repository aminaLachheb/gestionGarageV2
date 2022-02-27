import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor( public translate: TranslateService,
    public languageService: LanguageService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
   
  }
  
}
