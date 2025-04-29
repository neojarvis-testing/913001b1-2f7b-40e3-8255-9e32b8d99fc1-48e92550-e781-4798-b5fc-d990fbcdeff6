import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewaccountComponent } from './customerviewaccount.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerviewaccountComponent', () => {
  let component: CustomerviewaccountComponent;
  let fixture: ComponentFixture<CustomerviewaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerviewaccountComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerviewaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Customerviewaccount_Component', () => {
    expect(component).toBeTruthy();
  });

  // fit('Frontend_should_contain_add_feedback_heading_in_the_Customerviewaccount_component', () => {
  //   const componentHTML = fixture.debugElement.nativeElement.outerHTML;
  //   expect(componentHTML).toContain('Add Feedback');
  // });
});
