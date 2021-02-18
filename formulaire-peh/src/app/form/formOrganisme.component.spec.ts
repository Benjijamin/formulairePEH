import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrganismeComponent } from './formOrganisme.component';

describe('FormComponent', () => {
  let component: FormOrganismeComponent;
  let fixture: ComponentFixture<FormOrganismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrganismeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
