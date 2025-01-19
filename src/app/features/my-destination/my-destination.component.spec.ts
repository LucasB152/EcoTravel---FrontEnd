import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDestinationComponent } from './my-destination.component';

describe('MyDestinationComponent', () => {
  let component: MyDestinationComponent;
  let fixture: ComponentFixture<MyDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
