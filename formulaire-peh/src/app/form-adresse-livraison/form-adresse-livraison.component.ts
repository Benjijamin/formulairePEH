import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-adresse-livraison',
  templateUrl: './form-adresse-livraison.component.html',
  styleUrls: ['./form-adresse-livraison.component.css']
})
export class FormAdresseLivraisonComponent implements OnInit {
  form : FormGroup;
  municipalites : any;
  regions : any;

  constructor(private http: HttpClient, private router : Router, private formDataService : FormDataService) {
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      materielEntrepot : new FormControl(false),
      regionExpedibus : new FormControl(),
      villeExpedibus : new FormControl(),
      pointServiceExpedibus : new FormControl(),
      adresseExpedibus : new FormControl(),
      codePostalExpedibus : new FormControl(),
      telephoneExpedibus : new FormControl(),
      adresseOrganisme : new FormControl(false),
      adresseHiver : new FormControl(),
      villeHiver : new FormControl(),
      codePostalHiver : new FormControl() 
    });

    this.getMunicipalites();
    this.getRegions();
    this.getFormData();
  }

  getFormData(){
    this.formDataService.getFormAdresseLivraison().subscribe(data => {
      if(data){
        this.setFormData(data);
      }
    });
  }

  setFormData(data){
    this.form.get('materielEntrepot').setValue(data.materielentrepot);
    this.form.get('regionExpedibus').setValue(data.regionexpedibus);
    this.form.get('villeExpedibus').setValue(data.villeexpedibus);
    this.form.get('pointServiceExpedibus').setValue(data.pointserviceexpedibus);
    this.form.get('adresseExpedibus').setValue(data.adresseexpedibus);
    this.form.get('codePostalExpedibus').setValue(data.codepostalexpedibus);
    this.form.get('telephoneExpedibus').setValue(data.telephoneexpedibus);
    this.form.get('adresseOrganisme').setValue(data.adresseorganisme);
    this.form.get('adresseHiver').setValue(data.adressehiver);
    this.form.get('villeHiver').setValue(data.villehiver);
    this.form.get('codePostalHiver').setValue(data.codepostalhiver);
  }

  getMunicipalites(){
    this.formDataService.getMunicipalites().subscribe(data => {
      this.municipalites = data;
    });
  }

  getRegions(){
    this.formDataService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
  }

  submit(){
    this.http.patch(this.formDataService.formAdresseLivraisonUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.router.navigate(['/attestation']);
    });
  }

  back(){
    this.router.navigate(['/partenaires']);
  }

}
