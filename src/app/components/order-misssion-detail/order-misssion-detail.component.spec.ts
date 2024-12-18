import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMisssionDetailComponent } from './order-misssion-detail.component';

describe('OrderMisssionDetailComponent', () => {
  let component: OrderMisssionDetailComponent;
  let fixture: ComponentFixture<OrderMisssionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderMisssionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMisssionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
