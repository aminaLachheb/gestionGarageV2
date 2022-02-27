import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/account/auth/login/login.component';
import { AjouterUserComponent } from 'src/app/component/utilisateurs/ajouter-user/ajouter-user.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/component/profile/profile-societe/profile.component';
import { TableDocumentsComponent } from 'src/app/component/documents/table-documents/table-documents.component';
import { TableUsersComponent } from 'src/app/component/utilisateurs/table-users/table-users.component';

import { LayoutComponent } from './layouts/layout.component';
import { DefaultComponent } from './pages/dashboards/default/default.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { RoleGuard } from 'src/app/services/role.guard';
import { AfficherPDFComponent } from './component/documents/afficher-pdf/afficher-pdf.component';
import { PasswordresetComponent } from './account/auth/passwordreset/passwordreset.component';
import { ChangePwdComponent } from './account/auth/change-pwd/change-pwd.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { VoitureComponent } from './component/voitures/voiture/voiture.component';
import { AjouterVoitureComponent } from './component/voitures/ajouter-voiture/ajouter-voiture.component';
import { ModifierVoitureComponent } from './component/voitures/modifier-voiture/modifier-voiture.component';
import { EspaceAdminComponent } from './component/espace-admin/espace-admin.component';
import { DashboardVoitureComponent } from './component/dashboard-voiture/dashboard-voiture.component';
import { AjouterPrixVenteComponent } from './component/voitures/ajouter-prix-vente/ajouter-prix-vente.component';
const routes: Routes = [
  { path: '', component: LoginComponent,loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
 /* { path: 'dashboard', component: LayoutComponent, 
  loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  canActivate:[AuthGuard]
 },*/
  { path: 'account',loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'ajouter', component: AjouterUserComponent, canActivate:[AuthGuard]},
  //{ path: 'document', component: TableDocumentsComponent,canActivate:[AuthGuard]},
  { path: 'utilisateurs', component: TableUsersComponent,canActivate:[AuthGuard,RoleGuard]},
  //{ path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard,RoleGuard]},
  { path: 'changePwd', component: ChangePwdComponent},
  { path: 'reset-password', component: PasswordresetComponent},
  { path: 'voitures', component: VoitureComponent},
  { path: 'ajouterVoiture', component: AjouterVoitureComponent},
  { path: 'modifierVoiture', component: ModifierVoitureComponent},
  { path: 'espaceAdmin', component: EspaceAdminComponent},
  { path: 'dashboard', component: DashboardVoitureComponent},
  { path: 'ajoutPrixVente', component: AjouterPrixVenteComponent},
  { path: '**', component: NotFoundComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
