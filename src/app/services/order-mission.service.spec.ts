import { TestBed } from '@angular/core/testing';

import { OrderMissionService } from './order-mission.service';

describe('OrderMissionService', () => {
  let service: OrderMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
