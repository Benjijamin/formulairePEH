import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  backend = "http://localhost:3000/"

  newFormUrl = this.backend + "newForm";
  sendMailUrl = this.backend + "sendMail";
  verifyFormUrl = this.backend + "verifyform";
  PEHPSELCEUrl = this.backend + "getPEHPSELCE";
  formOrganismeUrl = this.backend + "formOrganisme";
  formPartenairesUrl = this.backend + "formPartenaires";
  formDescriptionProjetUrl = this.backend + "formDescriptionProjet";
  formDescriptionPSELCEUrl = this.backend + "formDescriptionPSELCE";
  formPSELCEUrl = this.backend + "formPSELCE";
  formAdresseLivraisonUrl = this.backend + "formAdresseLivraison";
  formAttestationUrl = this.backend + "formAttestation";
  municipalitesUrl = this.backend + "municipalites";
  regionsUrl = this.backend + "regions";

  getVerifyFormUrl(id, courriel){
    return this.verifyFormUrl + "/" + id + "/" + courriel;
  }

  getPEHPSELCEUrl(){
    return this.PEHPSELCEUrl + "/" + sessionStorage.getItem('currentFormId');
  }

  getFormOrganismeUrl(){
    return this.formOrganismeUrl + "/" + sessionStorage.getItem('currentFormId');  
  }

  getFormDescriptionProjetUrl(){
    return this.formDescriptionProjetUrl + "/" + sessionStorage.getItem('currentFormId');
  }

  getFormDescriptionPSELCEUrl(){
    return this.formDescriptionPSELCEUrl + "/" + sessionStorage.getItem('currentFormId');
  }

  getFormPSELCEUrl(){
    return this.formPSELCEUrl + "/" + sessionStorage.getItem('currentFormId');
  }

  getFormPartenairesUrl(){
    return this.formPartenairesUrl + "/" + sessionStorage.getItem('currentFormId');
  }

  getFormPartenairesDocumentsUrl(){
    return this.formPartenairesUrl + "/" + sessionStorage.getItem('currentFormId') + "/documents";
  }

  getFormAdresseLivraison(){
    return this.http.get(this.formAdresseLivraisonUrl + "/" + sessionStorage.getItem('currentFormId'));
  }

  getFormAttestation(){
    return this.http.get(this.formAttestationUrl + "/" + sessionStorage.getItem('currentFormId'));
  }

  getMunicipalites(){
    return this.http.get(this.municipalitesUrl);
  }

  getRegions(){
    return this.http.get(this.regionsUrl);
  }

  constructor(private http: HttpClient) {
  }
}
