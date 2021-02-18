import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAttestationComponent } from './form-attestation.component';

describe('FormAttestationComponent', () => {
  let component: FormAttestationComponent;
  let fixture: ComponentFixture<FormAttestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAttestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
