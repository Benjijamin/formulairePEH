import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartenairesComponent } from './form-partenaires.component';

describe('FormPartenairesComponent', () => {
  let component: FormPartenairesComponent;
  let fixture: ComponentFixture<FormPartenairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPartenairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
