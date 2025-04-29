import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddfeedbackComponent } from './customeraddfeedback.component';

describe('CustomeraddfeedbackComponent', () => {
  let component: CustomeraddfeedbackComponent;
  let fixture: ComponentFixture<CustomeraddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeraddfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
