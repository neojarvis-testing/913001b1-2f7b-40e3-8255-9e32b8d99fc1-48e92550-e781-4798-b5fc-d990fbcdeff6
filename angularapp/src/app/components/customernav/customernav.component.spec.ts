import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomernavComponent } from './customernav.component';

describe('CustomernavComponent', () => {
  let component: CustomernavComponent;
  let fixture: ComponentFixture<CustomernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomernavComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  fit('Frontend_should_create_Customernav_component', () => {
    expect(component).toBeTruthy();
  });
});
