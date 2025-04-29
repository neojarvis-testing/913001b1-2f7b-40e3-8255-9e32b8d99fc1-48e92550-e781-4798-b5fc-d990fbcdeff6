import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionformComponent } from './transactionform.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionformComponent', () => {
  let component: TransactionformComponent;
  let fixture: ComponentFixture<TransactionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionformComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Transactionform_Component', () => {
    expect(component).toBeTruthy();
  });

});
