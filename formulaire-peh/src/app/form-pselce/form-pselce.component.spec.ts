import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPSELCEComponent } from './form-pselce.component';

describe('FormPSELCEComponent', () => {
  let component: FormPSELCEComponent;
  let fixture: ComponentFixture<FormPSELCEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPSELCEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPSELCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
