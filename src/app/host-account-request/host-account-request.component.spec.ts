import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccountRequestComponent } from './host-account-request.component';

describe('HostAccountRequestComponent', () => {
  let component: HostAccountRequestComponent;
  let fixture: ComponentFixture<HostAccountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostAccountRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
