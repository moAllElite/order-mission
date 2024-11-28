import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadOrderComponent } from './download-order.component';

describe('DownloadOrderComponent', () => {
  let component: DownloadOrderComponent;
  let fixture: ComponentFixture<DownloadOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
