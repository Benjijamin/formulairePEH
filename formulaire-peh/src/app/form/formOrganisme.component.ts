import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-formOrganisme',
  templateUrl: './formOrganisme.component.html',
  styleUrls: ['./formOrganisme.component.css']
})

export class FormOrganismeComponent implements OnInit{
  form: FormGroup;
  municipalites : any;
  
  constructor(private http: HttpClient, private router: Router, private formDataService: FormDataService) {
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      checkGroup : new FormGroup({
        isPEH : new FormControl(false),
        isPSELCE: new FormControl(false)
      }, this.checkboxValidator()),
      isEte: new FormControl(false),
      isHiver: new FormControl(false),
      nomOrganisme: new FormControl(null),
      adresse: new FormControl(null),
      ville: new FormControl(null),
      codePostal: new FormControl(null),
      salutation: new FormControl(null),
      prenom: new FormControl(null),
      nom: new FormControl(null),
      titre: new FormControl(null),
      telResidence: new FormControl(null),
      telTravail: new FormControl(null),
      telTravailPoste: new FormControl(null),
      telMobile: new FormControl(null),
      courriel: new FormControl(null),
      NEQ: new FormControl(null),
      TVQ: new FormControl(null)
    });

    this.getMunicipalites();
    this.getFormData();
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }  
  }
  
  submit(){
    this.http.patch<any>(this.formDataService.formOrganismeUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.router.navigate(['/descriptionprojet']);
    });
  }

  back(){
    this.router.navigate(['/']);
  }

  getMunicipalites(){
    this.formDataService.getMunicipalites().subscribe(data => {
      this.municipalites = data;
    });
  }

  getFormData(){
    this.http.get(this.formDataService.getFormOrganismeUrl()).subscribe(data => {
      if(data){
        this.setFormData(data);
      }
    });
  }

  setFormData(data){
      this.form.get(['checkGroup','isPEH']).setValue(data.estpeh);
      this.form.get(['checkGroup','isPSELCE']).setValue(data.estpselce);
      this.form.get('isEte').setValue(data.estete);
      this.form.get('isHiver').setValue(data.esthiver);
      this.form.get('nomOrganisme').setValue(data.nomorganisme);
      this.form.get('adresse').setValue(data.adresse);
      this.form.get('ville').setValue(data.ville);
      this.form.get('codePostal').setValue(data.codepostal);
      this.form.get('salutation').setValue(data.salutation);
      this.form.get('prenom').setValue(data.prenom);
      this.form.get('nom').setValue(data.nom);
      this.form.get('titre').setValue(data.titre);
      this.form.get('telResidence').setValue(data.telresidence);
      this.form.get('telTravail').setValue(data.teltravail);
      this.form.get('telTravailPoste').setValue(data.teltravailposte);
      this.form.get('telMobile').setValue(data.telmobile);
      this.form.get('courriel').setValue(data.courriel);
      this.form.get('NEQ').setValue(data.neq);
      this.form.get('TVQ').setValue(data.tvq);
  }

  //At least 1 checked
  checkboxValidator (): ValidatorFn {
    return function validate (formGroup: FormGroup) {
      let checked = false;
  
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
  
        if (control.value === true) {
          checked = true;
        }
      });
  
      if (!checked) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }
  
      return null;
    };
  }
}
