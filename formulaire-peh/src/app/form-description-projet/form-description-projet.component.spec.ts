import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescriptionProjetComponent } from './form-description-projet.component';

describe('FormDescriptionProjetComponent', () => {
  let component: FormDescriptionProjetComponent;
  let fixture: ComponentFixture<FormDescriptionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDescriptionProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescriptionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
