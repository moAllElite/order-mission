import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreValidationSignatureComponent } from './pre-validation-signature.component';

describe('PreValidationSignatureComponent', () => {
  let component: PreValidationSignatureComponent;
  let fixture: ComponentFixture<PreValidationSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreValidationSignatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreValidationSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
