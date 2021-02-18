import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-attestation',
  templateUrl: './form-attestation.component.html',
  styleUrls: ['./form-attestation.component.css']
})
export class FormAttestationComponent implements OnInit {
  form : FormGroup;

  constructor(private http: HttpClient, private router: Router, private formDataService: FormDataService) { 
    this.form = new FormGroup({
      id: new FormControl(sessionStorage.getItem('currentFormId')),
      signature: new FormControl(false),
      signatureNom: new FormControl(null),
      signatureDate: new FormControl(null)
    });

    this.getFormData();
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentFormId') == null){
      this.router.navigate(['/']);
    }
  }

  getFormData(){
    this.formDataService.getFormAttestation().subscribe(data => {
      this.setFormData(data);
    });
  }

  setFormData(data){
    this.form.get('signature').setValue(data.signature);
    this.form.get('signatureNom').setValue(data.signaturenom);
    this.form.get('signatureDate').setValue(data.signaturedate);
  }

  submit(){
    this.http.patch(this.formDataService.formAttestationUrl, this.form.value, {responseType: 'text' as 'json'}).subscribe(data => {
      console.log('end');
    });
  }

  back(){
    this.router.navigate(['/adresselivraison']);
  }
}
