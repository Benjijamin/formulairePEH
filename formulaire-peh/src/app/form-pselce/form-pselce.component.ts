import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-pselce',
  templateUrl: './form-pselce.component.html',
  styleUrls: ['./form-pselce.component.css']
})
export class FormPSELCEComponent implements OnInit {
  form : FormGroup;

  constructor(private http: HttpClient, private router: Router, private formDataService: FormDataService) {
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      poisson: new FormControl(false),
      poissonOmbleFontaine : new FormControl(false),
      argent: new FormControl(false),
      argentOmbleFontaine : new FormControl(false),
      argentTruiteBrune : new FormControl(false),
      argentTruiteArcEnCiel : new FormControl(false),
      peuImporte : new FormControl(false),
      peuImporteOmbleFontaine : new FormControl(false),
      feteDeLaPeche : new FormControl(false),
      date1 : new FormControl(null),
      date2 : new FormControl(null),
      date3 : new FormControl(null),
      autreDate1 : new FormControl(null),
      autreDate2 : new FormControl(null),
      autreDate3 : new FormControl(null),
      dateDu1 : new FormControl(null),
      dateAu1 : new FormControl(null),
      dateDu2 : new FormControl(null),
      dateAu2 : new FormControl(null),
      rampePonctuelResident : new FormControl(null),
      rampePonctuelNonResident : new FormControl(null),
      rampeSaisonnierResident : new FormControl(null),
      rampeSaisonnierNonResident : new FormControl(null),
      stationPonctuelResident : new FormControl(null),
      stationPonctuelNonResident : new FormControl(null),
      stationSaisonnierResident : new FormControl(null),
      stationSaisonnierNonResident : new FormControl(null),
      stationnementPonctuelResident : new FormControl(null),
      stationnementPonctuelNonResident : new FormControl(null),
      stationnementSaisonnierResident : new FormControl(null),
      stationnementSaisonnierNonResident : new FormControl(null),
      commentaireTarification : new FormControl(null),
      transportPublic : new FormControl(),
      transportPublicDescr : new FormControl(),
      servicesAcces : new FormControl(),
      servicesAccesDescr : new FormControl(),
      contributionOrganisme : new FormControl(),
      contributionPSELCE : new FormControl()
    });

    this.getFormData();
  }

  getFormData(){
    this.http.get(this.formDataService.getFormPSELCEUrl()).subscribe(data => {
      this.setFormData(data);
    });
  }

  setFormData(data){
    this.form.get('poisson').setValue(data.poisson);
    this.form.get('poissonOmbleFontaine').setValue(data.poissonomblefontaine);
    this.form.get('argent').setValue(data.argent);
    this.form.get('argentOmbleFontaine').setValue(data.argentomblefontaine);
    this.form.get('argentTruiteBrune').setValue(data.argenttruitebrune);
    this.form.get('argentTruiteArcEnCiel').setValue(data.argenttruitearcenciel);
    this.form.get('peuImporte').setValue(data.peuimporte);
    this.form.get('peuImporteOmbleFontaine').setValue(data.peuimporteomblefontaine);
    this.form.get('feteDeLaPeche').setValue(data.fetedelapeche);
    this.form.get('date1').setValue(moment(data.date1).format('YYYY-MM-DD'));
    this.form.get('date2').setValue(moment(data.date2).format('YYYY-MM-DD'));
    this.form.get('date3').setValue(moment(data.date3).format('YYYY-MM-DD'));
    this.form.get('autreDate1').setValue(moment(data.autredate1).format('YYYY-MM-DD'));
    this.form.get('autreDate2').setValue(moment(data.autredate2).format('YYYY-MM-DD'));
    this.form.get('autreDate3').setValue(moment(data.autredate3).format('YYYY-MM-DD'));
    this.form.get('dateDu1').setValue(moment(data.datedu1).format('YYYY-MM-DD'));
    this.form.get('dateAu1').setValue(moment(data.dateau1).format('YYYY-MM-DD'));
    this.form.get('dateDu2').setValue(moment(data.datedu2).format('YYYY-MM-DD'));
    this.form.get('dateAu2').setValue(moment(data.dateau2).format('YYYY-MM-DD'));
    this.form.get('rampePonctuelResident').setValue(data.rampeponctuelresident);
    this.form.get('rampePonctuelNonResident').setValue(data.rampeponctuelnonresident);
    this.form.get('rampeSaisonnierResident').setValue(data.rampesaisonnierresident);
    this.form.get('rampeSaisonnierNonResident').setValue(data.rampesaisonniernonresident);
    this.form.get('stationPonctuelResident').setValue(data.stationponctuelresident);
    this.form.get('stationPonctuelNonResident').setValue(data.stationponctuelnonresident);
    this.form.get('stationSaisonnierResident').setValue(data.stationsaisonnierresident);
    this.form.get('stationSaisonnierNonResident').setValue(data.stationsaisonniernonresident);
    this.form.get('stationnementPonctuelResident').setValue(data.stationnementponctuelresident);
    this.form.get('stationnementPonctuelNonResident').setValue(data.stationnementponctuelnonresident);
    this.form.get('stationnementSaisonnierResident').setValue(data.stationnementsaisonnierresident);
    this.form.get('stationnementSaisonnierNonResident').setValue(data.stationnementsaisonniernonresident);
    this.form.get('commentaireTarification').setValue(data.commentairetarification);
    this.form.get('transportPublic').setValue(data.transportpublic);
    this.form.get('transportPublicDescr').setValue(data.transportpublicdescr);
    this.form.get('servicesAcces').setValue(data.servicesacces);
    this.form.get('servicesAccesDescr').setValue(data.servicesaccesdescr);
    this.form.get('contributionOrganisme').setValue(data.contributionorganisme);
    this.form.get('contributionPSELCE').setValue(data.contributionpselce);
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
  }

  submit(){
    this.http.patch(this.formDataService.formPSELCEUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.router.navigate(['/partenaires']);
    })
  }

  back(){
    this.router.navigate(['/descriptionpselce']);
  }
}
