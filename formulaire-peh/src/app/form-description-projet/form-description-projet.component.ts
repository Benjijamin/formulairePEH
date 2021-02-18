import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-description-projet',
  templateUrl: './form-description-projet.component.html',
  styleUrls: ['./form-description-projet.component.css']
})
export class FormDescriptionProjetComponent implements OnInit{
  form: FormGroup;
  municipalites : any;
  regions : any;

  constructor(private http : HttpClient, private router : Router, private formDataService: FormDataService) { 
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      nomPlanEau : new FormControl(null),
      typePlanEau : new FormControl(null),
      ville : new FormControl(null),
      region : new FormControl(null),
      especePoisson : new FormControl(null),
      dateActivite : new FormControl(null),
      autreDate1 : new FormControl(null),
      autreDate2 : new FormControl(null),
      autreDate3 : new FormControl(null),
      dateDu : new FormControl(null),
      dateAu : new FormControl(null),
      nbrJeunesVises : new FormControl(null),
      nbrNouveauxAdeptes :  new FormControl(null),
      jeunes6a8ans : new FormControl(false),
      jeunes9a12ans : new FormControl(false),
      jeunes13a17ans : new FormControl(false),
      milieuUrbain : new FormControl(false),
      provenanceMoins30000 : new FormControl(false),
      provenancePlus30000 : new FormControl(false),
      provenanceMunicipalites : new FormControl(null),
      structureGratuitPublic : new FormControl(false),
      structureCampVacances : new FormControl(false),
      structureClasseScolaire : new FormControl(false),
      structureGroupeScout : new FormControl(false),
      structureAutre : new FormControl(false),
      structureAutreDescr : new FormControl(null),
      telDiffusion : new FormControl(null),
      descrFormation : new FormControl(null),
      descrCompetences : new FormControl(null),
      descrJournee : new FormControl(null),
      nbrAdultesSurPlace : new FormControl(null),
      competencesAdultes : new FormControl(null),
      equipementPremierSoins : new FormControl(false),
      vesteFlottaison : new FormControl(false),
      supervisionConstante : new FormControl(false),
      descrMesuresSecurite : new FormControl(null)
    });

    this.getMunicipalites();
    this.getRegions();
    this.getFormData();
  }
  
  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
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

  setMunicipalites(data){
    this.municipalites = data;
  }

  setRegions(data){
    this.regions = data;
  }

  getFormData(){
    this.http.get(this.formDataService.getFormDescriptionProjetUrl()).subscribe(data => {
      if(data){
        this.setFormData(data);
      }
    });
  }

  setFormData(data){
    this.form.get('nomPlanEau').setValue(data.nomplaneau);
    this.form.get('typePlanEau').setValue(data.typeplaneau);
    this.form.get('ville').setValue(data.ville);
    this.form.get('region').setValue(data.region);
    this.form.get('especePoisson').setValue(data.especepoisson);
    this.form.get('dateActivite').setValue(moment(data.dateactivite).format('YYYY-MM-DD'));
    this.form.get('autreDate1').setValue(moment(data.autredate1).format('YYYY-MM-DD'));
    this.form.get('autreDate2').setValue(moment(data.autredate2).format('YYYY-MM-DD'));
    this.form.get('autreDate3').setValue(moment(data.autredate3).format('YYYY-MM-DD'));
    this.form.get('dateDu').setValue(moment(data.datedu).format('YYYY-MM-DD'));
    this.form.get('dateAu').setValue(moment(data.dateau).format('YYYY-MM-DD'));
    this.form.get('nbrJeunesVises').setValue(data.nbrjeunesvises);
    this.form.get('nbrNouveauxAdeptes').setValue(data.nbrnouveauxadeptes);
    this.form.get('jeunes6a8ans').setValue(data.jeunes6a8ans);
    this.form.get('jeunes9a12ans').setValue(data.jeunes9a12ans);
    this.form.get('jeunes13a17ans').setValue(data.jeunes13a17ans);
    this.form.get('milieuUrbain').setValue(data.milieuurbain);
    this.form.get('provenanceMoins30000').setValue(data.provenancemoins30000);
    this.form.get('provenancePlus30000').setValue(data.provenanceplus30000);
    this.form.get('provenanceMunicipalites').setValue(data.provenancemunicipalites);
    this.form.get('structureGratuitPublic').setValue(data.structuregratuitpublic);
    this.form.get('structureCampVacances').setValue(data.structurecampvacances);
    this.form.get('structureClasseScolaire').setValue(data.structureclassescolaire);
    this.form.get('structureGroupeScout').setValue(data.structuregroupescout);
    this.form.get('structureAutre').setValue(data.structureautre);
    this.form.get('structureAutreDescr').setValue(data.structureautredescr);
    this.form.get('telDiffusion').setValue(data.teldiffusion);
    this.form.get('descrFormation').setValue(data.descrformation);
    this.form.get('descrCompetences').setValue(data.descrcompetences);
    this.form.get('descrJournee').setValue(data.descrjournee);
    this.form.get('nbrAdultesSurPlace').setValue(data.nbradultessurplace);
    this.form.get('competencesAdultes').setValue(data.competencesadultes);
    this.form.get('equipementPremierSoins').setValue(data.equipementpremiersoins);
    this.form.get('vesteFlottaison').setValue(data.vesteflottaison);
    this.form.get('supervisionConstante').setValue(data.supervisionconstante);
    this.form.get('descrMesuresSecurite').setValue(data.descrmesuressecurite);
  }

  submit(){
    this.http.patch(this.formDataService.formDescriptionProjetUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.http.get(this.formDataService.getPEHPSELCEUrl()).subscribe(data => {
        //not an error
        var d:any = data;
        if(d.form_estpselce){
          this.router.navigate(['/descriptionpselce']);
        }else{
          this.router.navigate(['/partenaires']);
        }
      })
    });
  }

  back(){
    this.router.navigate(['/organisme']);
  }
}
