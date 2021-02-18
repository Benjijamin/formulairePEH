import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-description-pselce',
  templateUrl: './form-description-pselce.component.html',
  styleUrls: ['./form-description-pselce.component.css']
})
export class FormDescriptionPSELCEComponent implements OnInit {
  form : FormGroup;

  constructor(private http : HttpClient, private router: Router, private formDataService: FormDataService) { 
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      dateActivite : new FormControl(null),
      autreDate1 : new FormControl(null),
      autreDate2 : new FormControl(null),
      autreDate3 : new FormControl(null),
      dateDu : new FormControl(null),
      dateAu : new FormControl(null),
      clientele6a18 : new FormControl(false),
      clienteleAdulte : new FormControl(false),
      nombreParticipants : new FormControl(null),
      nombreNouveauxAdeptes : new FormControl(null),
      structureScolaire : new FormControl(false),
      structureAssociation : new FormControl(false),
      structureOuvertPublic : new FormControl(false),
      structureAutre : new FormControl(false),
      structureAutreDescr : new FormControl(null)
    });

    this.getFormData();
  }

  getFormData(){
    this.http.get(this.formDataService.getFormDescriptionPSELCEUrl()).subscribe(data => {
      this.setFormData(data);
    });
  }

  setFormData(data){
    this.form.get('dateActivite').setValue(moment(data.dateactivite).format('YYYY-MM-DD'));
    this.form.get('autreDate1').setValue(moment(data.autredate1).format('YYYY-MM-DD'));
    this.form.get('autreDate2').setValue(moment(data.autredate2).format('YYYY-MM-DD'));
    this.form.get('autreDate3').setValue(moment(data.autredate3).format('YYYY-MM-DD'));
    this.form.get('dateDu').setValue(moment(data.datedu).format('YYYY-MM-DD'));
    this.form.get('dateAu').setValue(moment(data.dateau).format('YYYY-MM-DD'));
    this.form.get('clientele6a18').setValue(data.clientele6a18);
    this.form.get('clienteleAdulte').setValue(data.clienteleadulte);
    this.form.get('nombreParticipants').setValue(data.nombreparticipants);
    this.form.get('nombreNouveauxAdeptes').setValue(data.nombrenouveauxadeptes);
    this.form.get('structureScolaire').setValue(data.structurescolaire);
    this.form.get('structureAssociation').setValue(data.structureassociation);
    this.form.get('structureOuvertPublic').setValue(data.structureouvertpublic);
    this.form.get('structureAutre').setValue(data.structureautre);
    this.form.get('structureAutreDescr').setValue(data.structureautredescr);
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
  }

  submit(){
    this.http.patch(this.formDataService.formDescriptionPSELCEUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.router.navigate(['/pselce']);
    });
  }

  back(){
    this.router.navigate(['/descriptionprojet']);
  }
}
