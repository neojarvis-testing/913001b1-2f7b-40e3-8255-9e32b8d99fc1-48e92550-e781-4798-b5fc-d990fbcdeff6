import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerNavComponent } from './customernav.component';

describe('CustomernavComponent', () => {
  let component: CustomerNavComponent;
  let fixture: ComponentFixture<CustomerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNavComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  fit('Frontend_should_create_Customernav_component', () => {
    expect(component).toBeTruthy();
  });
});
