import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbAlertModule, NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AjouterUserComponent } from './component/utilisateurs/ajouter-user/ajouter-user.component';
import { ModifierComponent } from './component/utilisateurs/modifier/modifier.component'; // <-- import the module
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from './services/auth.guard';
import { TableDocumentsComponent } from './component/documents/table-documents/table-documents.component';
import { LayoutComponent } from './layouts/layout.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { VerticalComponent } from './layouts/vertical/vertical.component';
import { TableUsersComponent } from './component/utilisateurs/table-users/table-users.component';
import { HorizontalComponent } from './layouts/horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './layouts/horizontaltopbar/horizontaltopbar.component';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LanguageService } from './core/services/language.service';
import { DefaultComponent } from './pages/dashboards/default/default.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileComponent } from './component/profile/profile-societe/profile.component';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AfficherPDFComponent } from './component/documents/afficher-pdf/afficher-pdf.component';
import { ModifierProfileComponent } from './component/profile/modifier-profile/modifier-profile.component';
import { DetailsComponent } from './component/utilisateurs/details/details.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { VoitureComponent } from './component/voitures/voiture/voiture.component';
import { AjouterVoitureComponent } from './component/voitures/ajouter-voiture/ajouter-voiture.component';
import { ModifierVoitureComponent } from './component/voitures/modifier-voiture/modifier-voiture.component';
import { DashboardVoitureComponent } from './component/dashboard-voiture/dashboard-voiture.component';
import { EspaceAdminComponent } from './component/espace-admin/espace-admin.component';
import { AjouterPrixVenteComponent } from './component/voitures/ajouter-prix-vente/ajouter-prix-vente.component';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    AjouterUserComponent,
    ModifierComponent, 
    TableDocumentsComponent,
    LayoutComponent, 
    SidebarComponent, 
    TopbarComponent, 
    FooterComponent, 
    HorizontalComponent, 
    VerticalComponent, 
    HorizontaltopbarComponent, 
    TableUsersComponent, 
    DashboardComponent, 
    ProfileComponent, AfficherPDFComponent, ModifierProfileComponent, DetailsComponent,
     NotFoundComponent, VoitureComponent, AjouterVoitureComponent, ModifierVoitureComponent, DashboardVoitureComponent, EspaceAdminComponent, AjouterPrixVenteComponent, 
   ],
  imports: [
    NgxExtendedPdfViewerModule,
    AvatarModule,
    //PdfViewerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    Ng2OrderModule,
    PerfectScrollbarModule,
    BrowserModule,
    MatSelectModule,
    NgbDropdownModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    CarouselModule,
    NgxPaginationModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    NgxPaginationModule,
    ScrollToModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    LanguageService,
    AuthGuard
    /*{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/
  ],
})
export class AppModule { }
