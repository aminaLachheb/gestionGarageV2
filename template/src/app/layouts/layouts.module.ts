import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableUsersComponent } from '../component/utilisateurs/table-users/table-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2OrderModule } from 'ng2-order-pipe';
@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [/*LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent, HorizontalComponent, VerticalComponent, 
  HorizontaltopbarComponent, TableUsersComponent*/],
  imports: [
    Ng2OrderModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    NgxPaginationModule,
    TranslateModule,
    RouterModule,
    NgbDropdownModule,
    ClickOutsideModule,
    NgbAlertModule,
    UIModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  providers: [LanguageService]
})
export class LayoutsModule { }
