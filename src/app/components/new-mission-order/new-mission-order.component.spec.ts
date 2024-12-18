import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMissionOrderComponent } from './new-mission-order.component';

describe('NewMissionOrderComponent', () => {
  let component: NewMissionOrderComponent;
  let fixture: ComponentFixture<NewMissionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMissionOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMissionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
