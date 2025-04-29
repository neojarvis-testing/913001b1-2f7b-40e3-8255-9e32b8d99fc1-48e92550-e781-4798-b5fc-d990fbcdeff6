import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddaccountComponent } from './customeraddaccount.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomeraddaccountComponent', () => {
  let component: CustomeraddaccountComponent;
  let fixture: ComponentFixture<CustomeraddaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeraddaccountComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Customeraddaccount_Component', () => {
    expect(component).toBeTruthy();
  });
});
