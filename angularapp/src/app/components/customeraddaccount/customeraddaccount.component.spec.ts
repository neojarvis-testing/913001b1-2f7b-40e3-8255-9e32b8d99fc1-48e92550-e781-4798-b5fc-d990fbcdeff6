import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddaccountComponent } from './customeraddaccount.component';

describe('CustomeraddaccountComponent', () => {
  let component: CustomeraddaccountComponent;
  let fixture: ComponentFixture<CustomeraddaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeraddaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
