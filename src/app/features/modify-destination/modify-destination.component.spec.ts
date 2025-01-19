import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDestinationComponent } from './modify-destination.component';

describe('ModifyDestinationComponent', () => {
  let component: ModifyDestinationComponent;
  let fixture: ComponentFixture<ModifyDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
