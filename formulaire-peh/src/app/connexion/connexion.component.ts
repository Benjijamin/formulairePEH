import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{
  formNouveau : FormGroup;
  formExistant : FormGroup;

  isFormNouveau = false;
  isFormExistant = false;
  formNotFound = false;

  constructor(private http: HttpClient, private router: Router, private formDataService: FormDataService) {
    this.formNouveau = new FormGroup({
      courriel: new FormControl(null)
    });

    this.formExistant = new FormGroup({
      courriel: new FormControl(null),
      numeroForm : new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  //SessionStorage contient le numero de formulaire
  nouveauFormulaire(){
    this.http.post(this.formDataService.newFormUrl, {courriel : this.formNouveau.value.courriel} , {responseType: 'text' as 'json'}).subscribe(data => {
      sessionStorage.setItem('currentFormId', data as string);
      this.http.post(this.formDataService.sendMailUrl, {courriel : this.formNouveau.value.courriel, id : sessionStorage.getItem('currentFormId')}, {responseType: 'text' as 'json'}).subscribe(data => {
        this.router.navigate(['/organisme']);
      });
    });
  }

  toggleNouveau(){
    this.isFormNouveau = !this.isFormNouveau;
  }

  toggleExistant(){
    this.isFormExistant = !this.isFormExistant;
  }


  //SessionStorage contient le numero de formulaire
  formulaireExistant(){
    this.http.get(this.formDataService.getVerifyFormUrl(this.formExistant.value.numeroForm, this.formExistant.value.courriel), {responseType: 'text' as 'json'}).subscribe(data => {
      if(data != null){
        sessionStorage.setItem('currentFormId', data as string);
        this.router.navigate(['/organisme']);
      }else{
        this.formNotFound = true;
      }
    });
  }
}
