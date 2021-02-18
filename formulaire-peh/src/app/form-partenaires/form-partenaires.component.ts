import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-partenaires',
  templateUrl: './form-partenaires.component.html',
  styleUrls: ['./form-partenaires.component.css']
})
export class FormPartenairesComponent implements OnInit {
  form: FormGroup;

  //Documents on server?
  lettresPatentesRecieved = false;
  resolutionRecieved = false;

  constructor(private http: HttpClient, private router: Router, private formDataService: FormDataService) { 
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      partenaires: new FormControl(false),
      engagementPartenaires : new FormControl(null),
      lettresPatentes : new FormControl(false),
      fileLettresPatentes : new FormControl(),
      resolution : new FormControl(false),
      fileResolution : new FormControl(),
      couvertureAssurance : new FormControl(false),
      attestationPSELCE : new FormControl(false)
    });

    this.getFormData();
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
  }

  getFormData(){
    this.http.get(this.formDataService.getFormPartenairesUrl()).subscribe( data => {
      if(data){
        this.setFormData(data);
      }
      //Documents on server?
      this.http.get(this.formDataService.getFormPartenairesDocumentsUrl()).subscribe(docs => {
        let d : any = docs;
        this.lettresPatentesRecieved = d.lettresPatentes;
        this.resolutionRecieved = d.resolution;
      });
    });
  }

  setFormData(data){
    this.form.get('partenaires').setValue(data.partenaires);
    this.form.get('engagementPartenaires').setValue(data.engagementpartenaires);
    this.form.get('lettresPatentes').setValue(data.lettrespatentes);
    this.form.get('resolution').setValue(data.resolution);
    this.form.get('couvertureAssurance').setValue(data.couvertureassurance);
    this.form.get('attestationPSELCE').setValue(data.attestationpselce);
  }

  lettresPatentes(event : any){
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] =  event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({ fileLettresPatentes : reader.result });
      }  
    }
  }

  resolution(event: any){
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({ fileResolution: reader.result });
      }
    }
  }

  submit(){
    this.http.patch(this.formDataService.formPartenairesUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      this.router.navigate(['/adresselivraison']);
    });
  }

  back(){
    this.router.navigate(['/descriptionprojet']);
    this.http.get(this.formDataService.getPEHPSELCEUrl()).subscribe(data => {
      //not an error
      var d:any = data;
      if(d.form_estpselce){
        this.router.navigate(['/pselce']);
      }else{
        this.router.navigate(['/descriptionprojet']);
      }
    });
  }
}
