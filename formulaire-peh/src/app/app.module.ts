import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormOrganismeComponent } from './form/formOrganisme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormDescriptionProjetComponent } from './form-description-projet/form-description-projet.component';
import { FormPartenairesComponent } from './form-partenaires/form-partenaires.component';
import { FormAttestationComponent } from './form-attestation/form-attestation.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormDescriptionPSELCEComponent } from './form-description-pselce/form-description-pselce.component';
import { FormPSELCEComponent } from './form-pselce/form-pselce.component';
import { FormAdresseLivraisonComponent } from './form-adresse-livraison/form-adresse-livraison.component';
  
@NgModule({
  declarations: [
    AppComponent,
    FormOrganismeComponent,
    FormDescriptionProjetComponent,
    FormPartenairesComponent,
    FormAttestationComponent,
    ConnexionComponent,
    FormDescriptionPSELCEComponent,
    FormPSELCEComponent,
    FormAdresseLivraisonComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'organisme', 
        component: FormOrganismeComponent
      },
      {
        path: 'descriptionprojet',
        component: FormDescriptionProjetComponent
      },
      {
        path: 'descriptionpselce',
        component: FormDescriptionPSELCEComponent
      },
      {
        path: 'pselce',
        component: FormPSELCEComponent
      },
      {
        path: 'partenaires',
        component: FormPartenairesComponent
      },
      {
        path: 'adresselivraison',
        component : FormAdresseLivraisonComponent
      },
      {
        path: 'attestation',
        component: FormAttestationComponent
      },
      {
        path: '',
        component: ConnexionComponent
      }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }