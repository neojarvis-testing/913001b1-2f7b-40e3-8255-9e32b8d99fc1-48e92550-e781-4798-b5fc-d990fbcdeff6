import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewalltransactionsComponent } from './managerviewalltransactions.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerviewalltransactionsComponent', () => {
  let component: ManagerviewalltransactionsComponent;
  let fixture: ComponentFixture<ManagerviewalltransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewalltransactionsComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewalltransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Managerviewalltransactions_Component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_Transaction_heading_in_the_Managerviewalltransactions_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Transaction');
  });
});
