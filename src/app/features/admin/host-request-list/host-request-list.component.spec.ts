import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRequestListComponent } from './host-request-list.component';

describe('HostRequestListComponent', () => {
  let component: HostRequestListComponent;
  let fixture: ComponentFixture<HostRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
