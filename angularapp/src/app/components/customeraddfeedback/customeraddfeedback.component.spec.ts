import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddfeedbackComponent } from './customeraddfeedback.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomeraddfeedbackComponent', () => {
  let component: CustomeraddfeedbackComponent;
  let fixture: ComponentFixture<CustomeraddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeraddfeedbackComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Customeraddfeedback_Component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_add_feedback_heading_in_the_Customeraddfeedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add Feedback');
  });
});
