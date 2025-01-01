import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorManagementComponent } from './administrator-management.component';

describe('AdministratorManagementComponent', () => {
  let component: AdministratorManagementComponent;
  let fixture: ComponentFixture<AdministratorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
