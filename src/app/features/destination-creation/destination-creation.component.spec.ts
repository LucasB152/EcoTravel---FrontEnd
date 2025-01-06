import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationCreationComponent } from './destination-creation.component';

describe('DestinationCreationComponent', () => {
  let component: DestinationCreationComponent;
  let fixture: ComponentFixture<DestinationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
