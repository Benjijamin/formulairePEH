import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdresseLivraisonComponent } from './form-adresse-livraison.component';

describe('FormAdresseLivraisonComponent', () => {
  let component: FormAdresseLivraisonComponent;
  let fixture: ComponentFixture<FormAdresseLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdresseLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdresseLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
