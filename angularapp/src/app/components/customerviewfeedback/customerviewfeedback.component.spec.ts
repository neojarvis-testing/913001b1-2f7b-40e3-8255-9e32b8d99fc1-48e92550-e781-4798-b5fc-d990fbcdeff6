import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewfeedbackComponent } from './customerviewfeedback.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerviewfeedbackComponent', () => {
  let component: CustomerviewfeedbackComponent;
  let fixture: ComponentFixture<CustomerviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerviewfeedbackComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  fit('Frontend_should_create_Customerviewfeedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_my_feedback_heading_in_the_Customerviewfeedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('My Feedback');
  });
});
