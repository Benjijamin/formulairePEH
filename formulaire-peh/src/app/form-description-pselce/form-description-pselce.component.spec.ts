import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescriptionPSELCEComponent } from './form-description-pselce.component';

describe('FormDescriptionPSELCEComponent', () => {
  let component: FormDescriptionPSELCEComponent;
  let fixture: ComponentFixture<FormDescriptionPSELCEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDescriptionPSELCEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescriptionPSELCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
